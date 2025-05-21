const InventoryTable = ({ inventory }) => {
  return (
    <table className="w-full table-auto border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Product</th>
          <th className="p-2">Category</th>
          <th className="p-2">Stock</th>
          <th className="p-2">Price</th>
          <th className="p-2">Supplier ID</th>
        </tr>
      </thead>
      <tbody>
        {inventory.length > 0 ? (
          inventory.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.category}</td>
              <td className="p-2">{item.stock}</td>
              <td className="p-2">${item.price.toFixed(2)}</td>
              <td className="p-2">{item.supplierId || "—"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="p-4 text-center text-gray-500">
              No items
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InventoryTable;
