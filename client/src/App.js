import React, { useState, useEffect } from "react";
import CashControl from "./Components/CashControl";
import ShowsSpending from "./Components/ShowsSpending";
import * as api from "./Api/httpMethods";

export default function App() {
  const [date, setDate] = useState("2020-07");
  const [viewsData, setViewsData] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleFilter = async (e) => {
    let request = (await api.getMonthDatas(date)).data;
    let filterData = request.filter((data) =>
      data.description.toLowerCase().includes(e.toLowerCase())
    );
    setViewsData(filterData);
  };

  useEffect(() => {
    const requestDatas = async () => {
      let request = (await api.getMonthDatas(date)).data;

      request.sort((a, b) => a.day - b.day);

      let relevantDatas = request.map((data) => {
        const {
          day,
          category,
          description,
          value,
          type,
          _id,
          yearMonthDay,
        } = data;
        return {
          day,
          yearMonthDay,
          category,
          description,
          value,
          type,
          _id,
        };
      });

      setViewsData(relevantDatas);
    };

    requestDatas();
  }, [date]);

  return (
    <div className="container">
      <CashControl onDateChange={handleDateChange} curDate={date} />
      <ShowsSpending views={viewsData} filterSpending={handleFilter} />
    </div>
  );
}
