import { useMemo } from "react";
import { BalkInstance, BalksConfig } from "../types";
import { GRID_DIMENSIONS } from "../constants";

export const useAdjustedInstances = (
  instances: BalkInstance[],
  config: BalksConfig
): BalkInstance[] => {
  return useMemo(() => {
    return instances.map((instance) => ({
      ...instance,
      position: [
        (instance.position[0] * config.width) / GRID_DIMENSIONS.width,
        instance.position[1],
        (instance.position[2] * config.depth) / GRID_DIMENSIONS.depth,
      ],
    }));
  }, [instances, config.width, config.depth]);
};
