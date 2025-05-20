// src/features/inventory/inventoryAPI.js

/**
 * Fetches inventory data from the server
 * @returns {Promise<Array>} Promise that resolves to an array of inventory items
 */
export const fetchInventory = async () => {
  try {
    // Replace this URL with your actual API endpoint
    const response = await fetch("/api/inventory");

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
    throw error;
  }
};

/**
 * Adds a new item to the inventory
 * @param {Object} item - The item to add
 * @returns {Promise<Object>} Promise that resolves to the added item
 */
export const addInventoryItem = async (item) => {
  try {
    const response = await fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to add inventory item:", error);
    throw error;
  }
};

/**
 * Updates an existing inventory item
 * @param {Object} item - The item with updated values
 * @returns {Promise<Object>} Promise that resolves to the updated item
 */
export const updateInventoryItem = async (item) => {
  try {
    const response = await fetch(`/api/inventory/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update inventory item:", error);
    throw error;
  }
};
