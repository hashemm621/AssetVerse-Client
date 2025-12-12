import React from 'react';
import { FaBoxOpen, FaSortAmountUp, FaImage, FaBuilding, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const AddAssets = () => {
    
    
    return (
          <div className="min-h-screen flex justify-center items-center bg-(--color-secondary) p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-(--color-primary)">
          Add New Asset
        </h2>

        <form className="space-y-6">
          {/* Product Name */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaBoxOpen className="text-(--color-accent) mr-3 text-xl" />
            <input
              type="text"
              placeholder="Product Name"
              className="input input-ghost w-full focus:outline-none"
            />
          </div>

          {/* Product Type */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaSortAmountUp className="text-(--color-accent) mr-3 text-xl" />
            <select className="select select-ghost w-full focus:outline-none">
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>

          {/* Product Quantity */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaSortAmountUp className="text-(--color-accent) mr-3 text-xl" />
            <input
              type="number"
              min="1"
              placeholder="Product Quantity"
              className="input input-ghost w-full focus:outline-none"
            />
          </div>




          {/* Product Image */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaImage className="text-(--color-accent) mr-3 text-xl" />
            <input
              type="file"
              className="file-input file-input-ghost w-full"
            />
          </div>


          {/* Submit Button */}
          <div className="text-center mt-4">
            <button className="btn btn-primary w-full text-white text-lg font-semibold">
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
    );
};

export default AddAssets;