import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const limitAlertShown = useRef(false);

  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myEmployees", userInfo?.email],
    enabled: !!userInfo?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/affiliations/hr");
      return res.data;
    },
  });

  const handleRemove = async emp => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Remove ${emp.employeeName} from your company?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/affiliations/remove/${emp.employeeEmail}`);

      toast.success("Employee removed successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to remove employee", error);
    }
  };

  useEffect(() => {
    if (
      employees.length >= userInfo?.package?.employeesLimit &&
      !limitAlertShown.current
    ) {
      limitAlertShown.current = true;

      Swal.fire({
        title: "Employee limit reached!",
        text: "You have reached your current package limit. Upgrade to add more employees.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Upgrade Package",
        cancelButtonText: "OK",
        confirmButtonColor: "#2563eb",
      }).then(result => {
        if (result.isConfirmed) {
          window.location.href = "/dashboard/packages";
        }
      });
    }
  }, [employees, userInfo]);

  if (isLoading) {
    return <p className="text-center mt-10">Loading employees...</p>;
  }

  return (
    <div className="px-4 py-6 md:px-8 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary)">
          My Employees
        </h2>

        <div className="badge badge-lg badge-primary gap-2">
          <FaUsers />
          {employees.length} / {userInfo?.package?.employeesLimit} Employees
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {employees.map(emp => (
          <motion.div
            key={emp._id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center">
            {/* Avatar (no company logo) */}
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary">
              <img
                className="w-19 h-19 rounded-full"
                src={emp.photo}
                alt="employee image"
              />
            </div>

            {/* Info */}
            <h3 className="mt-3 font-semibold text-lg">{emp.employeeName}</h3>

            <p className="text-sm text-gray-500 break-all">
              {emp.employeeEmail}
            </p>

            <div className="w-full border-t my-3"></div>

            <p className="text-sm">
              <span className="font-medium">Company:</span> {emp.companyName}
            </p>

            <p className="text-sm">
              <span className="font-medium">Joined:</span>{" "}
              {new Date(emp.affiliationDate).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <span className="font-medium">Assets Count:</span>{" "}
              {emp.assetsCount}
            </p>

            <span
              className={`mt-2 badge ${
                emp.status === "active" ? "badge-success" : "badge-ghost"
              }`}>
              {emp.status}
            </span>

            {/* Action */}
            <button
              onClick={() => handleRemove(emp)}
              className="btn btn-sm btn-error text-white mt-4 w-full">
              <FaTrashAlt className="mr-2" />
              Remove
            </button>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {employees.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No employees affiliated yet.
        </p>
      )}
    </div>
  );
};

export default MyEmployeeList;
