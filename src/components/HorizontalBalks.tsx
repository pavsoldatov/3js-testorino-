import { BufferGeometry, Material } from "three";
import HorizontalBalk from "./HorizontalBalk";
import { useMemo } from "react";
import { createHorizontalBalks } from "../utils/createHorizontalBalks";

interface HorizontalBalksProps {
  width: number;
  depth: number;
  geometry?: BufferGeometry;
  material?: Material | Material[];
}

export function HorizontalBalks({
  width,
  depth,
  geometry,
  material,
}: HorizontalBalksProps) {
  const balkWidth = 0.15;
  const verticalBalkHeight = 2.20001;

  const balks = useMemo(
    () => createHorizontalBalks(width, depth, balkWidth, verticalBalkHeight),
    [depth, width]
  );

  return (
    <>
      {balks.map((balk, index) => (
        <HorizontalBalk
          key={index}
          position={balk.position}
          rotation={balk.rotation}
          geometry={geometry}
          material={material}
          scale={balk.scale}
        />
      ))}
    </>
  );
}
