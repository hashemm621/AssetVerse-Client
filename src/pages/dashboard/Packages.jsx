import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";
import toast from "react-hot-toast";

const Packages = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const queryClient = useQueryClient();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const handleUpgrade = async (pkg) => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        packageName: pkg.name,
        price: pkg.price,
        employeeLimit: pkg.employeeLimit,
      });

      window.location.href = res.data.url;
    } catch (err) {
      toast.error("Payment initiation failed");
    }
  };

  const handleSwitchToFree = async () => {
    try {
      await axiosSecure.post("/downgrade-to-free");
      toast.success("Switched to Free Package!");
      queryClient.invalidateQueries(["userInfo"]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to switch to Free package");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading packages...</p>;

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Upgrade Package</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isBasic = pkg.name === "Basic";
          const isActive =
            userInfo?.package?.name === pkg.name ||
            (isBasic && !userInfo?.package?.name);

          const badgeColor =
            pkg.name === "Basic"
              ? "bg-gray-300"
              : pkg.name === "Standard"
              ? "bg-yellow-400"
              : "bg-purple-500";

          return (
            <motion.div
              key={pkg._id}
              whileHover={{ scale: 1.03 }}
              className={`border rounded-xl p-6 shadow flex flex-col relative ${
                isActive ? "border-2 border-blue-500 bg-blue-50" : "bg-white"
              }`}
            >
              <div
                className={`absolute top-3 right-3 text-white px-2 py-1 rounded text-sm ${badgeColor}`}
              >
                {pkg.name}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {pkg.name}
                {isActive && (
                  <span className="text-sm font-bold text-blue-600 ml-2">Active</span>
                )}
              </h3>

              <p className="text-3xl font-bold mb-4">
                {isBasic ? "Free" : `$${pkg.price}/Month`}
              </p>

              <p className="mb-3">Employee Limit: {pkg.employeeLimit}</p>

              <ul className="text-sm text-gray-600 mb-6 space-y-1">
                {pkg.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>

              {!isActive && !isBasic && (
                <button
                  onClick={() => handleUpgrade(pkg)}
                  className="mt-auto btn btn-primary w-full"
                >
                  Upgrade Now
                </button>
              )}

              {!isActive && isBasic && (
                <button
                  onClick={handleSwitchToFree}
                  className="mt-auto btn btn-primary w-full"
                >
                  Switch to Free
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Packages;
