import { createContext } from "react";

export const RoomContext = createContext();
export function Room({ children }) {
  const room = "roomContext";
  return (
    <RoomContext.Provider value={{ room }}>{children}</RoomContext.Provider>
  );
}
