import { createContext } from "react";
export const UtilsContext = createContext();

import { getAllCollectionDataLengthUrl } from "../utils/api";

export function Utils({ children }) {
  const getAllCollectionDataLength = async () => {
    try {
      const res = await fetch(getAllCollectionDataLengthUrl);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UtilsContext.Provider value={{ getAllCollectionDataLength }}>
      {children}
    </UtilsContext.Provider>
  );
}
