export default function Background({ variant = 1 }) {
  return (
    <div
      className={`geometric-background variant-${variant}`}
      aria-hidden="true"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}
