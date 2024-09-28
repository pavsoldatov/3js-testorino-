import { createContext, useState, ReactNode, FC } from "react";
import { BalksConfig, BalksContextType } from "./types";

export const BalksContext = createContext<BalksContextType | undefined>(
  undefined
);

interface BalksProviderProps {
  children: ReactNode;
}

export const BalksProvider: FC<BalksProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<BalksConfig>({ width: 3, depth: 3 });

  return (
    <BalksContext.Provider value={{ config, setConfig }}>
      {children}
    </BalksContext.Provider>
  );
};
