import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUsers, FaBirthdayCake } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";

const EmployeeMyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const [selectedCompany, setSelectedCompany] = useState("");

  // fetch team members
  const { data: team = [], isLoading } = useQuery({
    queryKey: ["myTeam", userInfo?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/affiliations/hr");
      return res.data;
    },
    enabled: !!userInfo?.email,
  });

  // unique company list, memoized
  const companies = useMemo(() => {
    return [...new Set(team.map((emp) => emp.companyName).filter(Boolean))];
  }, [team]);

  // auto select first company when companies change
  useEffect(() => {
    if (companies.length > 0) {
      setSelectedCompany((prev) => prev || companies[0]);
    }
  }, [companies]);

  // filter team by selected company
  const filteredTeam = useMemo(
    () => team.filter((emp) => emp.companyName === selectedCompany),
    [team, selectedCompany]
  );

  // birthdays this month
  const currentMonth = new Date().getMonth();
  const birthdays = useMemo(
    () =>
      filteredTeam.filter(
        (emp) =>
          emp.dateOfBirth && new Date(emp.dateOfBirth).getMonth() === currentMonth
      ),
    [filteredTeam]
  );

  if (!userInfo) return <p className="text-center mt-10">Loading user info...</p>;
  if (isLoading) return <p className="text-center mt-10">Loading team...</p>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaUsers /> My Team
      </h2>

      {/* Company Select */}
      {companies.length > 1 && (
        <select
          className="select select-bordered mb-6 max-w-xs"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      )}

      {/* Team Grid */}
      {filteredTeam.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeam.map((emp) => (
            <motion.div
              key={emp.employeeEmail}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-100 shadow-md"
            >
              <div className="card-body items-center text-center">
                <div className="avatar">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-2">
                    <img
                      src={emp.photo || "https://i.ibb.co/2kR9ZqF/user.png"}
                      alt={emp.employeeName}
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mt-2">{emp.employeeName}</h3>
                <p className="text-sm text-gray-500">{emp.employeeEmail}</p>
                <span className="badge badge-outline mt-2">
                  {emp.position || "Employee"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No employees found for this company.
        </p>
      )}

      {/* Upcoming Birthdays */}
      {birthdays.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaBirthdayCake /> Upcoming Birthdays
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {birthdays.map((emp) => (
              <div
                key={emp.employeeEmail}
                className="flex items-center gap-4 p-4 rounded-lg bg-base-200"
              >
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src={emp.photo || "https://i.ibb.co/2kR9ZqF/user.png"}
                      alt={emp.employeeName}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-medium">{emp.employeeName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(emp.dateOfBirth).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeMyTeam;
