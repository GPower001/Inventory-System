import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axios from "axios";
import {
  Search,
  Plus,
  ChevronDown,
  Filter,
  ArrowUpRight,
  Sliders,
  Funnel,
  ArrowDown,
} from "lucide-react";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // For navigation

    // Fetch items from the backend
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`);
          setItems(response.data);
        } catch (error) {
          console.error("Error fetching inventory:", error);
          setError("Failed to load items.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchItems();
    }, []);
  
    // Navigate to add-item page
    const handleAddItem = () => {
      navigate("/dashboard/add-item");
    };



    const filteredItems = items.filter(
      (item) => item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
    

  return (
    <div>
      {/* Top Navigation */}
      <div className="bg-teal-900 p-4 rounded-tl-3xl rounded-tr-3xl flex items-center justify-between">
        <div className="flex space-x-12 text-gray-300 font-semibold text-lg">
          <span>STOCK</span>
          <span>CATEGORY</span>
          <span>ADD IMAGE</span>
        </div>

        {/* Search Input */}
        <div className="flex items-center space-x-2 ">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-300 -translate-x-6" />
        </div>
      </div>

      <div className="flex gap-2">
        {/* Left Section (Item List) */}
        <div className="py-4 w-1/2">
          {/* Add Item Button */}
          <button
             onClick={handleAddItem}
            className="flex items-center bg-teal-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-teal-600 transition"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Item
            <ChevronDown className="w-5 h-5 ml-2" />
          </button>

          {/* Table */}
          <div className="mt-4 overflow-hidden">
            <table className="w-full border-collapse border border-gray-300">
              {/* Table Header */}
              <thead>
                <tr className="bg-white text-teal-900 font-semibold flex justify-between px-4 py-2">
                  <th className="px-4 py-2 flex items-center">Item</th>
                  <Filter className="ml-2 w-4 h-4" />
                  <th className="px-4 py-2">Quantity</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className={`cursor-pointer ${
                        selectedItem?.id === item.id
                          ? "bg-teal-700 text-white"
                          : "bg-gray-100 text-black"
                      } hover:bg-teal-500 transition`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <td className="px-4 py-3">{item.itemName}</td>
                      <td className="px-4 py-3">{item.openingQty}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-4">
                      No matching items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section (Item Details) */}
        <div className="flex flex-col gap-8 w-1/2 px-8 border-l h-[90vh]">
          {selectedItem ? (
            <>
              {/* Selected Item Info */}
              <div className="bg-gray-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center w-full">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">
                      {selectedItem.name}
                    </span>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">
                      SALE PRICE: <span className="text-gray-300">₦{selectedItem.salePrice}</span>
                    </p>
                    <p className="text-sm">
                      PURCHASE PRICE: <span className="text-gray-300">₦{selectedItem.purchasePrice}</span>
                    </p>
                  </div>
                </div>

                <button className="flex items-center bg-teal-500 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-teal-600 transition">
                  <Sliders className="w-5 h-5 mr-2" />
                  ADJUST ITEM
                </button>
              </div>

              {/* Transaction History */}
              <div className="bg-gray-600 text-white p-6 rounded-xl shadow-lg w-full">
                <div className="grid grid-cols-6 items-center border-b border-white pb-2 text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    TYPE <Funnel className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    INVOICE <Funnel className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    NAME <Funnel className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    DATE <ArrowDown className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    QUANTITY <Funnel className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    STATUS <Funnel className="w-4 h-4" />
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center pt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-900 rounded-full"></span>
                    ADD IMAGE
                  </div>
                  <div></div>
                  <div></div>
                  <div>22/02/2025</div>
                  <div>{selectedItem.quantity}QT</div>
                  <div>SUCCESSFUL</div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Select an item to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
