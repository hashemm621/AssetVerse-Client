import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaBoxOpen,
  FaSortAmountUp,
  FaImage,
  FaBuilding,
  FaEnvelope,
  FaCalendarAlt,
  FaInfo,
} from "react-icons/fa";
import { imageUpload } from "../../../utils/imagBB";
import useUserInfo from "../../../hooks/useUserInfo";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddAssets = () => {
  const {userInfo} = useUserInfo()
  const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleAddAsset = async data => {

    const {productImage,productName,productQuantity,productReturnable,productDetails} =data
    const imageFile = productImage[0]
    

    try {
      const imageURL = await imageUpload(imageFile)

      const assetData = {
        productName,
        productImage:imageURL,
        productType: productReturnable,
        productQuantity: Number(productQuantity),
        availableQuantity: Number(productQuantity),
        hrEmail:userInfo.email,
        companyName:userInfo.companyName,
        productDetails,
        createdAt: new Date(),
        
      }

      const res = await axiosSecure.post('/assets',assetData)



      if(res.data.insertedId){
        toast.success('Asset added successfully')
        reset()
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.message)
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-(--color-secondary) p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-(--color-primary)">
          Add New Asset
        </h2>

        <form
          onSubmit={handleSubmit(handleAddAsset)}
          className="space-y-6">
          {/* Product Name */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaBoxOpen className="text-(--color-accent) mr-3 text-xl" />
            <input
              type="text"
              {...register("productName", { required: true })}
              placeholder="Product Name"
              className="input input-ghost w-full focus:outline-none"
            />
            
          </div>
          {errors.productName?.type === "required" && (
            <p className="text-red-500 text-sm -mt-6">
              Product Name is required
            </p>
          )}

          {/* Product Image */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaImage className="text-(--color-accent) mr-3 text-xl" />
            <input
              type="file"
              {...register("productImage", { required: true })}
              className="file-input file-input-ghost w-full"
            />
          </div>
          {errors.productImage?.type === "required" && (
            <p className="text-red-500 text-sm -mt-6">Product Photo is required</p>
          )}

          {/* Product Type */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaSortAmountUp className="text-(--color-accent) mr-3 text-xl" />
            <select
              {...register("productReturnable", { required: true })}
              defaultValue={""}
              className="select select-ghost w-full focus:outline-none">
              <option
                disabled
                value={""}>
                Please Select Product Condition
              </option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-returnable</option>
            </select>
          </div>
          {errors.productReturnable?.type === "required" && (
            <p className="text-red-500 text-sm -mt-6">
              Returnable select is required
            </p>
          )}

          {/* product details */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaInfo className="text-(--color-accent) mr-3 text-xl" />
            <textarea
              
              {...register("productDetails", { required: true })}
              placeholder="Product Details"
              rows={5}
              maxLength={1200}
              className="textarea input-ghost w-full focus:outline-none"
            />
            
          </div>
          {errors.productDetails?.type === "required" && (
            <p className="text-red-500 text-sm -mt-6">
              Product Details is required.
            </p>
          )}

          {/* Product Quantity */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaSortAmountUp className="text-(--color-accent) mr-3 text-xl" />
            <input
              type="number"
              {...register("productQuantity", { required: true })}
              min="1"
              placeholder="Product Quantity"
              className="input input-ghost w-full focus:outline-none"
            />
          </div>
          {errors.productQuantity?.type === "required" && (
            <p className="text-red-500 text-sm -mt-6">
              Returnable select is required
            </p>
          )}

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
