// src/pages/Database.js
import React, { useState, useEffect } from "react";
import { useAlert } from "../contexts/AlertContext";
import { useConfirmation } from "../contexts/ConfirmationContext";

import {
  FiDatabase,
  FiHardDrive,
  FiAlertTriangle,
  FiCheckCircle,
  FiDownload,
  FiUpload,
  FiSave,
  FiTrash2,
  FiEdit,
  FiEye,
  FiPlus,
  FiSearch,
  FiPhone,
  FiX,
} from "react-icons/fi";

const Database = () => {
  const { showAlert } = useAlert();
  const { showConfirmation } = useConfirmation();

  // Database tables state
  const [tables, setTables] = useState([
    {
      name: "inventory",
      count: 142,
      description: "Alcohol products inventory",
      health: "healthy",
    },
    {
      name: "suppliers",
      count: 18,
      description: "Vendor information",
      health: "healthy",
    },
    {
      name: "orders",
      count: 256,
      description: "Customer orders history",
      health: "warning",
    },
    {
      name: "users",
      count: 12,
      description: "System users and permissions",
      health: "critical",
    },
    {
      name: "categories",
      count: 6,
      description: "Product categories",
      health: "healthy",
    },
  ]);

  const [selectedTable, setSelectedTable] = useState("inventory");
  const [tableData, setTableData] = useState([]);
  const [isQuerying, setIsQuerying] = useState(false);
  const [query, setQuery] = useState("SELECT * FROM inventory LIMIT 10");
  const [queryResult, setQueryResult] = useState(null);
  const [showCreateTable, setShowCreateTable] = useState(false);
  const [newTable, setNewTable] = useState({
    name: "",
    fields: [{ name: "id", type: "INT", primary: true, autoincrement: true }],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [healthFilter, setHealthFilter] = useState("all");

  // Add state for confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dialogConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  // Recent updates data
  const [recentUpdates] = useState([
    {
      id: 1,
      table: "inventory",
      action: "INSERT",
      records: 5,
      timestamp: "2023-05-15 14:32:45",
      user: "admin",
    },
    {
      id: 2,
      table: "orders",
      action: "UPDATE",
      records: 12,
      timestamp: "2023-05-15 13:21:10",
      user: "manager",
    },
    {
      id: 3,
      table: "suppliers",
      action: "DELETE",
      records: 2,
      timestamp: "2023-05-15 11:45:33",
      user: "admin",
    },
    {
      id: 4,
      table: "users",
      action: "UPDATE",
      records: 1,
      timestamp: "2023-05-15 09:12:07",
      user: "system",
    },
  ]);

  // Database health metrics
  const [healthMetrics, setHealthMetrics] = useState({
    totalSize: "2.45 GB",
    lastBackup: "2023-05-14 23:00:00",
    activeConnections: 8,
    cacheHitRatio: "98.7%",
    uptime: "14 days, 6 hours",
  });

  // Load table data when selected

  useEffect(() => {
    if (selectedTable) {
      setIsQuerying(true);
      setTimeout(() => {
        const mockData = Array.from({ length: 10 }, (_, i) => {
          const baseItem = {
            id: i + 1,
            name: `Sample ${selectedTable} item ${i + 1}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: ["active", "inactive", "pending"][
              Math.floor(Math.random() * 3)
            ],
          };

          // Add table-specific fields

          if (selectedTable === "inventory") {
            return {
              ...baseItem,
              quantity: Math.floor(Math.random() * 100),
              price: (Math.random() * 100).toFixed(2),
              category: ["whiskey", "vodka", "rum", "gin"][
                Math.floor(Math.random() * 4)
              ],
            };
          } else if (selectedTable === "orders") {
            return {
              ...baseItem,
              customer: `Customer ${i + 1}`,
              total: (Math.random() * 500).toFixed(2),
              status: ["completed", "pending", "cancelled"][
                Math.floor(Math.random() * 3)
              ],
            };
          }
          return baseItem;
        });
        setTableData(mockData);
        setIsQuerying(false);
      }, 500);
    }
  }, [selectedTable]);

  // Filter tables based on search and health filter
  const filteredTables = tables.filter((table) => {
    const matchesSearch =
      table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHealth =
      healthFilter === "all" ||
      (healthFilter === "healthy" && table.health === "healthy") ||
      (healthFilter === "issues" && table.health !== "healthy");
    return matchesSearch && matchesHealth;
  });

  // Quick action handlers
  // Handle Export
  const handleExport = () => {
    showAlert(`Exporting data from ${selectedTable || "all tables"}`, "info");
  };

  const handleImport = () => {
    showAlert(`Importing data from ${selectedTable || "all tables"}`, "info");
  };

  const handleBackup = () => {
    showAlert(`Starting database backup...`, "info");
    // Simulate backup
    setTimeout(() => {
      setHealthMetrics((prev) => ({
        ...prev,
        lastBackup: new Date().toLocaleString(),
      }));
      showAlert(`Backup completed successfully!`, "success");
    }, 2000);
  };

  const executeQuery = () => {
    setIsQuerying(true);
    setTimeout(() => {
      // Simulate query execution
      setQueryResult({
        columns: ["id", "name", "description", "quantity", "status"],
        rows: Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          name: `Result item ${i + 1}`,
          description: `Description for item ${i + 1}`,
          quantity: Math.floor(Math.random() * 100),
          status: ["active", "inactive"][Math.floor(Math.random() * 2)],
        })),
        executionTime: (Math.random() * 100).toFixed(2),
      });
      setIsQuerying(false);
    }, 800);
  };

  const addField = () => {
    setNewTable((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          name: "",
          type: "VARCHAR(255)",
          primary: false,
          autoincrement: false,
        },
      ],
    }));
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...newTable.fields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setNewTable((prev) => ({ ...prev, fields: updatedFields }));
  };

  // Handle Clean Database
  const handleCleanDatabase = () => {
    showConfirmation(
      "Clean Database",
      "Are you sure you want to clean the database?",
      () => {
        showAlert("Database cleaning started...", "info");
        setTimeout(() => {
          showAlert("Database cleaned and optimized!", "success");
        }, 3000);
      }
    );
  };

  const createTable = () => {
    // In a real app, this would call an API
    setTables((prev) => [
      ...prev,
      {
        name: newTable.name,
        count: 0,
        description: "Newly created table",
        health: "healthy",
      },
    ]);
    setShowCreateTable(false);
    setNewTable({
      name: "",
      fields: [{ name: "id", type: "INT", primary: true, autoincrement: true }],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Database Management</h2>
        <button
          onClick={() => setShowCreateTable(true)}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          <FiPlus size={18} />
          <span>Create Table</span>
        </button>
      </div>

      {/* Database Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiDatabase size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Tables</p>
              <p className="text-2xl font-semibold">{tables.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiHardDrive size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Database Size</p>
              <p className="text-2xl font-semibold">
                {healthMetrics.totalSize}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600">
              <FiAlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Issues Detected
              </p>
              <p className="text-2xl font-semibold">
                {tables.filter((t) => t.health !== "healthy").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiCheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Cache Hit Ratio
              </p>
              <p className="text-2xl font-semibold">
                {healthMetrics.cacheHitRatio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-md"
          >
            <FiDownload size={18} />
            <span>Export Data</span>
          </button>

          <button
            onClick={handleImport}
            className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 text-green-600 px-4 py-2 rounded-md"
          >
            <FiUpload size={18} />
            <span>Import Data</span>
          </button>

          <button
            onClick={handleBackup}
            className="flex items-center space-x-2 bg-purple-50 hover:bg-purple-100 text-purple-600 px-4 py-2 rounded-md"
          >
            <FiSave size={18} />
            <span>Backup Now</span>
          </button>

          <button
            onClick={handleCleanDatabase}
            className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-md"
          >
            <FiTrash2 size={18} />
            <span>Clean Database</span>
          </button>
        </div>
      </div>

      {/* Recent Updates and Database Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Updates Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium">Recent Updates</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {recentUpdates.map((update) => (
              <div key={update.id} className="p-3 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium flex items-center">
                      {update.table}
                      <span
                        className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                          update.action === "INSERT"
                            ? "bg-green-100 text-green-800"
                            : update.action === "UPDATE"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {update.action}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {update.records} record{update.records !== 1 ? "s" : ""} •{" "}
                      {update.user}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(update.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-gray-50 text-center border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All Activity
            </button>
          </div>
        </div>

        {/* Database Tables and Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Table Selection and Management */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Database Tables</h3>
              <div className="flex space-x-2">
                <select
                  value={healthFilter}
                  onChange={(e) => setHealthFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                >
                  <option value="all">All Tables</option>
                  <option value="healthy">Healthy Only</option>
                  <option value="issues">With Issues</option>
                </select>
                <div className="relative">
                  <FiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 border border-gray-300 rounded-md px-2 py-1 text-sm w-40"
                  />
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredTables.length > 0 ? (
                filteredTables.map((table) => (
                  <div
                    key={table.name}
                    onClick={() => setSelectedTable(table.name)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center ${
                      selectedTable === table.name ? "bg-blue-50" : ""
                    } ${
                      table.health === "warning"
                        ? "border-l-4 border-amber-500"
                        : table.health === "critical"
                        ? "border-l-4 border-red-500"
                        : ""
                    }`}
                  >
                    <div>
                      <h4 className="font-medium flex items-center">
                        {table.name}
                        {table.health === "warning" && (
                          <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            Needs attention
                          </span>
                        )}
                        {table.health === "critical" && (
                          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                            Critical
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {table.description}
                      </p>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {table.count.toLocaleString()} records
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No tables found matching your criteria
                </div>
              )}
            </div>
          </div>

          {/* Selected Table Content */}
          {selectedTable && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium">Table: {selectedTable}</h3>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm rounded-md">
                    <FiPlus size={14} />
                    <span>Add Record</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm rounded-md">
                    <FiEye size={14} />
                    <span>Structure</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {tableData.length > 0 &&
                        Object.keys(tableData[0]).map((key) => (
                          <th
                            key={key}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {key}
                          </th>
                        ))}
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isQuerying ? (
                      <tr>
                        <td
                          colSpan={
                            tableData.length > 0
                              ? Object.keys(tableData[0]).length + 1
                              : 1
                          }
                          className="px-6 py-4 text-center"
                        >
                          Loading table data...
                        </td>
                      </tr>
                    ) : (
                      tableData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          {Object.entries(row).map(([key, value]) => (
                            <td
                              key={key}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {typeof value === "string" && value.length > 20
                                ? `${value.substring(0, 20)}...`
                                : String(value)}
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <FiEdit size={16} className="inline" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <FiTrash2 size={16} className="inline" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SQL Query Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-4">SQL Query Interface</h3>
        <div className="space-y-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 font-mono h-32 text-sm"
            placeholder="Enter SQL query (e.g. SELECT * FROM inventory)"
          />
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <button
                onClick={executeQuery}
                disabled={isQuerying}
                className={`flex items-center space-x-1 px-4 py-2 rounded-md ${
                  isQuerying
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {isQuerying ? (
                  <>
                    <FiPhone className="animate-pulse" size={16} />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <FiCheckCircle size={16} />
                    <span>Execute</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setQuery("SELECT * FROM inventory LIMIT 10")}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Reset
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {query.split(/\s+/).length} words, {query.length} characters
            </div>
          </div>
        </div>

        {queryResult && (
          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h4 className="text-sm font-medium">Query Results</h4>
              <div className="text-xs text-gray-500">
                {queryResult.rows.length} row
                {queryResult.rows.length !== 1 ? "s" : ""} • Executed in{" "}
                {queryResult.executionTime}ms
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {queryResult.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {queryResult.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {queryResult.columns.map((column) => (
                        <td
                          key={`${rowIndex}-${column}`}
                          className="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                        >
                          {row[column]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create Table Modal */}
      {showCreateTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Create New Table</h3>
              <button
                onClick={() => setShowCreateTable(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Table Name
                </label>
                <input
                  type="text"
                  value={newTable.name}
                  onChange={(e) =>
                    setNewTable((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. products, customers"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Fields
                  </label>
                  <button
                    onClick={addField}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Field
                  </button>
                </div>
                <div className="space-y-2">
                  {newTable.fields.map((field, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-2 items-center"
                    >
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={field.name}
                          onChange={(e) =>
                            handleFieldChange(index, "name", e.target.value)
                          }
                          className="block w-full border border-gray-300 rounded-md p-2 text-sm"
                          placeholder="Field name"
                        />
                      </div>
                      <div className="col-span-3">
                        <select
                          value={field.type}
                          onChange={(e) =>
                            handleFieldChange(index, "type", e.target.value)
                          }
                          className="block w-full border border-gray-300 rounded-md p-2 text-sm"
                        >
                          <option value="INT">INT</option>
                          <option value="VARCHAR(255)">VARCHAR(255)</option>
                          <option value="TEXT">TEXT</option>
                          <option value="DATE">DATE</option>
                          <option value="DATETIME">DATETIME</option>
                          <option value="BOOLEAN">BOOLEAN</option>
                          <option value="FLOAT">FLOAT</option>
                          <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                        </select>
                      </div>
                      <div className="col-span-2 flex items-center space-x-1">
                        <input
                          type="checkbox"
                          id={`primary-${index}`}
                          checked={field.primary}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "primary",
                              e.target.checked
                            )
                          }
                          className="rounded"
                        />
                        <label htmlFor={`primary-${index}`} className="text-sm">
                          PK
                        </label>
                      </div>
                      <div className="col-span-2 flex items-center space-x-1">
                        <input
                          type="checkbox"
                          id={`ai-${index}`}
                          checked={field.autoincrement}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "autoincrement",
                              e.target.checked
                            )
                          }
                          className="rounded"
                          disabled={!field.primary}
                        />
                        <label htmlFor={`ai-${index}`} className="text-sm">
                          AI
                        </label>
                      </div>
                      <div className="col-span-1">
                        {index > 0 && (
                          <button
                            onClick={() => {
                              const updatedFields = [...newTable.fields];
                              updatedFields.splice(index, 1);
                              setNewTable((prev) => ({
                                ...prev,
                                fields: updatedFields,
                              }));
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateTable(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={createTable}
                disabled={
                  !newTable.name || newTable.fields.some((f) => !f.name)
                }
                className={`px-4 py-2 rounded-md ${
                  !newTable.name || newTable.fields.some((f) => !f.name)
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                } text-white`}
              >
                Create Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">{dialogConfig.title}</h3>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-700">{dialogConfig.message}</p>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={dialogConfig.onCancel}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={dialogConfig.onConfirm}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Database;
