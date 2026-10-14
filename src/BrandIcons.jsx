import github from "./Assets/github.png";
import linkedin from "./Assets/linkedin.png";

export function Github({ size = 20 }) {
  return (
    <img
      className="brand-icon"
      src={github}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  );
}
export function Linkedin({ size = 20 }) {
  return (
    <img
      className="brand-icon"
      src={linkedin}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  );
}
