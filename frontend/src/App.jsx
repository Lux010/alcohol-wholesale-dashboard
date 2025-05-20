import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import { ConfirmationProvider } from "./contexts/ConfirmationContext";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders";
import Database from "./pages/Database";
import Settings from "./pages/Settings";
import InventoryItem from "./pages/InventoryItem";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AlertProvider>
      <ConfirmationProvider>
        <Router>
          <div className="flex h-screen bg-gray-100">
            <Sidebar
              isOpen={sidebarOpen}
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
              <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

              <main className="flex-1 overflow-y-auto p-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/inventory/:id" element={<InventoryItem />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/database" element={<Database />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </ConfirmationProvider>
    </AlertProvider>
  );
}

export default App;
