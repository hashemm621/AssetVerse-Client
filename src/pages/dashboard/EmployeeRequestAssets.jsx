import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";

const EmployeeRequestAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

  // fetch available assets
  const { data, isLoading } = useQuery({
    queryKey: ["availableAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assigned-assets");
      return res.data;
    },
  });

  const assets =
    data?.items?.filter((asset) => asset.availableQuantity > 0) || [];

  const handleRequest = async () => {
    if (!selectedAsset) return;

    try {
      await axiosSecure.post("/requests", {
        assetId: selectedAsset._id,
        assetName: selectedAsset.productName,
        assetType: selectedAsset.productType,
        requesterName: userInfo?.name,
        requesterEmail: userInfo?.email,
        hrEmail: selectedAsset.hrEmail,
        companyName: selectedAsset.companyName,
        note,
      });

      toast.success("Asset request submitted");
      setSelectedAsset(null);
      setNote("");
      document.getElementById("requestModal").close();
    } catch {
      toast.error("Request failed");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading assets...</p>;
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaBoxOpen /> Request an Asset
      </h2>

      {assets.length === 0 ? (
        <p className="text-center text-gray-500">No assets available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <motion.div
              key={asset._id}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-100 shadow-md"
            >
              <figure className="h-40 bg-gray-100">
                <img
                  src={asset.productImage}
                  alt={asset.productName}
                  className="object-contain h-full"
                />
              </figure>

              <div className="card-body">
                <h3 className="font-semibold text-lg">
                  {asset.productName}
                </h3>

                <p className="text-sm">
                  Type:{" "}
                  <span className="badge badge-outline">
                    {asset.productType}
                  </span>
                </p>

                <p className="text-sm">
                  Available:{" "}
                  <span className="font-bold">
                    {asset.availableQuantity}
                  </span>
                </p>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setSelectedAsset(asset);
                      document
                        .getElementById("requestModal")
                        .showModal();
                    }}
                  >
                    Request
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* REQUEST MODAL */}
      <dialog id="requestModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">
            Request {selectedAsset?.productName}
          </h3>

          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                document.getElementById("requestModal").close()
              }
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleRequest}>
              Submit Request
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EmployeeRequestAssets;
