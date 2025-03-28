import React, { useState } from "react";
import { ImagePlus, Calendar, X } from "lucide-react";
import axios from "axios";

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


  const endpoint = "/api/items"; // Define this variable before using it


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

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
         formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Item added successfully!");
      console.log(response.data);

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



  return (
    <div>
      <div className="bg-white h-[80vh] rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between bg-teal-800 text-white p-4 rounded-t-lg">
          <div className="flex gap-6 items-center">
            <h2 className="text-2xl font-semibold">Add Item</h2>
            {/* Toggle: Product / Service */}
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

        {/* Form Fields */}
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

              {/* Image Upload */}
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

            {/* Buttons Section */}
            <div className="flex items-center mt-4 space-x-4">
              <div className="flex border border-gray-600 rounded px-3 py-1 items-center">
                <span className="text-gray-700 mr-2">Item Code</span>
                <button type="button" className="bg-teal-500 text-white px-3 py-1 rounded" onClick={generateItemCode}>
                  Generate
                </button>
              </div>
              {itemCode && <span className="text-teal-700 font-medium">{itemCode}</span>}
            </div>

            {/* Stock Section */}
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

            <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded-md mt-4">
              Save Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;



