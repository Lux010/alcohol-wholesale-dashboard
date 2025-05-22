import React from "react";
import { useParams, Link } from "react-router-dom";
import { inventoryData } from "../data/inventoryData";

const InventoryItem = () => {
  const { id } = useParams();
  const item = inventoryData.find((item) => item.id === parseInt(id));

  if (!item) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Item Not Found</h2>
        <Link to="/inventory" className="text-blue-600 hover:text-blue-800">
          Back to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{item.name}</h2>
          <p className="text-gray-600">{item.brand}</p>
        </div>
        <Link
          to="/inventory"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          Back to Inventory
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
              {item.emoji}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{item.category}</h3>
              <p className="text-gray-500">ABV: {item.abv}%</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Status</h4>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${
                  item.status === "In Stock"
                    ? "bg-green-100 text-green-800"
                    : item.status === "Low Stock"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Quantity</h4>
              <p>
                {item.quantity} {item.quantity === 1 ? "bottle" : "bottles"}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Price</h4>
              <p>${item.cost_price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Additional Information</h3>
          <p className="text-gray-600">
            More details about this product would appear here.
          </p>
          <p className="text-gray-600 mt-2">
            This could include tasting notes, supplier information, or purchase
            history.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
