// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "../contexts/AlertContext";
// // import { useConfirmation } from "../contexts/ConfirmationContext";
// import {
//   createProductThunk,
//   getAllProducts,
// } from "../features/inventory/productSlice";
// import ProductsTable from "../components/ProductsTable";
// import AddProductModal from "../components/AddProductModal";

// const Inventory = () => {
//   const { showAlert } = useAlert();
//   // const { showConfirmation } = useConfirmation();

//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.inventory.items);
//   const inventoryStatus = useSelector((state) => state.inventory.status);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");

//   const [statusFilter, setStatusFilter] = useState("All");
//   const [abvMin, setAbvMin] = useState("");
//   const [abvMax, setAbvMax] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [newItem, setNewItem] = useState({
//     name: "",
//     brand: "",
//     category: "Spirits",
//     abv: "",
//     quantity: "",
//     cost_price: "",
//     status: "In Stock",
//     emoji: "🍾",
//     supplier_id: "",
//   });

//   const filteredProducts = products.data
//     ?.filter((item) =>
//       item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter((item) =>
//       categoryFilter === "All" ? true : item.category === categoryFilter
//     )
//     .filter((item) =>
//       statusFilter === "All" ? true : item.status === statusFilter
//     )
//     .filter((item) => (abvMin !== "" ? item.abv >= parseFloat(abvMin) : true))
//     .filter((item) => (abvMax !== "" ? item.abv <= parseFloat(abvMax) : true));

//   useEffect(() => {
//     if (inventoryStatus === "idle") {
//       dispatch(getAllProducts());
//     }
//   }, [dispatch, inventoryStatus]);

//   const handleSubmit = () => {
//     dispatch(createProductThunk({ ...newItem }))
//       .unwrap()
//       .then((response) => {
//         console.log("====================================");
//         console.log(response);
//         console.log("====================================");
//         // Reset form
//         setNewItem({
//           name: "",
//           brand: "",
//           category: "Spirits",
//           abv: 0,
//           quantity: 0,
//           cost_price: 0,
//           status: "In Stock",
//           emoji: "🍾",
//           supplier_id: "",
//         });

//         setShowModal(false);

//         // No need to manually refresh - Redux slice handles it automatically
//         showAlert("Product added successfully!", "success");
//       })
//       .catch((err) => {
//         console.error(err);
//         showAlert(`${404}: Failed to add item.`, "error");
//       });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Full Inventory</h2>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           Add New Item
//         </button>
//       </div>

//       <div className="flex flex-wrap gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border px-3 py-2 rounded-md w-full md:w-48"
//         />

//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className="border px-3 py-2 rounded-md w-full md:w-48"
//         >
//           <option value="All">All Categories</option>
//           <option value="Whiskey">Whiskey</option>
//           <option value="Wine">Wine</option>
//           <option value="Beer">Beer</option>
//           <option value="Champagne">Champagne</option>
//           <option value="Vodka">Vodka</option>
//           <option value="Gin">Gin</option>
//           <option value="Rum">Rum</option>
//           <option value="Cider">Cider</option>
//         </select>

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border px-3 py-2 rounded-md w-full md:w-48"
//         >
//           <option value="All">All Statuses</option>
//           <option value="In Stock">In Stock</option>
//           <option value="Low Stock">Low Stock</option>
//           <option value="Out of Stock">Out of Stock</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Min ABV"
//           value={abvMin}
//           onChange={(e) => setAbvMin(e.target.value)}
//           className="border px-3 py-2 rounded-md w-full md:w-24"
//         />
//         <input
//           type="number"
//           placeholder="Max ABV"
//           value={abvMax}
//           onChange={(e) => setAbvMax(e.target.value)}
//           className="border px-3 py-2 rounded-md w-full md:w-24"
//         />

//         <button
//           onClick={() => {
//             setSearchTerm("");
//             setCategoryFilter("All");
//             setStatusFilter("All");
//             setAbvMin("");
//             setAbvMax("");
//           }}
//           className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm"
//         >
//           Clear Filters
//         </button>
//       </div>

//       {products.data !== undefined && (
//         <ProductsTable products={filteredProducts} />
//       )}

//       {showModal && (
//         <AddProductModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           onSubmit={handleSubmit}
//           product={newItem}
//           onChange={(updated) => setNewItem(updated)}
//         />
//       )}
//     </div>
//   );
// };

// export default Inventory;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../contexts/AlertContext";
// import { useConfirmation } from "../contexts/ConfirmationContext";
import {
  createProductThunk,
  getAllProducts,
  clearError,
  resetCreateStatus,
} from "../features/inventory/productSlice";
import ProductsTable from "../components/ProductsTable";
import AddProductModal from "../components/AddProductModal";

