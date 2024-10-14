import { BufferGeometry, Vector3 } from "three";
import { useUvAdjustedGeometry } from "../hooks/useUvAdjustedGeometry";
import { useMaterialStore } from "../store/materialStore";
import { Ruberoids } from "../context/AssetsContext/AssetsContext";

interface RuberoidRoofProps {
  width: number;
  depth: number;
  geometry?: BufferGeometry;
  materials?: Ruberoids;
  overhangOuter: number;
}

export function RuberoidRoof({
  width,
  depth,
  geometry,
  materials,
  overhangOuter,
}: RuberoidRoofProps) {
  const scale = new Vector3(
    width + overhangOuter * 2,
    2,
    depth + overhangOuter * 2
  );
  // an unspecified offset from the Specs (refer to "9-ruberoid_1000x1000x2" on page 5) to match the roof and edges heights
  const offset = 0.042;
  const position = new Vector3(0, 2.2 + 0.32 + offset, 0);
  const adjustedGeometry = useUvAdjustedGeometry({
    geometry,
    scaleU: scale.z,
    scaleV: scale.x,
  });

  const selectedRoofMaterialKey = useMaterialStore(
    (state) => state.selectedRoofMaterialKey
  );
  const selectedMaterial = materials?.[selectedRoofMaterialKey];

  return (
    <mesh
      scale={scale}
      position={position}
      geometry={adjustedGeometry}
      material={selectedMaterial}
    />
  );
}
