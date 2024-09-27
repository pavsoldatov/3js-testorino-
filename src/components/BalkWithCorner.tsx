import { Suspense } from "react";
import Balk from "./Balk";
import Corner from "./Corner";

interface BalkWithCornerProps {
  directions: Array<"n" | "s" | "e" | "w">;
}

function BalkWithCorner({ directions }: BalkWithCornerProps) {
  return (
    <group>
      <Suspense fallback={null}>
        <Balk />
        {directions.map((direction, index) => (
          <Corner key={index} direction={direction} />
        ))}
      </Suspense>
    </group>
  );
}

export default BalkWithCorner;
