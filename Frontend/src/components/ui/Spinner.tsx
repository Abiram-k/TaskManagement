import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";

const Spinner = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/70
      backdrop-blur-xs"
    >
      <Bouncy size="45" speed="1.75" color="green" />
    </div>
  );
};

export default Spinner;
