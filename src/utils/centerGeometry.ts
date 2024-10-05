import { BufferGeometry, Vector3 } from "three";

export function centerGeometry(geometry: BufferGeometry): BufferGeometry {
  geometry.computeBoundingBox();
  if (!geometry.boundingBox) return geometry;

  const center = new Vector3();
  geometry.boundingBox.getCenter(center);
  return geometry.translate(-center.x, -center.y, -center.z);
}
