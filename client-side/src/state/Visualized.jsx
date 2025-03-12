import { createContext } from "react";
import {
  get7DaysBookingVisualizedUrl,
  get30DaysBookingVisualizedUrl,
  get3MonthsBookingVisualizedUrl,
  get6MonthsBookingVisualizedUrl,
  getLastYearBookingVisualizedUrl,
  bookinVisualizedUrl,
  //user
  userVizualizedUrl,
  user7DaysGrowthUrl,
  user30DaysGrowthUrl,
  user3MonthsGrowthUrl,
  user6MonthsGrowthUrl,
  userLastYearGrowthUrl,
} from "../utils/api";

export const VisualizedContext = createContext();

export function Visualized({ children }) {
  const bookingVisualized = async (filter) => {
    try {
      const res = await fetch(
        filter ? `${bookinVisualizedUrl}?status=${filter}` : bookinVisualizedUrl
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBookingVisualizedData = async (filter) => {
    try {
      switch (filter) {
        case "7days":
          const response = await fetch(get7DaysBookingVisualizedUrl);
          const responseData = await response.json();
          return responseData;
        case "30days":
          const response30 = await fetch(get30DaysBookingVisualizedUrl);
          const responseData30 = await response30.json();
          return responseData30;
        case "3months":
          const response3 = await fetch(get3MonthsBookingVisualizedUrl);
          const responseData3 = await response3.json();
          return responseData3;
        case "6months":
          const response6 = await fetch(get6MonthsBookingVisualizedUrl);
          const responseData6 = await response6.json();
          return responseData6;
        case "lastyear":
          const responseLastYear = await fetch(getLastYearBookingVisualizedUrl);
          const responseDataLastYear = await responseLastYear.json();
          return responseDataLastYear;
        default:
          const responseDefault = await fetch(get7DaysBookingVisualizedUrl);
          const responseDataDefault = await response.json();
          return responseDataDefault;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //user
  //visualized
  const getUserVizualizedData = async (filter) => {
    try {
      const response = await fetch(userVizualizedUrl);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUserGrowthVisualizedData = async (filter) => {
    try {
      switch (filter) {
        case "7days":
          const response = await fetch(user7DaysGrowthUrl);
          const responseData = await response.json();
          return responseData;
        case "30days":
          const response30 = await fetch(user30DaysGrowthUrl);
          const responseData30 = await response30.json();
          return responseData30;
        case "3months":
          const response3 = await fetch(user3MonthsGrowthUrl);
          const responseData3 = await response3.json();
          return responseData3;
        case "6months":
          const response6 = await fetch(user6MonthsGrowthUrl);
          const responseData6 = await response6.json();
          return responseData6;
        case "lastyear":
          const responseLastYear = await fetch(userLastYearGrowthUrl);
          const responseDataLastYear = await responseLastYear.json();
          return responseDataLastYear;
        default:
          const responseDefault = await fetch(user7DaysGrowthUrl);
          const responseDataDefault = await response.json();
          return responseDataDefault;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VisualizedContext.Provider
      value={{
        bookingVisualized,
        getAllBookingVisualizedData,
        getUserVizualizedData,
        getAllUserGrowthVisualizedData,
      }}
    >
      {children}
    </VisualizedContext.Provider>
  );
}
