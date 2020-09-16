import axios from "axios";

const url = "http://localhost:3001/api/transaction/";

async function getMonthDatas(monthRequired) {
  const getRequest = await axios.get(url + monthRequired);
  return getRequest;
}

async function postNewElement(newElement) {
  const postRequest = await axios.post(url, newElement);
  return postRequest;
}

async function patchElement(updatedElement) {
  const patchRequest = await axios.patch(url, updatedElement);
  return patchRequest;
}

async function deleteElement(deletedElement) {
  const deleteRequest = await axios.delete(url + deletedElement);
  return deleteRequest;
}

export { getMonthDatas, postNewElement, patchElement, deleteElement };
