// import { useState } from 'react';
// import axios from 'axios';

// const AdjustStockModal = ({ item, onClose, onUpdate }) => {
//   const [quantityToRemove, setQuantityToRemove] = useState(1);
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       const response = await axios.patch(
//         `http://localhost:5000/api/items/${item._id}/remove`,
//         { quantityToRemove }
//       );
      
//       onUpdate(response.data);
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update stock');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Adjust Stock: {item.name}</h2>
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2">Current Stock: {item.quantity}</label>
//             <input
//               type="number"
//               min="1"
//               max={item.quantity}
//               value={quantityToRemove}
//               onChange={(e) => setQuantityToRemove(parseInt(e.target.value))}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
          
//           {error && <div className="text-red-500 mb-4">{error}</div>}
          
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//             >
//               {isSubmitting ? 'Updating...' : 'Update Stock'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default AdjustStockModal;


import { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Minus, Plus as PlusIcon, AlertTriangle } from 'lucide-react';

const AdjustStockModal = ({ item, onClose, onUpdate }) => {
  const [quantityToAdjust, setQuantityToAdjust] = useState(1);
  const [adjustmentType, setAdjustmentType] = useState('remove'); // 'add' or 'remove'
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStockLevel, setNewStockLevel] = useState(item.quantity);

  // Calculate new stock level whenever quantity or type changes
  useEffect(() => {
    if (adjustmentType === 'add') {
      setNewStockLevel(item.quantity + quantityToAdjust);
    } else {
      setNewStockLevel(item.quantity - quantityToAdjust);
    }
  }, [quantityToAdjust, adjustmentType, item.quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const endpoint = adjustmentType === 'add' ? 'add' : 'remove';
      const response = await axios.patch(
        `http://localhost:5000/api/items/${item._id}/${endpoint}`,
        { quantity: quantityToAdjust }
      );
      
      onUpdate(response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update stock');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuantityChange = (value) => {
    const numValue = parseInt(value) || 0;
    if (adjustmentType === 'remove' && numValue > item.quantity) {
      setQuantityToAdjust(item.quantity);
    } else {
      setQuantityToAdjust(numValue);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">
            Adjust Stock: <span className="text-teal-600">{item.name}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Current Stock */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Current Stock</p>
              <p className="text-2xl font-bold">{item.quantity}</p>
            </div>

            {/* New Stock Level */}
            <div className={`p-3 rounded-lg ${
              newStockLevel <= item.lowStockThreshold 
                ? 'bg-red-50' 
                : 'bg-green-50'
            }`}>
              <p className="text-sm text-gray-500">New Stock Level</p>
              <p className="text-2xl font-bold">{newStockLevel}</p>
              {newStockLevel <= item.lowStockThreshold && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertTriangle size={14} className="mr-1" />
                  Below threshold ({item.lowStockThreshold})
                </p>
              )}
            </div>
          </div>

          {/* Adjustment Type Toggle */}
          <div className="flex mb-6">
            <button
              type="button"
              onClick={() => setAdjustmentType('add')}
              className={`flex-1 py-2 px-4 rounded-l-lg border ${
                adjustmentType === 'add'
                  ? 'bg-teal-100 border-teal-500 text-teal-700'
                  : 'bg-gray-50 border-gray-300 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <PlusIcon size={16} />
                Add Stock
              </div>
            </button>
            <button
              type="button"
              onClick={() => setAdjustmentType('remove')}
              className={`flex-1 py-2 px-4 rounded-r-lg border ${
                adjustmentType === 'remove'
                  ? 'bg-red-100 border-red-500 text-red-700'
                  : 'bg-gray-50 border-gray-300 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Minus size={16} />
                Remove Stock
              </div>
            </button>
          </div>

          {/* Quantity Adjustment */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {adjustmentType === 'add' ? 'Quantity to Add' : 'Quantity to Remove'}
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(Math.max(1, quantityToAdjust - 1))}
                  className="p-2 border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100"
                  disabled={quantityToAdjust <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  max={adjustmentType === 'remove' ? item.quantity : undefined}
                  value={quantityToAdjust}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="flex-1 p-2 border-t border-b border-gray-300 text-center"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantityToAdjust + 1)}
                  className="p-2 border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"
                  disabled={adjustmentType === 'remove' && quantityToAdjust >= item.quantity}
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center">
                <AlertTriangle size={16} className="mr-2" />
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-lg text-white ${
                  adjustmentType === 'add'
                    ? 'bg-teal-600 hover:bg-teal-700'
                    : 'bg-red-600 hover:bg-red-700'
                } flex items-center justify-center min-w-24`}
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                ) : adjustmentType === 'add' ? (
                  <PlusIcon size={16} className="mr-2" />
                ) : (
                  <Minus size={16} className="mr-2" />
                )}
                {isSubmitting ? 'Processing...' : adjustmentType === 'add' ? 'Add Stock' : 'Remove Stock'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdjustStockModal;