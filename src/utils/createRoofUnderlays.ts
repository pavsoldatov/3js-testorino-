import { Vector3, Euler } from "three";

export interface RoofUnderlayInstance {
  position: Vector3;
  scale: Vector3;
  rotation: Euler;
}

/**
 * Generates an array of roof underlay instances based on the structure's dimensions.
 *
 * @param width - The total width of the structure (including overhangs).
 * @param depth - The depth of the structure.
 * @param geometryWidth - The original width of a single underlay (default is 0.19 units).
 * @param heightOffset - The height offset/increment of the overhang (default is 0.1 units).
 * @returns An array of RoofUnderlayInstance objects representing the underlays.
 */
export function createRoofUnderlays(
  width: number,
  depth: number,
  geometryWidth: number = 0.19,
  heightOffset: number = 0.1
): RoofUnderlayInstance[] {
  const roofUnderlays: RoofUnderlayInstance[] = [];
  // vertical balk height + half the underlay depth to offcenter the origin + overhang offset + full lodge height
  const yPos = 2.2 + 0.01 + heightOffset + 0.2;

  // Total number of underlays needed
  const totalUnderlays = Math.ceil(width / geometryWidth);

  // Scaling factor along X-axis
  const scaleX = width / (totalUnderlays * geometryWidth);

  const isTotalUnderlaysEven = totalUnderlays % 2 === 0;
  const underlaysPerSide = Math.floor(totalUnderlays / 2);

  // Add center underlay if totalUnderlays is odd
  if (!isTotalUnderlaysEven) {
    roofUnderlays.push({
      position: new Vector3(0, yPos, 0),
      scale: new Vector3(scaleX, 1, depth),
      rotation: new Euler(0, 0, 0),
    });
  }

  // X+
  for (let i = 1; i <= underlaysPerSide; i++) {
    const xPos =
      geometryWidth * scaleX * (i - (isTotalUnderlaysEven ? 0.5 : 0));
    roofUnderlays.push({
      position: new Vector3(xPos, yPos, 0),
      scale: new Vector3(scaleX, 1, depth),
      rotation: new Euler(0, 0, 0),
    });
  }

  // X-
  for (let i = 1; i <= underlaysPerSide; i++) {
    const xPos =
      -geometryWidth * scaleX * (i - (isTotalUnderlaysEven ? 0.5 : 0));
    roofUnderlays.push({
      position: new Vector3(xPos, yPos, 0),
      scale: new Vector3(scaleX, 1, depth),
      rotation: new Euler(0, 0, 0),
    });
  }
  
  return roofUnderlays;
}
