import { useMemo } from "react";
import { BalkInstance, BalksConfig, CornerInstance } from "../types";
import { GRID_DIMENSIONS } from "../constants";
import { Vector3 } from "three";

export const useAdjustedInstances = (
  instances: BalkInstance[] | CornerInstance[],
  config: BalksConfig
): BalkInstance[] | CornerInstance[] => {
  return useMemo(() => {
    return instances.map((instance) => ({
      ...instance,
      position: new Vector3(
        instance.position.x * (config.width / GRID_DIMENSIONS.width),
        instance.position.y,
        instance.position.z * (config.depth / GRID_DIMENSIONS.depth)
      ),
    }));
  }, [instances, config.width, config.depth]);
};
