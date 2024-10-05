import { BufferGeometry, Material } from "three";
import Lodge from "./Lodge";
import { createLodges } from "../utils/createLodges";

interface LodgesProps {
  dimensions: { width: number; depth: number };
  geometry?: BufferGeometry;
  material?: Material;
  verticalBalkWidth: number;
  lodgeDepth: number;
  innerOffsetHeightIncrement: number;
  overhangInner: number;
  overhangOuter: number;
}

export function Lodges({
  dimensions,
  geometry,
  material,
  verticalBalkWidth,
  lodgeDepth,
  innerOffsetHeightIncrement,
  overhangInner,
  overhangOuter,
}: LodgesProps) {
  const lodges = createLodges({
    width: dimensions.width,
    depth: dimensions.depth,
    verticalBalkWidth,
    lodgeDepth,
    innerOffsetHeightIncrement,
    overhangInner,
    overhangOuter,
  });
  return (
    <>
      {lodges.map((part, index) => (
        <Lodge
          index={index}
          key={index}
          position={part.position}
          rotation={part.rotation}
          scale={part.scale}
          geometry={geometry}
          material={material}
        />
      ))}
    </>
  );
}

export default Lodges;
