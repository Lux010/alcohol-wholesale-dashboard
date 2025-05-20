import React from "react";
import InventoryCard from "../components/InventoryCard";
import InventoryChart from "../components/InventoryChart";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <InventoryCard
          title="Total Bottles"
          value="142"
          change="+12"
          icon="🍷"
          color="bg-blue-100 text-blue-800"
        />
        <InventoryCard
          title="Low Stock"
          value="8"
          change="+2"
          icon="⚠️"
          color="bg-red-100 text-red-800"
        />
        <InventoryCard
          title="Expiring Soon"
          value="5"
          change="-1"
          icon="⏳"
          color="bg-amber-100 text-amber-800"
        />
        <InventoryCard
          title="Categories"
          value="6"
          change="0"
          icon="🗂️"
          color="bg-green-100 text-green-800"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Inventory Overview</h2>
          <InventoryChart />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <p className="font-medium">Added 12 bottles</p>
              <p className="text-sm text-gray-500">Whiskey collection</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <p className="font-medium">Inventory check</p>
              <p className="text-sm text-gray-500">Completed by John</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-1">
              <p className="font-medium">2 bottles removed</p>
              <p className="text-sm text-gray-500">Expired products</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
