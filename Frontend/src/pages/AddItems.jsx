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
    <div>
      <div className="bg-white h-[80vh] rounded-lg shadow-lg">
        <div className="flex items-center justify-between bg-teal-800 text-white p-4 rounded-t-lg">
          <div className="flex gap-6 items-center">
            <h2 className="text-2xl font-semibold">Add Item</h2>
            <div className="flex items-center space-x-4 bg-teal-800 text-white">
              <span>Product</span>
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
              <span>Service</span>
            </div>
          </div>
          <button className="text-white" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="relative w-full">
                <label className="absolute -top-3 left-2 bg-white px-1 text-teal-700 font-medium">
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
                <label className="absolute -top-3 left-2 bg-white px-1 text-teal-700 font-medium">
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

              <button type="button" className="bg-teal-500 text-white px-4 py-2 rounded">
                Select Units
              </button>

              <label className="flex items-center space-x-1 text-gray-700 cursor-pointer">
                <ImagePlus size={18} />
                <span>Add Image</span>
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>

            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded-md" />
              </div>
            )}

            <div className="flex items-center mt-4 space-x-4">
              <div className="flex border border-gray-600 rounded px-3 py-1 items-center">
                <span className="text-gray-700 mr-2">Item Code</span>
                <button type="button" className="bg-teal-500 text-white px-3 py-1 rounded" onClick={generateItemCode}>
                  Generate
                </button>
              </div>
              {itemCode && <span className="text-teal-700 font-medium">{itemCode}</span>}
            </div>

            <div className="w-full p-4">
              <div className="flex items-center border-b border-gray-400 pb-1">
                <h2 className="text-lg font-semibold text-gray-700">Stock</h2>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="w-48 text-gray-600 font-medium">Opening Quantity</label>
                    <input
                      type="number"
                      value={openingQty}
                      onChange={(e) => setOpeningQty(e.target.value)}
                      className="border border-gray-400 rounded-md px-3 py-2 w-40 focus:border-teal-500 outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="w-48 text-gray-600 font-medium">Min Stock To Maintain</label>
                    <input
                      type="number"
                      value={minStock}
                      onChange={(e) => setMinStock(e.target.value)}
                      className="border border-gray-400 rounded-md px-3 py-2 w-40 focus:border-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="text-gray-600 font-medium">As Of Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-400 rounded-md px-3 py-2 w-40 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <button 
      type="submit" 
      className="bg-teal-600 text-white px-6 py-2 rounded-md mt-4 flex items-center justify-center gap-2"
      disabled={loading}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saving...
        </>
         ) : (
          'Save Item'
        )}
      </button>
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