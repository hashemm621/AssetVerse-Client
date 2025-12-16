import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch all requests for HR
  const { data, isLoading, isError } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/hr");
      return res.data;
    },
  });

  const requests = data || [];

  // Approve / Reject mutation
  const updateRequestMutation = useMutation({
    mutationFn: ({ id, action }) =>
      axiosSecure.patch(`/requests/${id}`, { action }), // HR email taken from token
    onSuccess: () => {
      toast.success("Request updated!");
      queryClient.invalidateQueries(["requests"]);
      setSelectedRequest(null);
    },
    onError: (err) => {
      if (err?.response?.status === 403) {
        Swal.fire({
          icon: "warning",
          title: "Employee limit exceeded",
          text: "You have reached your package limit. Please upgrade your package first.",
        });
      } else {
        toast.error("Update failed");
      }
    },
  });

  // Handle approve with SweetAlert limit check
  const handleApprove = async (req) => {
  try {
    const hrRes = await axiosSecure.get(`/users/${req.hrEmail}`);
    const hrPackage = hrRes.data.package;

    const empRes = await axiosSecure.get("/affiliations/hr");
    const currentCount = empRes.data.length;

    if (currentCount >= hrPackage.employeesLimit) {
      const result = await Swal.fire({
        title: "Employee limit exceeded",
        text: "You have reached your employee limit. Upgrade package to add more employees?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Upgrade Package",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        setTimeout(() => {
          navigate("/dashboard/myPackages");
        }, 100);
      }
      return; 
    }

    // Approve request
    updateRequestMutation.mutate({ id: req._id, action: "approved" });
  } catch (error) {
    console.error(error);
    toast.error("Check failed");
  }
};


  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10">Failed to load requests</div>;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Requests</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[500px]">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Asset</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.requesterName}</td>
                <td>{req.assetName}</td>
                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      req.requestStatus === "pending"
                        ? "badge-warning"
                        : req.requestStatus === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>
                <td className="flex gap-2">
                  {req.requestStatus === "pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleApprove(req)}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() =>
                          updateRequestMutation.mutate({ id: req._id, action: "rejected" })
                        }
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setSelectedRequest(req)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Request Details Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md relative"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
            >
              <h3 className="text-xl font-bold mb-2">{selectedRequest.assetName}</h3>
              <p><strong>Employee:</strong> {selectedRequest.requesterName}</p>
              <p><strong>Email:</strong> {selectedRequest.requesterEmail}</p>
              <p><strong>Type:</strong> {selectedRequest.assetType}</p>
              <p><strong>Company:</strong> {selectedRequest.companyName}</p>
              <p><strong>Request Date:</strong> {new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {selectedRequest.requestStatus}</p>

              <button
                className="btn btn-error mt-4 w-full"
                onClick={() => setSelectedRequest(null)}
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

export default AllRequests;
