import { useMemo } from "react";
import { BufferGeometry } from "three";
import { Metals } from "../context/AssetsContext/AssetsContext";
import { useMaterialStore } from "../store/materialStore";
import { useGeometryStore } from "../store/geometryStore";
import {
  createRoundedRoofEdgeCorners,
  createRoundedRoofEdges,
  createStraightRoofEdgeCorners,
  createStraightRoofEdges,
} from "../utils/createRoundedRoofEdges";
import { RoofEdgeCorner } from "./RoofEdgeCorner";
import RoofEdge from "./RoofEdge";

interface RoofEdgesProps {
  width: number;
  depth: number;
  edgeGeometry?: BufferGeometry;
  cornerGeometry?: BufferGeometry;
  materials?: Metals;
}

export const RoofEdges = ({
  width,
  depth,
  edgeGeometry,
  cornerGeometry,
  materials,
}: RoofEdgesProps) => {
  const padding = 0.034;

  const materialKey = useMaterialStore(
    (state) => state.selectedRoofEdgeMaterialKey
  );
  const geometryKey = useGeometryStore(
    (state) => state.selectedRoofEdgeGeometryKey
  );
  const selectedMaterial = materials?.[materialKey];

  const rounded = geometryKey === "rounded";
  const createEdges = rounded
    ? createRoundedRoofEdges
    : createStraightRoofEdges;
  const createCorners = rounded
    ? createRoundedRoofEdgeCorners
    : createStraightRoofEdgeCorners;

  const edges = useMemo(
    () => createEdges(width, depth, padding),
    [createEdges, width, depth]
  );
  const corners = useMemo(
    () => createCorners(width, depth, padding),
    [createCorners, width, depth]
  );

  return (
    <group>
      {corners.map((corner, index) => (
        <RoofEdgeCorner
          key={`corner-${index}`}
          geometry={cornerGeometry}
          material={selectedMaterial}
          position={corner.position}
          scale={corner.scale}
          rotation={corner.rotation}
        />
      ))}
      {edges.map((edge, index) => (
        <RoofEdge
          key={`edge-${index}`}
          geometry={edgeGeometry}
          material={selectedMaterial}
          position={edge.position}
          rotation={edge.rotation}
          scale={edge.scale}
        />
      ))}
    </group>
  );
};
