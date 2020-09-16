import React, { useState } from "react";
import { formatMoney } from "../Helpers/formattersValue";
import css from "./spending.module.css";
import * as api from "../Api/httpMethods";
import EditModal from "./EditModal";

export default function Spending({ content }) {
  const [modalIsOpen, setModalIsOpen] = useState(content.false);

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    let valuesToPatch = {
      _id: e._id,
      description: e.newDescription,
      value: e.newValue,
      category: e.newCategory,
      yearMonthDay: e.newYearMonthDay,
    };

    const patchRequest = await api.patchElement(valuesToPatch);
    return patchRequest;
  };

  const handleDelete = async () => {
    const deleteRequest = await api.deleteElement(content._id);
    window.location.reload();
    return deleteRequest;
  };

  return (
    <div className={css.spendingBox}>
      <div className={css.divRow}>
        <span>
          <strong>{content.day}</strong>
        </span>
        <div className={css.spendingText}>
          <span>
            <strong>{content.category}</strong>
          </span>
          <span>{content.description}</span>
        </div>
      </div>
      <div className={css.divValues}>
        <span
          style={{
            color: content.type === "-" ? "#f07667" : "#71afe6",
          }}
        >
          <strong>{formatMoney(content.value)}</strong>
        </span>
        <button
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <i style={{ color: "#71afe6" }} className="tiny material-icons">
            edit
          </i>
        </button>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <i style={{ color: "red" }} className="tiny material-icons">
            delete
          </i>
        </button>
        <EditModal
          isOpen={modalIsOpen}
          modalName={"Edição de elemento"}
          onClose={handleClose}
          submitData={handleSubmit}
          curData={content}
          disabled={true}
        ></EditModal>
      </div>
    </div>
  );
}
