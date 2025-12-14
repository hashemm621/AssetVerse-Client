import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";

const MyEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();

  const { data:employees=[], isLoading, refetch } = useQuery({
    queryKey: ["myEmployees", userInfo?.email],
    enabled: !!userInfo?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/affiliations/hr"
      );
      return res.data;
    },
  });

  const handleRemove = async (employee) => {
    const confirm = window.confirm(
      `Remove ${employee.name} from your company?`
    );
    if (!confirm) return;

    try {
      await axiosSecure.patch(`/hr/employees/remove`, {
        employeeEmail: employee.email,
        hrEmail: userInfo.email,
      });
      toast.success("Employee removed");
      refetch();
    } catch {
      toast.error("Failed to remove employee");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading employees...</p>;
  }

  console.log(employees);
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-(--color-primary)">
          My Employee List
        </h2>
        <div className="badge badge-lg badge-primary gap-2">
          <FaUsers />
          {employees.used}/{employees.limit} Employees Used
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees?.map((emp) => (
          <motion.div
            key={emp.email}
            whileHover={{ scale: 1.03 }}
            className="card bg-white shadow-lg rounded-2xl"
          >
            <div className="card-body text-center">
              <img
                src={emp.photo || "https://i.ibb.co/7GkZr9d/user.png"}
                alt={emp.name}
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />

              <h3 className="font-semibold text-lg mt-3">{emp.name}</h3>
              <p className="text-sm text-gray-500">{emp.email}</p>

              <div className="divider my-2"></div>

              <p className="text-sm">
                <span className="font-medium">Join Date:</span>{" "}
                {new Date(emp.joinDate).toLocaleDateString()}
              </p>

              <p className="text-sm">
                <span className="font-medium">Assets Assigned:</span>{" "}
                {emp.assetsCount}
              </p>

              <div className="mt-4">
                <button
                  onClick={() => handleRemove(emp)}
                  className="btn btn-sm btn-error gap-2 text-white"
                >
                  <FaTrashAlt /> Remove
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {employees?.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No employees affiliated yet.
        </p>
      )}
    </div>
  );
};

export default MyEmployeeList;
