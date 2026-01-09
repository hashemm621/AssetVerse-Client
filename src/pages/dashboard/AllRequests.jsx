import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCheck, FaTimes, FaEye, FaUser, FaBoxOpen, FaCalendarAlt, FaHistory, FaSearch, FaInbox } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- ডাটা ফেচিং ---
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/hr");
      return res.data;
    },
  });

  const requests = data || [];

  // সার্চ ফিল্টারিং লজিক
  const filteredRequests = requests.filter(req => 
    req.requesterName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.assetName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- আপডেট মিউটেশন ---
  const updateRequestMutation = useMutation({
    mutationFn: ({ id, action }) => axiosSecure.patch(`/requests/${id}`, { action }),
    onSuccess: () => {
      toast.success("Status Updated!");
      // ১. ইনভ্যালিড করা
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      // ২. সরাসরি রি-ফেচ ট্রিগার করা (UI রিফ্রেশের জন্য)
      refetch(); 
      setSelectedRequest(null);
    },
    onError: (err) => {
      if (err?.response?.status === 403) {
        Swal.fire({ icon: "warning", title: "Limit Exceeded", text: "Upgrade package to manage more employees.", confirmButtonColor: "#3b82f6" });
      } else {
        toast.error("Failed to update status");
      }
    },
  });

  const handleApprove = async (req) => {
    try {
      const hrRes = await axiosSecure.get(`/users/${req.hrEmail}`);
      const hrPackage = hrRes.data.package;
      const empRes = await axiosSecure.get("/affiliations/hr");
      const currentCount = empRes.data.length;

      if (currentCount >= hrPackage.employeesLimit) {
        const result = await Swal.fire({
          title: "Limit Reached",
          text: "Upgrade now to add more employees?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3b82f6",
          confirmButtonText: "Upgrade",
        });
        if (result.isConfirmed) navigate("/dashboard/myPackages");
        return;
      }
      updateRequestMutation.mutate({ id: req._id, action: "approved" });
    } catch (error) {
      toast.error("Validation failed");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <span className="loading loading-bars loading-lg text-primary"></span>
    </div>
  );

  return (
    // overflow-x-hidden যুক্ত করা হয়েছে যাতে মোবাইল স্লাইড না হয়
    <div className="w-full max-w-[100vw] overflow-x-hidden px-2 sm:px-4 lg:px-10 py-6 bg-[#F8FAFC] min-h-screen">
      
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 px-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Team <span className="text-primary underline decoration-sky-300 decoration-4">Requests</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Review and manage asset distributions</p>
        </div>
        
        <div className="relative w-full lg:w-80">
          <input 
            type="text" 
            placeholder="Search employee or asset..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full rounded-2xl bg-white border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 pl-10 h-12" 
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block w-full bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="table w-full border-separate border-spacing-0">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="py-5 pl-8 text-slate-400 font-bold uppercase text-[11px] tracking-widest">Employee</th>
              <th className="text-slate-400 font-bold uppercase text-[11px] tracking-widest">Asset</th>
              <th className="text-slate-400 font-bold uppercase text-[11px] tracking-widest text-center">Status</th>
              <th className="text-slate-400 font-bold uppercase text-[11px] tracking-widest text-right pr-8">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredRequests.map((req) => (
              <tr key={req._id} className="hover:bg-slate-50/30 transition-all">
                <td className="py-4 pl-8">
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-blue-100 text-blue-600 rounded-xl w-10 h-10 font-bold uppercase">
                        {req.requesterName?.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{req.requesterName}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">{req.requesterEmail}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="font-bold text-slate-800 text-sm">{req.assetName}</p>
                  <p className="text-[10px] text-primary font-bold">{req.assetType}</p>
                </td>
                <td className="text-center">
                  <span className={`badge badge-sm font-black py-3 px-4 rounded-lg border-none ${
                    req.requestStatus === "pending" ? "bg-orange-100 text-orange-600" :
                    req.requestStatus === "approved" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}>
                    {req.requestStatus}
                  </span>
                </td>
                <td className="pr-8">
                  <div className="flex justify-end gap-2">
                    {req.requestStatus === "pending" && (
                      <>
                        <button onClick={() => handleApprove(req)} className="btn btn-sm btn-success text-white shadow-sm rounded-lg"><FaCheck /></button>
                        <button onClick={() => updateRequestMutation.mutate({ id: req._id, action: "rejected" })} className="btn btn-sm btn-error text-white shadow-sm rounded-lg"><FaTimes /></button>
                      </>
                    )}
                    <button onClick={() => setSelectedRequest(req)} className="btn btn-sm btn-info text-white shadow-sm rounded-lg"><FaEye /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout - গ্রিড ভিউ এবং রেসপন্সিভনেস নিশ্চিত করা হয়েছে */}
      <div className="lg:hidden grid grid-cols-1 gap-4 w-full">
        {filteredRequests.map((req) => (
          <div 
            key={req._id} 
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4 mx-1"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 uppercase">
                  {req.requesterName?.charAt(0)}
                </div>
                <div className="max-w-[150px]">
                  <h4 className="font-bold text-slate-800 text-sm truncate">{req.requesterName}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{req.requesterEmail}</p>
                </div>
              </div>
              <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                req.requestStatus === "pending" ? "bg-orange-50 text-orange-500" :
                req.requestStatus === "approved" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"
              }`}>
                {req.requestStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50/50 p-3 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Asset</span>
                <span className="text-xs font-bold text-slate-700 truncate">{req.assetName}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Date</span>
                <span className="text-xs font-bold text-slate-700">{new Date(req.requestDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2 w-full">
              {req.requestStatus === "pending" && (
                <>
                  <button onClick={() => handleApprove(req)} className="btn btn-success btn-sm flex-1 text-white rounded-xl h-10">Approve</button>
                  <button onClick={() => updateRequestMutation.mutate({ id: req._id, action: "rejected" })} className="btn btn-error btn-sm flex-1 text-white rounded-xl h-10">Reject</button>
                </>
              )}
              <button onClick={() => setSelectedRequest(req)} className="btn btn-info btn-sm h-10 px-4 text-white rounded-xl shadow-md">
                <FaEye />
              </button>
            </div>
          </div>
        ))}
        {filteredRequests.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
             <FaInbox className="mx-auto text-4xl text-slate-200 mb-2" />
             <p className="text-slate-400 text-sm font-bold">No requests found</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2rem] p-6 sm:p-10 w-full max-w-lg shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-800">Request Information</h3>
                <button onClick={() => setSelectedRequest(null)} className="btn btn-ghost btn-sm btn-circle text-slate-400"><FaTimes /></button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <DetailItem label="Employee" value={selectedRequest.requesterName} sub={selectedRequest.requesterEmail} />
                <DetailItem label="Asset" value={selectedRequest.assetName} sub={selectedRequest.assetType} />
                <DetailItem label="Date" value={new Date(selectedRequest.requestDate).toLocaleDateString()} />
                <DetailItem label="Current Status" value={selectedRequest.requestStatus.toUpperCase()} />
              </div>

              <button
                className="btn btn-primary w-full mt-8 rounded-xl h-12 font-black border-none"
                onClick={() => setSelectedRequest(null)}
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ছোট হেল্পার কম্পোনেন্ট
const DetailItem = ({ label, value, sub }) => (
  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{label}</p>
    <p className="font-bold text-slate-700">{value}</p>
    {sub && <p className="text-xs text-slate-400">{sub}</p>}
  </div>
);

export default AllRequests;