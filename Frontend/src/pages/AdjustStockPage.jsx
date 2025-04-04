

import  { useState } from 'react';
import AdjustStockModal from '../components/AdjustStockModal';
import { Search } from 'lucide-react';

const AdjustStockPage = () => {
  // Dummy data instead of API fetch
  const dummyItems = [
    {
      _id: '1',
      name: 'Paracetamol 500mg',
      quantity: 120,
      lowStockThreshold: 50,
      price: 5.99
    },
    {
      _id: '2',
      name: 'Ibuprofen 200mg',
      quantity: 85,
      lowStockThreshold: 30,
      price: 7.49
    },
    {
      _id: '3',
      name: 'Bandages (Pack of 10)',
      quantity: 42,
      lowStockThreshold: 20,
      price: 12.99
    },
    {
      _id: '4',
      name: 'Antiseptic Wipes',
      quantity: 15,
      lowStockThreshold: 25,
      price: 8.99
    },
    {
      _id: '5',
      name: 'Thermometer Digital',
      quantity: 28,
      lowStockThreshold: 10,
      price: 24.99
    }
  ];

  const [items, setItems] = useState(dummyItems);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockUpdate = (updatedItem) => {
    setItems(items.map(item => 
      item._id === updatedItem._id ? updatedItem : item
    ));
    setSelectedItem(null);
    // You might want to add a toast notification here
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Adjust Stock Levels</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search items..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.quantity <= item.lowStockThreshold ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Adjust Stock
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  {searchTerm ? 'No matching items found' : 'No items available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedItem && (
        <AdjustStockModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdate={handleStockUpdate}
        />
      )}
    </div>
  );
};

export default AdjustStockPage;