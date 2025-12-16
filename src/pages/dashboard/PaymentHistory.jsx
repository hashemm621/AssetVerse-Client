import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentsHistory", userInfo?.email],
    enabled: !!userInfo?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/history");
      return res.data;
    },
  });

  

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="px-4 py-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>

      {payments.length === 0 && (
        <p className="text-gray-500 text-center">No payment history yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {payments.map(pay => {
          const isActivePackage =
            userInfo?.package?.name === pay.packageName &&
            userInfo?.package?.activatedAt &&
            new Date(userInfo.package.activatedAt) <= new Date(pay.paymentDate);

          return (
            <div
              key={pay._id}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col gap-2">
              <p>
                <span className="font-medium">Package:</span> {pay.packageName}{" "}
                {isActivePackage && (
                  <span className="text-green-600 font-semibold">(Active)</span>
                )}
              </p>
              <p>
                <span className="font-medium">Employee Limit:</span>{" "}
                {pay.employeeLimit}
              </p>
              <p>
                <span className="font-medium">Amount:</span> ${pay.amount}
              </p>
              <p>
                <span className="font-medium">Transaction ID:</span>{" "}
                {pay.transactionId}
              </p>
              <p>
                <span className="font-medium">Payment Date:</span>{" "}
                {new Date(pay.paymentDate).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentHistory;
