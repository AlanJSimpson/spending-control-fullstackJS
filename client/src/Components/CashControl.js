import React, { useState, useEffect } from "react";
import * as api from "../Api/httpMethods";
import { formatMoney } from "../Helpers/formattersValue";
import css from "./styleCashContro.module.css";

export default function CashControl({ onDateChange, curDate }) {
  const [releases, setReleases] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  const handleDateChange = (event) => {
    return onDateChange(event.target.value);
  };

  useEffect(() => {
    const reqData = async () => {
      const searchData = (await api.getMonthDatas(curDate)).data;

      setReleases(searchData.length);
      setRevenue(
        searchData.reduce((acc, cur) => {
          return cur.type === "+" ? acc + cur.value : acc + 0;
        }, 0)
      );
      setExpenses(
        Math.abs(
          searchData.reduce((acc, cur) => {
            return cur.type === "-" ? acc - cur.value : acc + 0;
          }, 0)
        )
      );
      setBalance(
        searchData.reduce((acc, cur) => {
          return cur.type === "+" ? acc + cur.value : acc - cur.value;
        }, 0)
      );
    };

    reqData();
  }, [curDate]);

  const handleChangeDateByButton = (e) => {
    const inputDate = document.querySelector("#input-date");

    if (e.target.id === "btn-left") {
      inputDate.stepDown();
    }
    if (e.target.id === "btn-right") {
      inputDate.stepUp();
    }
    onDateChange(inputDate.value);
  };

  return (
    <div>
      <h1 className="center">Controle financeiro pessoal</h1>
      <div
        className="center"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "70px",
        }}
      >
        <button
          onClick={handleChangeDateByButton}
          style={{ marginRight: "5px", background: "#71afe6", zIndex: 0 }}
          id="btn-left"
          className="waves-effect waves-light btn btn-small"
        >
          &lt;
        </button>
        <input
          type="month"
          min="2019-01"
          max="2021-12"
          id="input-date"
          value={curDate}
          step="1"
          onChange={handleDateChange}
          style={{
            height: "33px",
            border: "none",
            paddingLeft: "5px",
          }}
        />
        <button
          onClick={handleChangeDateByButton}
          style={{ marginLeft: "5px", background: "#71afe6", zIndex: 0 }}
          id="btn-right"
          className="waves-effect waves-light btn btn-small"
        >
          &gt;
        </button>
      </div>

      <form className={css.financialPlanner}>
        <div>
          <label htmlFor="releasesInput">Lançamentos: </label>
          <input
            style={{ fontWeight: "bold" }}
            id="releasesInput"
            readOnly="readOnly"
            value={releases}
          ></input>
        </div>
        <div>
          <label htmlFor="revenueInput">Receitas: </label>
          <input
            style={{ color: "#71afe6", fontWeight: "bold" }}
            id="revenueInput"
            readOnly="readOnly"
            value={formatMoney(revenue)}
          ></input>
        </div>
        <div>
          <label htmlFor="expensesInput">Despesas: </label>
          <input
            style={{ color: "#f07667", fontWeight: "bold" }}
            id="expensesInput"
            readOnly="readOnly"
            value={formatMoney(expenses)}
          ></input>
        </div>
        <div>
          <label htmlFor="balanceInput">Saldo: </label>
          <input
            style={{ color: "#71afe6", fontWeight: "bold" }}
            id="balanceInput"
            readOnly="readOnly"
            value={formatMoney(balance)}
          ></input>
        </div>
      </form>
    </div>
  );
}
