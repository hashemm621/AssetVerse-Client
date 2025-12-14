import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaEye, FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useSearchParams } from "react-router";
import useAuth from "../../hooks/useAuth";

const AllAssets = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const searchRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const type = searchParams.get("type") || "";
  const {user} = useAuth()


  const axiosSecure = useAxiosSecure();

  // Fetch assets
  const { data, isLoading, isError } = useQuery({
    queryKey: ["assignedAssets", page, searchParams.get("search") || "", type],
    queryFn: async () => {
      const res = await axiosSecure.get("/assigned-assets", {
        params: {
          page,
          search: searchParams.get("search") || "",
          type,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const assets = data?.items || [];
  const totalPages = data?.totalPages || 1;

  // Request mutation
  const requestMutation = useMutation({
    mutationFn: (requestBody) => axiosSecure.post("/requests", requestBody),
    onSuccess: () => {
      toast.success("Request submitted!");
      setSelectedAsset(null);
    },
    onError: () => toast.error("Request failed"),
  });

  // Search submit function
  const handleSearch = () => {
    const searchValue = searchRef.current.value.trim();
    const params = {};
    if (searchValue) params.search = searchValue;
    if (type) params.type = type;
    params.page = 1; // reset page
    setSearchParams(params);
  };

  const handleTypeChange = (value) => {
    const params = {};
    const searchValue = searchRef.current.value.trim();
    if (searchValue) params.search = searchValue;
    if (value) params.type = value;
    params.page = 1;
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = {};
    const searchValue = searchRef.current.value.trim();
    if (searchValue) params.search = searchValue;
    if (type) params.type = type;
    params.page = newPage;
    setSearchParams(params);
  };

  if (isLoading)
    return <div className="text-center py-10 text-lg">Loading...</div>;
  if (isError)
    return <div className="text-center py-10 text-lg">Failed to load assets</div>;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary text-center">
        All Assets
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center items-center">
        <div className="relative w-full sm:w-64 md:w-80">
          <input
            type="text"
            placeholder="Search by Asset Name"
            ref={searchRef}
            defaultValue={searchParams.get("search") || ""}
            className="input input-bordered w-full pr-10"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 btn btn-sm btn-primary"
          >
            <FaSearch />
          </button>
        </div>

        <select
          className="select select-bordered w-full sm:w-64 md:w-80"
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Table / Mobile Cards */}
      <div className="overflow-x-auto md:hidden flex flex-col gap-4">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="border rounded-lg p-4 shadow flex flex-col gap-2"
          >
            <img
              src={asset.productImage}
              alt={asset.productName}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="font-bold text-lg">{asset.productName}</h3>
            <p>
              <strong>Type:</strong> {asset.productType}
            </p>
            <p>
              <strong>Company:</strong> {asset.companyName}
            </p>
            <p>
              <strong>Post Date:</strong>{" "}
              {new Date(asset.createdAt).toLocaleDateString()}
            </p>
            <button
              className="btn btn-info w-full mt-2"
              onClick={() => setSelectedAsset(asset)}
            >
              <FaEye /> Details
            </button>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto hidden md:block">
        <table className="table table-zebra w-full min-w-[500px] sm:min-w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Company</th>
              <th>Post Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td>
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td>{asset.productName}</td>
                <td>{asset.productType}</td>
                <td>{asset.companyName}</td>
                <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info w-full sm:w-auto"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          <FaArrowLeft />
        </button>
        <span className="btn btn-sm btn-disabled">{page}</span>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Asset Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg mx-auto relative"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-center sm:text-left">
                {selectedAsset.productName}
              </h3>
              <img
                src={selectedAsset.productImage}
                alt={selectedAsset.productName}
                className="w-full h-auto sm:h-48 object-cover mb-4 rounded"
              />
              <div className="space-y-1 text-sm sm:text-base">
                <p>
                  <strong>Product Name:</strong> {selectedAsset.productName}
                </p>
                <p>
                  <strong>Product Details:</strong> {selectedAsset.productDetails}
                </p>
                <p>
                  <strong>Company:</strong> {selectedAsset.companyName}
                </p>
                <p>
                  <strong>HR Email:</strong> {selectedAsset.hrEmail}
                </p>
                <p>
                  <strong>Type:</strong> {selectedAsset.productType}
                </p>
                <p>
                  <strong>Available Quantity:</strong>{" "}
                  {selectedAsset.availableQuantity}
                </p>
                <p>
                  <strong>Total Quantity:</strong> {selectedAsset.productQuantity}
                </p>
                <p>
                  <strong>Post Date:</strong>{" "}
                  {new Date(selectedAsset.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                className="btn btn-primary mt-4 w-full"
                onClick={() => {
                  
                  requestMutation.mutate({
                    assetId: selectedAsset._id,
                    assetName: selectedAsset.productName,
                    assetType: selectedAsset.productType,
                    requesterName:user.displayName,
                    requesterEmail:user.email,
                    hrEmail: selectedAsset.hrEmail,
                    companyName: selectedAsset.companyName,
                  });
                }}
              >
                Request
              </button>

              <button
                className="btn btn-error mt-2 w-full"
                onClick={() => setSelectedAsset(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllAssets;
