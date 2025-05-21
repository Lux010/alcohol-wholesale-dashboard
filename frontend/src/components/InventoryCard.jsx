import React from "react";

const InventoryCard = ({ title, value, change, icon, color }) => {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <span className={`text-3xl ${color}`}>{icon}</span>
      </div>
      <div
        className={`mt-4 text-sm ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {change} from last month
      </div>
    </div>
  );
};

export default InventoryCard;
