import React from "react";
import InventoryTable from "../components/InventoryTable";

const Inventory = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Full Inventory</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Add New Item
        </button>
      </div>
      <InventoryTable />
    </div>
  );
};

export default Inventory;
