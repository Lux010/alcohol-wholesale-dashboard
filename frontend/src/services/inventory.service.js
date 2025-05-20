import axios from "axios";

const API_URL = "/api/inventory/";

const getInventoryByName = (name) => {
  return axios.get(API_URL + name);
};

const getInventoryByCategory = (category) => {
  return axios.get(API_URL + category);
};

const InventoryService = {
  getInventoryByName,
  getInventoryByCategory,
};

export default InventoryService;
