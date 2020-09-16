const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const TransactionModel = require("../models/TransactionModel");

exports.getByPeriod = async (req, res) => {
  const period = req.params.period;

  if (!period)
    return res.status(400).send({
      error:
        "É necessário informar o parâmetro \\periods\\, cujo valor deve estar no formato yyyy-mm ",
    });

  try {
    const filterSearch = await TransactionModel.find({ yearMonth: period });
    res.send(filterSearch);
  } catch (error) {
    res.send({ error: error.message });
  }
};

exports.postNewOperation = async (req, res) => {
  try {
    const { ...newOperation } = req.body;

    let newPost = {
      description: newOperation.newDescription,
      value: Number(newOperation.newValue),
      category: newOperation.newCategory,
      year: Number(newOperation.newYearMonthDay.substring(0, 4)),
      month: Number(newOperation.newYearMonthDay.substring(5, 7)),
      day: Number(newOperation.newYearMonthDay.substring(8)),
      yearMonth:
        newOperation.newYearMonthDay.substring(0, 4) +
        "-" +
        newOperation.newYearMonthDay.substring(5, 7),
      yearMonthDay: newOperation.newYearMonthDay,
      type: newOperation.newType,
    };

    const registeredOperation = await TransactionModel.create(newPost);

    res.status(201).send(registeredOperation);
  } catch (error) {
    res.send({ error: error.message });
  }
};

exports.patchNewOperation = async (req, res) => {
  try {
    const { ...newOperation } = req.body;

    let updating = {
      description: newOperation.description,
      value: Number(newOperation.value),
      category: newOperation.category,
      year: Number(newOperation.yearMonthDay.substring(0, 4)),
      month: Number(newOperation.yearMonthDay.substring(5, 7)),
      day: Number(newOperation.yearMonthDay.substring(8)),
      yearMonth:
        newOperation.yearMonthDay.substring(0, 4) +
        "-" +
        newOperation.yearMonthDay.substring(5, 7),
      yearMonthDay: newOperation.yearMonthDay,
    };

    const updateFile = await TransactionModel.findByIdAndUpdate(
      { _id: newOperation._id },
      updating,
      { new: true }
    );

    res.status(200).send(updateFile);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteExistenceOperation = async (req, res) => {
  try {
    const idToDelete = req.params._id;
    const deleteData = await TransactionModel.findByIdAndDelete({
      _id: idToDelete,
    });

    res.send(deleteData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
