import ReactModal from "react-modal";
import React from "react";

export default function MyModal({
  isOpen,
  modalName,
  onClose,
  submitData,
  curData,
  onHandleChange,
}) {
  ReactModal.setAppElement("#root");
  let { description, category, value, yearMonthDay, type, _id } = curData;

  const handleSubmit = () => {
    let sendInformation = {
      newDescription: description,
      newCategory: category,
      newValue: value,
      newYearMonthDay: yearMonthDay,
      newType: type,
      _id,
    };
    submitData(sendInformation);
  };

  const handleChangeDescription = (e) => {
    onHandleChange(e.target.value, null, null, null, null);
  };

  const handleChangeCategory = (e) => {
    onHandleChange(null, e.target.value, null, null, null);
  };

  const handleChangeValue = (e) => {
    onHandleChange(null, null, e.target.value, null, null);
  };

  const handleChangeDate = (e) => {
    onHandleChange(null, null, null, e.target.value, null);
  };

  const handleChangeChecked = (e) => {
    if (e.target.id === "cadastrarDespesas")
      onHandleChange(null, null, null, null, "-");
    if (e.target.id === "cadastrarReceitas")
      onHandleChange(null, null, null, null, "+");
  };

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        style={{ content: { width: "30%", margin: "0 auto" } }}
      >
        <header style={style.headerStyle}>
          <h5 className="center">{modalName}</h5>
          <button
            onClick={onClose}
            className="waves-effect waves-light btn-small red"
          >
            X
          </button>
        </header>
        <form>
          <div style={style.formStyle}>
            <fieldset style={style.fieldsetStyle}>
              <div style={style.flexRowRadio}>
                <label htmlFor="cadastrarDespesas">
                  <input
                    type="radio"
                    id="cadastrarDespesas"
                    value={type}
                    defaultChecked={type === "-" ? true : false}
                    name="expense-earning"
                    onChange={handleChangeChecked}
                  />
                  <span style={{ fontWeight: "bold", color: "#f07667" }}>
                    Despesas
                  </span>
                </label>

                <label htmlFor="cadastrarReceitas">
                  <input
                    type="radio"
                    id="cadastrarReceitas"
                    value={type}
                    defaultChecked={type === "+" ? true : false}
                    name="expense-earning"
                    onChange={handleChangeChecked}
                  />
                  <span style={{ fontWeight: "bold", color: "#71afe6" }}>
                    Receita
                  </span>
                </label>
              </div>
            </fieldset>
            <fieldset style={style.fieldsetStyle}>
              <label htmlFor="description">Descrição:</label>
              <input
                onChange={handleChangeDescription}
                value={description}
                required="required"
                id="description"
              />

              <label htmlFor="category">Categoria:</label>
              <input
                onChange={handleChangeCategory}
                value={category}
                required="required"
                id="category"
              />
              <label htmlFor="value">Valor:</label>
              <div style={style.flexRow}>
                <input
                  value={value}
                  min="1"
                  onChange={handleChangeValue}
                  required="required"
                  style={{ width: "47%" }}
                  type="number"
                  id="value"
                />
                <input
                  value={yearMonthDay}
                  onChange={handleChangeDate}
                  required="required"
                  style={{ width: "47%" }}
                  type="date"
                  min="2019-01-01"
                  max="2021-12-31"
                />
              </div>
            </fieldset>
          </div>
          <div style={style.buttonStyle}>
            <input
              onClick={handleSubmit}
              id="submitButton"
              type="submit"
              value="Salvar"
              style={{ background: "#71afe6" }}
              className="waves-effect waves-light btn-small"
            ></input>
          </div>
        </form>
      </ReactModal>
    </div>
  );
}

const style = {
  headerStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formStyle: {
    border: "1px solid lightgray",
    borderRadius: "5px",
  },
  fieldsetStyle: {
    border: "none",
  },

  buttonStyle: {
    margin: "20px 38% 0px 38%",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexRowRadio: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "25px 0px",
  },
};
