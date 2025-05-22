import axios from "axios";

const API_URL = "http://localhost:3001/api/products";

const getAllProducts = () => {
  return axios.get(API_URL).then((response) => {
    return response.data;
  });
};

const getProductsById = (id) => {
  return axios.get(API_URL + id).then((response) => {
    return response.data;
  });
};

const updateProduct = (id) => {
  return axios.put(API_URL + id).then((response) => {
    return response.data;
  });
};

const createProduct = (product) => {
  return axios.post(API_URL, product).then((response) => {
    return response.data;
  });
};

const deleteProduct = (id) => {
  return axios.delete(API_URL + id).then((response) => {
    return response.data;
  });
};

const ProductService = {
  getAllProducts,
  getProductsById,
  updateProduct,
  createProduct,
  deleteProduct,
};

export default ProductService;
