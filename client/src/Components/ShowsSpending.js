import React, { useState } from "react";
import Spending from "./Spending";
import AddModal from "./AddModal";
import * as api from "../Api/httpMethods.js";

export default function ShowsSpending({ views, filterSpending }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(1);
  const [yearMonthDay, setYearMonthDay] = useState("2020-07-18");
  const [type, setType] = useState("-");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handleSubmitData = async (e) => {
    const request = await api.postNewElement(e);
    return request;
  };
  const current = { description, category, value, yearMonthDay, type };

  const handleUpdatedForm = (
    newDescription,
    newCategory,
    newValue,
    newYearMonthDay,
    newType
  ) => {
    if (newDescription !== null) {
      setDescription(newDescription);
      return;
    }
    if (newCategory !== null) {
      setCategory(newCategory);
      return;
    }
    if (newValue !== null) {
      setValue(newValue);
      return;
    }

    if (newYearMonthDay !== null) {
      setYearMonthDay(newYearMonthDay);
      return;
    }
    if (newType !== null) {
      setType(newType);
      return;
    }
  };

  const handleChangeFilter = (e) => {
    filterSpending(e.target.value);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0px",
        }}
      >
        <input
          placeholder="filter"
          style={style.inputFilter}
          onChange={handleChangeFilter}
        />
        <button
          className="btn-floating btn-medium waves-effect waves-light green"
          style={style.addButton}
          onClick={handleOpen}
        >
          <i style={{ background: "#71afe6" }} className="material-icons">
            add
          </i>
        </button>
      </div>
      <AddModal
        isOpen={modalIsOpen}
        modalName={"Inclusão de elementos"}
        onClose={handleClose}
        submitData={handleSubmitData}
        curData={current}
        onHandleChange={handleUpdatedForm}
      ></AddModal>
      {views.map((data) => {
        const { _id } = data;
        return (
          <span key={_id}>
            <Spending content={data} />
          </span>
        );
      })}
    </div>
  );
}

const style = {
  inputFilter: {
    width: "85%",
    marginLeft: "20px",
  },
  addButton: {
    marginRight: "20px",
    zIndex: 0,
  },
};
