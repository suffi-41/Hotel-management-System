import { createContext } from "react";
import { Room } from "./Room";
import { sendOtpUrl } from "../utils/api";


export const UserContext = createContext();

export function User({ children }) {
  const sendOtp = async (id) => {
    try {
      const response = await fetch(`${sendOtpUrl}/${id}`, {
        method: "POST",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  let username = "User";

  return (
    <UserContext.Provider value={{ username, sendOtp }}>
      <Room>{children}</Room>
    </UserContext.Provider>
  );
}
