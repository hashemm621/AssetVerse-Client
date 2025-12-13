import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";
import LoadingPage from "../LoadingPage/LoadingPage";
import Swal from "sweetalert2";

const MyAssets = () => {
  const { userInfo, isLoading: userLoading } = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();



  const { data: assets = {}, isLoading } = useQuery({
    queryKey: ["hrAssets", userInfo?.email, page],
    enabled: !!userInfo?.email,
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?hrEmail=${userInfo.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

    // delete hooks
    const deleteMutation = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.delete(`/assets/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Asset has been deleted.", "success");
      queryClient.invalidateQueries(["hrAssets"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete asset.", "error");
    },
  });

  if (isLoading || userLoading) {
    return <LoadingPage />;
  }

  const totalPages = assets.totalPages || 1;

  const handleAssign = asset => {
    toast("Open assign asset modal 🔥", asset.productName);
  };

  // handle update Assets
  const handleUpdate = asset => {
    console.log(asset);
  };


  // handle Delete
  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center text-(--color-primary)">
        HR Asset List
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-(--color-secondary) text-white">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Available</th>
              <th>Date</th>
              <th className="flex justify-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assets.items?.map(asset => (
              <motion.tr
                key={asset._id}
                whileHover={{ scale: 1.02 }}>
                <td>
                  <img
                    src={asset.productImage}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                </td>
                <td className="font-semibold">{asset.productName}</td>
                <td>{asset.productType}</td>
                <td>{`${asset.availableQuantity}/${asset.productQuantity}`}</td>
                <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
                <td className="flex flex-wrap gap-2">
                  <button
                    className="btn btn-sm btn-primary gap-2"
                    onClick={() => handleAssign(asset)}
                    disabled={asset.availableQuantity < 1}>
                    <FaPlus /> Assign
                  </button>

                  <button
                    className="btn btn-sm btn-accent gap-2"
                    onClick={() => handleUpdate(asset)}>
                    <FaEdit /> Update
                  </button>

                  <button
                    className="btn btn-sm btn-error gap-2"
                    disabled={deleteMutation.isPending}
                    onClick={() => handleDelete(asset._id)}>
                     {deleteMutation.isPending ? "Deleting..." : <span className="flex justify-center items-center gap-1"><FaTrashAlt /> Delete</span>}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="block md:hidden space-y-4">
        {assets.items?.map(asset => (
          <motion.div
            key={asset._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow p-4">
            <div className="flex gap-4">
              <img
                src={asset.productImage}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{asset.productName}</h3>
                <p className="text-sm text-gray-600 font-semibold">
                  Type: {asset.productType}
                </p>
                <p className="text-sm">
                  Available:{" "}
                  {`${asset.availableQuantity}/${asset.productQuantity}`}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(asset.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button
                className="btn btn-sm btn-primary gap-2"
                onClick={() => handleAssign(asset)}
                disabled={asset.availableQuantity < 1}>
                <FaPlus /> Assign
              </button>

              <button
                className="btn btn-sm btn-accent gap-2"
                onClick={() => handleUpdate(asset)}>
                <FaEdit /> Update
              </button>

              <button
                className="btn btn-sm btn-error gap-2"
                 disabled={deleteMutation.isPending}
                onClick={() => handleDelete(asset._id)}>
                {deleteMutation.isPending ? "Deleting..." : <span className="flex justify-center items-center gap-1"><FaTrashAlt/> Delete</span> }
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 bg-gray-50 p-4 rounded-xl">
        <button
          className="btn btn-sm btn-outline w-full sm:w-auto"
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}>
          <FaArrowLeft /> Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-sm btn-outline w-full sm:w-auto"
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}>
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default MyAssets;
