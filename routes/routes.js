const express = require("express");
const TransactionService = require("../services/transactionService.js");
const transactionRouter = express.Router();

transactionRouter.get("/:period?", TransactionService.getByPeriod);

transactionRouter.post("/", TransactionService.postNewOperation);

transactionRouter.patch("/", TransactionService.patchNewOperation);

transactionRouter.delete("/:_id", TransactionService.deleteExistenceOperation);

module.exports = transactionRouter;
