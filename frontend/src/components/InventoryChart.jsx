import React from "react";

const InventoryChart = () => {
  const data = [
    { category: "Whiskey", value: 35 },
    { category: "Vodka", value: 28 },
    { category: "Rum", value: 20 },
    { category: "Gin", value: 15 },
    { category: "Tequila", value: 18 },
    { category: "Wine", value: 26 },
  ];

  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Categories</span>
        <span>Bottles</span>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="w-24 text-sm font-medium text-gray-600">
              {item.category}
            </span>
            <div className="flex-1 mx-2">
              <div
                className="h-6 rounded bg-blue-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="w-8 text-right text-sm font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between text-xs text-gray-500">
        <span>
          Total: {data.reduce((sum, item) => sum + item.value, 0)} bottles
        </span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default InventoryChart;
