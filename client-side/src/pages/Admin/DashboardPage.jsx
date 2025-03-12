import React, { useContext, useEffect, useState } from "react";
import BookingChart from "./inside/component.jsx/BookingChart";
import UserGrowthChart from "./inside/component.jsx/UserGrowthChart";
import BookingGrowthChart from "./inside/component.jsx/BookingGrowthChart";

import Card from "../../components/Card";
import { UtilsContext } from "../../state/Utils";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const { getAllCollectionDataLength } = useContext(UtilsContext);
  const [usersData, setUsersData] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["totalCollectionsData"],
    queryFn: getAllCollectionDataLength,
  });

  useEffect(() => {
    if (data?.status) {
      setUsersData(data.users);
      setEmployeesData(data.employees);
    } else {
      toast.error(data?.message);
    }
  }, [data]);

  return isLoading ? (
    <div>Loadding...</div>
  ) : (
    <div>
      <div className="w-full mt-4">
        <h1 className="text-start p-2 text-2xl font-bold bg-white mb-2 rounded-sm shadow-lg">
          User Detials
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-2 grid-cols-2">
          {usersData?.map((data) => {
            return (
              <Card
                cardName={data?.name}
                length={data?.length}
                status={data.status}
              />
            );
          })}
        </div>
      </div>

      <div className="w-full mt-4">
        <h1 className="text-start p-2 text-2xl font-bold bg-white  mb-2 rounded-sm shadow-lg">
          Employees Detials
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-2 grid-cols-2">
          {employeesData?.map((data) => {
            return (
              <Card
                cardName={data?.name}
                length={data?.length}
                status={data.status}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
