import { useBalkCorner } from "../hooks/useBalkCorner";

const rotations = {
  e: 0,
  n: Math.PI * 0.5,
  w: Math.PI,
  s: Math.PI * 1.5,
} as const;

interface CornerProps {
  direction: keyof typeof rotations;
}

function Corner({ direction }: CornerProps) {
  const balkCorner = useBalkCorner();
  const yRot = rotations[direction];

  return <primitive object={balkCorner} rotation={[0, yRot, 0]} />;
}

export default Corner;
