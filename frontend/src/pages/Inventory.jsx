import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../contexts/AlertContext";
// import { useConfirmation } from "../contexts/ConfirmationContext";
import {
  createProductThunk,
  getAllProducts,
} from "../features/inventory/productSlice";
import ProductsTable from "../components/ProductsTable";
import AddProductModal from "../components/AddProductModal";

const Inventory = () => {
  const { showAlert } = useAlert();
  // const { showConfirmation } = useConfirmation();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.inventory.items);
  const inventoryStatus = useSelector((state) => state.inventory.status);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");
  const [abvMin, setAbvMin] = useState("");
  const [abvMax, setAbvMax] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    brand: "",
    category: "Spirits",
    abv: "",
    quantity: "",
    price: "",
    status: "In Stock",
    emoji: "🍾",
    supplierId: "",
  });

  const filteredProducts = products.data
    ?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      categoryFilter === "All" ? true : item.category === categoryFilter
    )
    .filter((item) =>
      statusFilter === "All" ? true : item.status === statusFilter
    )
    .filter((item) => (abvMin !== "" ? item.abv >= parseFloat(abvMin) : true))
    .filter((item) => (abvMax !== "" ? item.abv <= parseFloat(abvMax) : true));

  useEffect(() => {
    if (inventoryStatus === "idle") {
      dispatch(getAllProducts());
    }
  }, [dispatch, inventoryStatus]);

  const handleSubmit = () => {
    dispatch(createProductThunk({ ...newItem }))
      .unwrap()
      .then(() => {
        setNewItem({
          name: "",
          brand: "",
          category: "Spirits",
          abv: 0,
          quantity: 0,
          price: 0,
          status: "In Stock",
          emoji: "🍾",
          supplierId: "",
        });

        setShowModal(false);
      })
      .catch((err) => {
        console.error(err);
        showAlert(`${404}: Failed to add item.`, "error");
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

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-48"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-48"
        >
          <option value="All">All Categories</option>
          <option value="Whiskey">Whiskey</option>
          <option value="Wine">Wine</option>
          <option value="Beer">Beer</option>
          <option value="Champagne">Champagne</option>
          <option value="Vodka">Vodka</option>
          <option value="Gin">Gin</option>
          <option value="Rum">Rum</option>
          <option value="Cider">Cider</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-48"
        >
          <option value="All">All Statuses</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <input
          type="number"
          placeholder="Min ABV"
          value={abvMin}
          onChange={(e) => setAbvMin(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-24"
        />
        <input
          type="number"
          placeholder="Max ABV"
          value={abvMax}
          onChange={(e) => setAbvMax(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-24"
        />

        <button
          onClick={() => {
            setSearchTerm("");
            setCategoryFilter("All");
            setStatusFilter("All");
            setAbvMin("");
            setAbvMax("");
          }}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm"
        >
          Clear Filters
        </button>
      </div>

      {products.data !== undefined && (
        <ProductsTable products={filteredProducts} />
      )}

      {showModal && (
        <AddProductModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          product={newItem}
          onChange={(updated) => setNewItem(updated)}
        />
      )}
    </div>
  );
};

export default Inventory;
