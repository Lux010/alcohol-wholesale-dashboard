import React from "react";

const AddProductModal = ({ isOpen, onClose, onSubmit, product, onChange }) => {
  if (!isOpen) return null;

  const categoryEmojiMap = {
    Whiskey: "🥃",
    Wine: "🍷",
    Beer: "🍺",
    Champagne: "🍾",
    Vodka: "🍸",
    Gin: "🍸",
    Rum: "🏴‍☠️",
    Cider: "🍏",
    Spirits: "🍶",
  };

  const handleChange = (field, value) => {
    const updated = { ...product, [field]: value };
    if (field === "category") {
      updated.emoji = categoryEmojiMap[value] || "🍶";
    }
    onChange(updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium">Add New Inventory Item</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Brand"
            value={product.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <select
            value={product.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full border rounded-md p-2"
          >
            {Object.keys(categoryEmojiMap).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="ABV (%)"
            value={product.abv}
            onChange={(e) => handleChange("abv", parseFloat(e.target.value))}
            className="w-full border rounded-md p-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={product.quantity}
            onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
            className="w-full border rounded-md p-2"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={product.price}
            onChange={(e) => handleChange("price", parseFloat(e.target.value))}
            className="w-full border rounded-md p-2"
          />
          <select
            value={product.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <input
            type="text"
            placeholder="Emoji"
            value={product.emoji}
            readOnly
            className="w-full border rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
          <input
            type="number"
            placeholder="Supplier ID"
            value={product.supplierId}
            onChange={(e) => handleChange("supplierId", e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="p-4 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!product.name || product.price <= 0}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
