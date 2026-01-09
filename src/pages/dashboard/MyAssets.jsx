import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";
import LoadingPage from "../LoadingPage/LoadingPage";
import Swal from "sweetalert2";

const MyAssets = () => {
  const { userInfo, isLoading: userLoading } = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal States
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignAsset, setAssignAsset] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Queries ---
  const { data: assets = {}, isLoading } = useQuery({
    queryKey: ["hrAssets", userInfo?.email, page],
    enabled: !!userInfo?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?hrEmail=${userInfo.email}&page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["affiliatedEmployees"],
    enabled: !!userInfo?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/affiliations/hr");
      return res.data;
    },
  });

  // --- Mutations ---

  // Assign Asset Mutation
  const assignMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(`/assets/assign/${assignAsset._id}`, {
        employeeEmail: selectedEmployee.email,
        employeeName: selectedEmployee.name,
      });
    },
    onSuccess: () => {
      toast.success("Asset assigned successfully");
      queryClient.invalidateQueries(["hrAssets"]);
      setAssignModalOpen(false);
      setSelectedEmployee(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Assign failed"),
  });

  // Update Asset Mutation (Fixed Logic)
  const updateMutation = useMutation({
    mutationFn: async ({ id, updateData }) => {
      const res = await axiosSecure.patch(`/assets/${id}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Asset updated successfully.", "success");
      queryClient.invalidateQueries(["hrAssets"]);
      setIsModalOpen(false);
    },
    onError: (err) => {
      console.error(err);
      Swal.fire("Error!", "Failed to update asset.", "error");
    },
  });

  // Delete Asset Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/assets/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Asset has been removed.", "success");
      queryClient.invalidateQueries(["hrAssets"]);
    },
  });

  if (isLoading || userLoading) return <LoadingPage />;
  const totalPages = assets.totalPages || 1;

  // --- Handlers ---
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const { _id, productName, productType, productQuantity, availableQuantity } = selectedAsset;
    
    updateMutation.mutate({
      id: _id,
      updateData: {
        productName,
        productType,
        productQuantity: Number(productQuantity),
        availableQuantity: Number(availableQuantity),
      },
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-2xl md:text-4xl font-black mb-8 text-center text-slate-800 uppercase tracking-wide">
          HR Asset Management
        </h2>

        {/* --- DESKTOP TABLE (FULL WIDTH) --- */}
        <div className="hidden lg:block w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <table className="table w-full">
            <thead className="bg-slate-900 text-white">
              <tr className="text-sm uppercase font-bold">
                <th className="py-5 pl-8">Image</th>
                <th>Asset Name</th>
                <th>Type</th>
                <th>Stock (Available/Total)</th>
                <th>Created Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {assets.items?.map((asset) => (
                <tr key={asset._id} className="hover:bg-slate-50 transition-colors">
                  <td className="pl-8 py-4">
                    <img src={asset.productImage} className="w-14 h-14 rounded-xl object-cover shadow-sm" alt="" />
                  </td>
                  <td className="text-slate-800 font-bold">{asset.productName}</td>
                  <td>
                    <span className={`badge badge-md font-bold ${asset.productType === 'returnable' ? 'badge-primary' : 'badge-ghost border-slate-300'}`}>
                      {asset.productType}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-black text-slate-500">{asset.availableQuantity} of {asset.productQuantity}</span>
                      <progress className="progress progress-primary w-32 h-2" value={asset.availableQuantity} max={asset.productQuantity}></progress>
                    </div>
                  </td>
                  <td className="text-slate-500 text-sm">{new Date(asset.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => { setAssignAsset(asset); setAssignModalOpen(true); }} disabled={asset.availableQuantity < 1} className="btn btn-sm btn-primary">Assign</button>
                      <button onClick={() => { setSelectedAsset({ ...asset }); setIsModalOpen(true); }} className="btn btn-sm btn-square btn-outline btn-info"><FaEdit /></button>
                      <button onClick={() => {
                        Swal.fire({ title: 'Delete Asset?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33' }).then(r => r.isConfirmed && deleteMutation.mutate(asset._id))
                      }} className="btn btn-sm btn-square btn-outline btn-error"><FaTrashAlt /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="lg:hidden flex flex-col gap-4">
          {assets.items?.map((asset) => (
            <div key={asset._id} className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
              <div className="flex gap-4 mb-4">
                <img src={asset.productImage} className="w-20 h-20 rounded-xl object-cover" alt="" />
                <div className="flex-1">
                  <h3 className="font-black text-slate-800">{asset.productName}</h3>
                  <p className="text-xs font-bold text-blue-600 uppercase">{asset.productType}</p>
                  <p className="text-sm mt-1 font-bold">Available: {asset.availableQuantity}/{asset.productQuantity}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => { setAssignAsset(asset); setAssignModalOpen(true); }} className="btn btn-sm btn-primary">Assign</button>
                <button onClick={() => { setSelectedAsset({ ...asset }); setIsModalOpen(true); }} className="btn btn-sm btn-info btn-outline"><FaEdit /></button>
                <button 
  onClick={() => {
    Swal.fire({ 
      title: 'Delete Asset?', 
      text: "You won't be able to revert this!", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(asset._id);
      }
    })
  }} 
  className="btn btn-sm btn-error btn-outline"
>
  <FaTrashAlt />
</button>
              </div>
            </div>
          ))}
        </div>

        {/* --- PAGINATION --- */}
        <div className="mt-8 flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn btn-sm btn-ghost"><FaArrowLeft /> Prev</button>
          <span className="font-black text-slate-700">Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn btn-sm btn-ghost">Next <FaArrowRight /></button>
        </div>
      </div>

      {/* --- UPDATE MODAL --- */}
      <AnimatePresence>
        {isModalOpen && selectedAsset && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100 p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} 
              className="bg-white rounded-3xl p-6 md:p-10 w-full max-w-lg shadow-2xl relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition-colors"><FaTimes size={20} /></button>
              <h3 className="text-2xl font-black text-slate-800 mb-8 border-b pb-4">Update Asset</h3>
              
              <form onSubmit={handleUpdateSubmit} className="space-y-5">
                <div className="form-control w-full">
                  <label className="label font-bold text-slate-600">Product Name</label>
                  <input required className="input input-bordered focus:ring-2 ring-primary" value={selectedAsset.productName} onChange={e => setSelectedAsset({...selectedAsset, productName: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label font-bold text-slate-600">Type</label>
                    <select className="select select-bordered" value={selectedAsset.productType} onChange={e => setSelectedAsset({...selectedAsset, productType: e.target.value})}>
                      <option value="returnable">Returnable</option>
                      <option value="non-returnable">Non-returnable</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label font-bold text-slate-600">Total Qty</label>
                    <input type="number" required className="input input-bordered" value={selectedAsset.productQuantity} onChange={e => setSelectedAsset({...selectedAsset, productQuantity: e.target.value})} />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-slate-600">Available Qty</label>
                  <input type="number" required className="input input-bordered" value={selectedAsset.availableQuantity} onChange={e => setSelectedAsset({...selectedAsset, availableQuantity: e.target.value})} />
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4 h-12 text-lg shadow-lg shadow-blue-200" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? <span className="loading loading-spinner"></span> : "Update Now"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ASSIGN MODAL --- */}
      <AnimatePresence>
        {assignModalOpen && assignAsset && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100 p-4">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} 
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-black text-slate-800 mb-2 uppercase">Assign This Asset</h3>
              <p className="text-slate-500 mb-8">Selected: <span className="font-bold text-blue-600">{assignAsset.productName}</span></p>
              
              <label className="label font-bold text-slate-700">Choose Employee Member</label>
              <select required className="select select-bordered w-full mb-8 h-12" 
                onChange={e => {
                  const emp = employees.find(i => i.employeeEmail === e.target.value);
                  if (emp) setSelectedEmployee({ email: emp.employeeEmail, name: emp.employeeName });
                }}>
                <option value="">-- Choose from affiliated --</option>
                {employees.map(emp => (
                  <option key={emp._id} value={emp.employeeEmail}>{emp.employeeName} ({emp.employeeEmail})</option>
                ))}
              </select>

              <div className="flex gap-4">
                <button type="button" className="btn btn-ghost flex-1" onClick={() => setAssignModalOpen(false)}>Cancel</button>
                <button className="btn btn-primary flex-1 shadow-lg" disabled={!selectedEmployee || assignMutation.isPending} 
                  onClick={() => assignMutation.mutate()}>
                  {assignMutation.isPending ? "Assigning..." : "Assign Now"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyAssets;