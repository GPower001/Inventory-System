import { useState, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { io } from "socket.io-client"; // Import Socket.io client
import PropTypes from 'prop-types'; 

const AddItems = ({ onClose }) => {
  const [enabled, setEnabled] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [openingQty, setOpeningQty] = useState("");
  const [minStock, setMinStock] = useState("");
  const [date, setDate] = useState("2025-02-24");
  const [itemCode, setItemCode] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [socket, setSocket] = useState(null); // Socket state

  const endpoint = "/api/items"; // API endpoint

  // Generate item code function
  const generateItemCode = () => {
    const code = `ITEM-${Math.floor(1000 + Math.random() * 9000)}`;
    setItemCode(code);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!itemName || !category) {
      alert("Please fill in required fields.");
      setLoading(false);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("itemName", itemName);
      formData.append("category", category);
      formData.append("enabled", enabled ? "Service" : "Product");
      formData.append("openingQty", openingQty);
      formData.append("minStock", minStock);
      formData.append("date", date);
      formData.append("itemCode", itemCode);
      if (image) formData.append("image", image);
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item.");
      }
  
      const data = await response.json();
      alert("Item added successfully!");
      console.log(data);
  
      // Emit real-time event after item is added
      socket.emit("new-item", {
        roomId: "inventory", // Use the correct room or category
        item: data,
      });
  
      // Reset form after successful submission
      setItemName("");
      setCategory("");
      setOpeningQty("");
      setMinStock("");
      setDate("2025-02-24");
      setItemCode("");
      setImage(null);
      setImagePreview("");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  // Set up socket connection
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_API_URL); // Connect to the backend
    setSocket(socketConnection);

    // Listen for real-time updates when an item is created
    socketConnection.on("item-created", (data) => {
      console.log("New item created:", data);
      // Handle real-time updates here (e.g., show a notification)
    });

    // Clean up socket connection on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white min-h-[80vh] rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-teal-800 text-white p-4 rounded-t-lg gap-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-semibold">Add Item</h2>
            <div className="flex items-center space-x-4 bg-teal-800 text-white">
              <span className="text-sm sm:text-base">Product</span>
              <div
                className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                  enabled ? "bg-teal-500" : ""
                }`}
                onClick={() => setEnabled(!enabled)}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="text-sm sm:text-base">Service</span>
            </div>
          </div>
          <button className="text-white absolute top-4 right-4 sm:static" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
              <div className="relative w-full">
                <label className="absolute -top-3 left-2 bg-white px-1 text-teal-700 font-medium text-sm">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full border border-gray-500 rounded-md py-2 px-3 outline-none focus:ring-0 focus:border-teal-600"
                  required
                />
              </div>

              <div className="relative w-full">
                <label className="absolute -top-3 left-2 bg-white px-1 text-teal-700 font-medium text-sm">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-500 rounded-md py-2 px-3 outline-none focus:ring-0 focus:border-teal-600"
                  required
                >
                  <option value="">Select</option>
                  <option value="Medication">Medications</option>
                  <option value="Consumables">Consumables</option>
                  <option value="Generals">Generals</option>
                </select>
              </div>

              <button type="button" className="w-full sm:w-auto bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition">
                Select Units
              </button>

              <label className="flex items-center justify-center sm:justify-start space-x-2 text-gray-700 cursor-pointer p-2 border border-dashed border-gray-400 rounded">
                <ImagePlus size={18} />
                <span className="text-sm">Add Image</span>
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>

            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded-md" />
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex w-full sm:w-auto border border-gray-600 rounded px-3 py-1 items-center">
                <span className="text-gray-700 mr-2 text-sm">Item Code</span>
                <button 
                  type="button" 
                  className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition"
                  onClick={generateItemCode}
                >
                  Generate
                </button>
              </div>
              {itemCode && <span className="text-teal-700 font-medium break-all">{itemCode}</span>}
            </div>

            <div className="w-full p-4">
              <div className="flex items-center border-b border-gray-400 pb-1">
                <h2 className="text-lg font-semibold text-gray-700">Stock</h2>
              </div>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative w-full">
                  <label className="absolute -top-3 left-2 bg-white px-1 text-teal-700 font-medium text-sm">
                    Opening Quantity
                  </label>
                  <input
                    type="number"
                    value={openingQty}
                    onChange={(e) => setOpeningQty(e.target.value)}
                    className="w-full border border-gray-500 rounded-md py-2 px-3 outline-none focus:ring-0 focus:border-teal-600"
                  />
                </div>

                <div className="relative w-full">
                  <label className="absolute -top-3 left-2 bg-white px-1 text-teal-700 font-medium text-sm">
                    Minimum Stock Level
                  </label>
                  <input
                    type="number"
                    value={minStock}
                    onChange={(e) => setMinStock(e.target.value)}
                    className="w-full border border-gray-500 rounded-md py-2 px-3 outline-none focus:ring-0 focus:border-teal-600"
                  />
                </div>

                <div className="relative w-full">
                  <label className="absolute -top-3 left-2 bg-white px-1 text-teal-700 font-medium text-sm">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-500 rounded-md py-2 px-3 outline-none focus:ring-0 focus:border-teal-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Adding..." : "Add Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


AddItems.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AddItems;