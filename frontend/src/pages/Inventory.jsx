import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductThunk,
  getAllProducts,
} from "../features/inventory/productSlice";
import ProductsTable from "../components/ProductsTable";

const Inventory = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.inventory.items);
  const inventoryStatus = useSelector((state) => state.inventory.status);

  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Spirits",
    stock: 0,
    price: 0,
    supplierId: "",
  });

  useEffect(() => {
    if (inventoryStatus === "idle") {
      dispatch(getAllProducts());
    }
  }, [dispatch, inventoryStatus]);

  const handleChange = (field, value) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    dispatch(createProductThunk({ ...newItem }))
      .unwrap()
      .then(() => {
        setNewItem({
          name: "",
          category: "Spirits",
          stock: 0,
          price: 0,
          supplierId: "",
        });
        setShowModal(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add item.");
      });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Full Inventory</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add New Item
        </button>
      </div>

      {products.data !== undefined && (
        <ProductsTable products={products.data} />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Add New Inventory Item</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newItem.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border rounded-md p-2"
              />
              <select
                value={newItem.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="Spirits">Spirits</option>
                <option value="Wine">Wine</option>
                <option value="Beer">Beer</option>
              </select>
              <input
                type="number"
                placeholder="Stock"
                value={newItem.stock}
                onChange={(e) =>
                  handleChange("stock", parseInt(e.target.value))
                }
                className="w-full border rounded-md p-2"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) =>
                  handleChange("price", parseFloat(e.target.value))
                }
                className="w-full border rounded-md p-2"
              />
              <input
                type="number"
                placeholder="Supplier ID"
                value={newItem.supplierId}
                onChange={(e) => handleChange("supplierId", e.target.value)}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div className="p-4 border-t flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!newItem.name || newItem.price <= 0}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
