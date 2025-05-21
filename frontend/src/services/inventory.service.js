import axios from "axios";

const API_URL = "/api/products";

const fetchInventory = () => {
  return axios.get(API_URL);
};

const createProduct = () => {
  return axios.get(API_URL);
};

const InventoryService = {
  fetchInventory,
  createProduct,
};

export default InventoryService;
