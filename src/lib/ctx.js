import React, { createContext, useState } from 'react';

export const FabricContext = createContext();
export const FabricContextProvider = ({ children }) => {
  const [canvas, setCanvas] = useState();

  const initCanvas = (c) => {
    setCanvas(c);
  };

  return (
    <FabricContext.Provider value={[canvas, initCanvas]}>
      {children}
    </FabricContext.Provider>
  );
};
