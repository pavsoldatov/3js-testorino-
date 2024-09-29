import { Euler, Vector3 } from "three";
import { BalkInstance, CornerInstance } from "../components/InstancedBalks";

enum EdgeType {
  Horizontal,
  Vertical,
}

enum CornerType {
  BottomLeft,
  BottomRight,
  TopRight,
  TopLeft,
}

const cornerRotationMap: Record<CornerType, [number, number]> = {
  [CornerType.BottomLeft]: [0, Math.PI * 0.5], // Right, Up
  [CornerType.BottomRight]: [Math.PI, Math.PI * 0.5], // Left, Up
  [CornerType.TopRight]: [Math.PI, Math.PI * 1.5], // Left, Down
  [CornerType.TopLeft]: [0, Math.PI * 1.5], // Right, Down
};

const edgeRotationMap: Record<EdgeType, [number, number]> = {
  [EdgeType.Horizontal]: [0, Math.PI], // Right, Left
  [EdgeType.Vertical]: [Math.PI * 0.5, Math.PI * 1.5], // Up, Down
};

export function generatePositions(
  width: number,
  depth: number,
  xThreshold: number,
  zThreshold: number
): Vector3[] {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  const numXPoints = Math.ceil(width / xThreshold) + 1;
  const numZPoints = Math.ceil(depth / zThreshold) + 1;
  const xSpacing = width / (numXPoints - 1);
  const zSpacing = depth / (numZPoints - 1);

  const positions: Vector3[] = [];
  for (let i = 0; i < numXPoints; i++) {
    for (let j = 0; j < numZPoints; j++) {
      if (i === 0 || i === numXPoints - 1 || j === 0 || j === numZPoints - 1) {
        const x = -halfWidth + i * xSpacing;
        const z = -halfDepth + j * zSpacing;
        positions.push(new Vector3(x, 0, z));
      }
    }
  }
  return positions;
}

export function createBalks(positions: Vector3[]): BalkInstance[] {
  return positions.map((position) => ({
    position,
    rotation: new Euler(0, 0, 0),
  }));
}

export function createCorners(
  positions: Vector3[],
  width: number,
  depth: number
): CornerInstance[] {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  const epsilon = 1e-6; // tolerance for floating-point comparisons

  function getCornerType(x: number, z: number): CornerType | null {
    const onLeft = Math.abs(x + halfWidth) < epsilon;
    const onRight = Math.abs(x - halfWidth) < epsilon;
    const onTop = Math.abs(z + halfDepth) < epsilon;
    const onBottom = Math.abs(z - halfDepth) < epsilon;

    if (onLeft && onBottom) return CornerType.BottomLeft;
    if (onRight && onBottom) return CornerType.BottomRight;
    if (onRight && onTop) return CornerType.TopRight;
    if (onLeft && onTop) return CornerType.TopLeft;
    return null;
  }

  function getEdgeType(x: number, z: number): EdgeType | null {
    if (Math.abs(z + halfDepth) < epsilon || Math.abs(z - halfDepth) < epsilon)
      return EdgeType.Horizontal;
    if (Math.abs(x + halfWidth) < epsilon || Math.abs(x - halfWidth) < epsilon)
      return EdgeType.Vertical;
    return null;
  }

  const corners: CornerInstance[] = [];
  positions.forEach((position) => {
    const cornerType = getCornerType(position.x, position.z);
    if (cornerType !== null) {
      // balk is at a corner
      const [rot1, rot2] = cornerRotationMap[cornerType];
      corners.push({ position, rotation: new Euler(0, rot1, 0) });
      corners.push({ position, rotation: new Euler(0, rot2, 0) });
    } else {
      const edgeType = getEdgeType(position.x, position.z);
      if (edgeType !== null) {
        // balk is on an edge
        const [rot1, rot2] = edgeRotationMap[edgeType];
        corners.push({ position, rotation: new Euler(0, rot1, 0) });
        corners.push({ position, rotation: new Euler(0, rot2, 0) });
      }
    }
  });

  return corners;
}

export function createBalksAndCorners(
  width: number,
  depth: number,
  xThreshold: number,
  zThreshold?: number
): { balks: BalkInstance[]; corners: CornerInstance[] } {
  const positions = generatePositions(
    width,
    depth,
    xThreshold,
    zThreshold ?? xThreshold
  ); // assuming x is width; z is depth
  const balks = createBalks(positions);
  const corners = createCorners(positions, width, depth);
  return { balks, corners };
}
