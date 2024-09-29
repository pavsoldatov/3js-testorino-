import { useState, ReactNode, FC } from "react";
import { DEFAULT_BALK_WIDTH, DEFAULT_BALK_DEPTH } from "../../constants";
import { Dimensions, DimensionsContext } from "./DimensionsContext";

interface DimensionsProviderProps {
  children: ReactNode;
}

export const DimensionsProvider: FC<DimensionsProviderProps> = ({
  children,
}) => {
  const [config, setConfig] = useState<Dimensions>({
    width: DEFAULT_BALK_WIDTH,
    depth: DEFAULT_BALK_DEPTH,
  }); // meters

  return (
    <DimensionsContext.Provider value={{ config, setConfig }}>
      {children}
    </DimensionsContext.Provider>
  );
};