const Inventory = () => {
  const { showAlert } = useAlert();
  // const { showConfirmation } = useConfirmation();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.inventory.items);
  const inventoryStatus = useSelector((state) => state.inventory.status);
  const createStatus = useSelector((state) => state.inventory.createStatus);
  const error = useSelector((state) => state.inventory.error);

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
    cost_price: "",
    status: "In Stock",
    emoji: "🍾",
    supplier_id: "",
  });

  // Debug: Log products data to see what we're working with
  useEffect(() => {
    if (products.data) {
      console.log("Products data:", products.data);
      console.log("Number of products:", products.data.length);
      // Check for any products with undefined names
      const invalidProducts = products.data.filter((item) => !item?.name);
      if (invalidProducts.length > 0) {
        console.warn(
          "Found products with undefined/null names:",
          invalidProducts
        );
      }
    }
  }, [products.data]);

  const filteredProducts = products.data
    ?.filter((item) => {
      // Safe name filtering - handle undefined/null names
      const itemName = item?.name || "";
      const searchTermLower = searchTerm.toLowerCase();
      return itemName.toLowerCase().includes(searchTermLower);
    })
    .filter((item) =>
      categoryFilter === "All" ? true : item?.category === categoryFilter
    )
    .filter((item) =>
      statusFilter === "All" ? true : item?.status === statusFilter
    )
    .filter((item) =>
      abvMin !== "" ? (item?.abv || 0) >= parseFloat(abvMin) : true
    )
    .filter((item) =>
      abvMax !== "" ? (item?.abv || 0) <= parseFloat(abvMax) : true
    );

  // Load products on component mount
  useEffect(() => {
    if (inventoryStatus === "idle") {
      dispatch(getAllProducts());
    }
  }, [dispatch, inventoryStatus]);

  // Handle errors
  useEffect(() => {
    if (error) {
      showAlert(error, "error");
      dispatch(clearError());
    }
  }, [error, showAlert, dispatch]);

  // Handle create status changes
  useEffect(() => {
    if (createStatus === "succeeded") {
      showAlert("Product added successfully!", "success");
      dispatch(resetCreateStatus());
    }
  }, [createStatus, showAlert, dispatch]);

  const handleSubmit = () => {
    // Basic validation
    if (!newItem.name.trim()) {
      showAlert("Product name is required", "error");
      return;
    }

    if (!newItem.brand.trim()) {
      showAlert("Brand is required", "error");
      return;
    }

    if (!newItem.cost_price || parseFloat(newItem.cost_price) < 0) {
      showAlert("Please enter a valid price", "error");
      return;
    }

    if (!newItem.quantity || parseInt(newItem.quantity) < 0) {
      showAlert("Please enter a valid quantity", "error");
      return;
    }

    // Prepare the data for submission
    const productData = {
      ...newItem,
      abv: parseFloat(newItem.abv) || 0,
      quantity: parseInt(newItem.quantity) || 0,
      cost_price: parseFloat(newItem.cost_price) || 0,
    };

    dispatch(createProductThunk(productData))
      .unwrap()
      .then(() => {
        // Reset form
        setNewItem({
          name: "",
          brand: "",
          category: "Spirits",
          abv: "",
          quantity: "",
          cost_price: "",
          status: "In Stock",
          emoji: "🍾",
          supplier_id: "",
        });

        setShowModal(false);
      })
      .catch((err) => {
        console.error("Failed to create product:", err);
        // Error is handled by the useEffect above
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form when closing modal
    setNewItem({
      name: "",
      brand: "",
      category: "Spirits",
      abv: "",
      quantity: "",
      cost_price: "",
      status: "In Stock",
      emoji: "🍾",
      supplier_id: "",
    });
  };

  const handleRetry = () => {
    dispatch(getAllProducts());
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Full Inventory</h2>
          {products.total > 0 && (
            <p className="text-sm text-gray-600">
              {products.total} products total
            </p>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={createStatus === "loading"}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          {createStatus === "loading" && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
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

      {/* Loading state */}
      {inventoryStatus === "loading" && (
        <div className="flex justify-center items-center p-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2">Loading products...</span>
        </div>
      )}

      {/* Error state */}
      {inventoryStatus === "failed" && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <p className="text-red-700 mb-2">Failed to load products</p>
          <button
            onClick={handleRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* Products table */}
      {inventoryStatus === "succeeded" && products.data && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {products.data.length === 0
                ? "No products found. Add your first product!"
                : "No products match your current filters."}
            </div>
          ) : (
            <ProductsTable products={filteredProducts} />
          )}
        </>
      )}

      {/* Add Product Modal */}
      {showModal && (
        <AddProductModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          product={newItem}
          onChange={(updated) => setNewItem(updated)}
          isSubmitting={createStatus === "loading"}
        />
      )}
    </div>
  );
};

export default Inventory;
