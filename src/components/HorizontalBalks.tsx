import { BufferGeometry } from "three";
import HorizontalBalk from "./HorizontalBalk";
import { useMemo } from "react";
import { createHorizontalBalks } from "../utils/createHorizontalBalks";
import { Woods } from "../context/AssetsContext/AssetsContext";
import { useMaterialStore } from "../store/materialStore";

interface HorizontalBalksProps {
  width: number;
  depth: number;
  geometry?: BufferGeometry;
  materials?: Woods;
}

export function HorizontalBalks({
  width,
  depth,
  geometry,
  materials,
}: HorizontalBalksProps) {
  const balkWidth = 0.15;
  const verticalBalkHeight = 2.20001;

  const balks = useMemo(
    () => createHorizontalBalks(width, depth, balkWidth, verticalBalkHeight),
    [depth, width]
  );

  const key = useMaterialStore((state) => state.selectedWoodMaterialKey);
  const selectedMaterial = materials?.[key];

  return (
    <>
      {balks.map((balk, index) => (
        <HorizontalBalk
          key={index}
          position={balk.position}
          rotation={balk.rotation}
          geometry={geometry}
          material={selectedMaterial}
          scale={balk.scale}
        />
      ))}
    </>
  );
}
