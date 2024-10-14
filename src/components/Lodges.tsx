import { BufferGeometry } from "three";
import Lodge from "./Lodge";
import { createLodges } from "../utils/createLodges";
import { Woods } from "../context/AssetsContext/AssetsContext";
import { useMaterialStore } from "../store/materialStore";

interface LodgesProps {
  width: number;
  depth: number;
  geometry?: BufferGeometry;
  materials?: Woods;
  verticalBalkWidth: number;
  lodgeDepth: number;
  innerOffsetHeightIncrement: number;
  overhangInner: number;
  overhangOuter: number;
}

export function Lodges({
  width,
  depth,
  geometry,
  materials,
  verticalBalkWidth,
  lodgeDepth,
  innerOffsetHeightIncrement,
  overhangInner,
  overhangOuter,
}: LodgesProps) {
  const lodges = createLodges({
    width,
    depth,
    verticalBalkWidth,
    lodgeDepth,
    innerOffsetHeightIncrement,
    overhangInner,
    overhangOuter,
  });
  const key = useMaterialStore((state) => state.selectedWoodMaterialKey);
  const selectedMaterial = materials?.[key];
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
          material={selectedMaterial}
        />
      ))}
    </>
  );
}

export default Lodges;
