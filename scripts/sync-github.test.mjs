import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  copyFile,
  rm,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const repo = (name, overrides = {}) => ({
  name,
  html_url: `https://github.com/example/${name}`,
  description: null,
  homepage: null,
  language: "JavaScript",
  topics: [],
  stargazers_count: 0,
  pushed_at: "2026-01-01T00:00:00Z",
  ...overrides,
});

async function sync(pages, check) {
  const directory = await mkdtemp(join(tmpdir(), "portfolio-sync-"));
  try {
    await mkdir(join(directory, "scripts"));
    await mkdir(join(directory, "src/data"), { recursive: true });
    await copyFile(
      new URL("./sync-github.mjs", import.meta.url),
      join(directory, "scripts/sync-github.mjs"),
    );
    const original = '{"existing":"snapshot"}\n';
    const target = join(directory, "src/data/github.json");
    await writeFile(target, original);
    const mock = `let call=0; const pages=${JSON.stringify(pages)}; globalThis.fetch=async(url,options)=>{if(!url.includes('page='+String(call+1)))throw Error('Incorrect pagination'); if(options.headers.Authorization!=='Bearer test-token')throw Error('Missing authentication'); const page=pages[call++]; if(!page)throw Error('Unexpected request'); return {ok:page.status===200,status:page.status,json:async()=>page.body};};`;
    await writeFile(join(directory, "mock.mjs"), mock);
    let failure;
    try {
      await run(
        process.execPath,
        [
          "--import",
          join(directory, "mock.mjs"),
          join(directory, "scripts/sync-github.mjs"),
        ],
        { env: { ...process.env, GITHUB_TOKEN: "test-token" } },
      );
    } catch (error) {
      failure = error;
    }
    await check({
      failure,
      contents: await readFile(target, "utf8"),
      original,
    });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test("syncs every page, filters repositories, and omits insecure demo links", async () => {
  const first = Array.from({ length: 100 }, (_, index) =>
    repo(`project-${index}`),
  );
  await sync(
    [
      { status: 200, body: first },
      {
        status: 200,
        body: [
          repo("live", { homepage: "https://example.com" }),
          repo("unsafe", { homepage: "javascript:alert(1)" }),
          repo("fork", { fork: true }),
          repo("archive", { archived: true }),
          repo("disabled", { disabled: true }),
          repo("Bojan-Ivanovski"),
        ],
      },
    ],
    ({ failure, contents }) => {
      assert.equal(failure, undefined);
      const snapshot = JSON.parse(contents);
      assert.equal(snapshot.projects.length, 102);
      assert.equal(
        snapshot.projects.find((project) => project.name === "live").homepage,
        "https://example.com",
      );
      assert.equal(
        snapshot.projects.find((project) => project.name === "unsafe").homepage,
        null,
      );
      assert.ok(snapshot.syncedAt);
    },
  );
});

test("preserves the fallback snapshot when a later API page fails", async () => {
  await sync(
    [
      {
        status: 200,
        body: Array.from({ length: 100 }, (_, i) => repo(`project-${i}`)),
      },
      { status: 403 },
    ],
    ({ failure, contents, original }) => {
      assert.ok(failure);
      assert.equal(contents, original);
    },
  );
});

for (const [name, body] of [
  ["empty", []],
  ["malformed", { message: "unexpected response" }],
]) {
  test(`preserves the fallback snapshot for an ${name} response`, async () => {
    await sync([{ status: 200, body }], ({ failure, contents, original }) => {
      assert.ok(failure);
      assert.equal(contents, original);
    });
  });
}
