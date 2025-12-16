import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();

  const [trackingId, setTrackingId] = useState(null);

  const packageName = searchParams.get("pkg");
  const employeeLimit = searchParams.get("limit");
  const price = searchParams.get("price");
  const trackingIdFromURL = searchParams.get("trackingId"); 

  useEffect(() => {
    if (!packageName || !employeeLimit || !price || !trackingIdFromURL) return;

    const savePayment = async () => {
      try {
        const res = await axiosSecure.post("/payments", {
          packageName,
          employeeLimit: Number(employeeLimit),
          amount: Number(price),
          trackingId: trackingIdFromURL, 
        });

        setTrackingId(res.data.trackingId);
        toast.success(
          `Package upgraded successfully! Tracking ID: ${res.data.trackingId}`
        );
      } catch (err) {
        
        console.error(err);
        toast.error("Payment save failed");
      }
    };

    savePayment();
  }, [packageName, employeeLimit, price, trackingIdFromURL, axiosSecure]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
      <p>
        Your package <strong>{packageName}</strong> is now active.
      </p>
      {trackingId && (
        <p>
          Your Transaction ID is: <strong>{trackingId}</strong>
        </p>
      )}

      <Link className="btn btn-primary mt-8" to={"/dashboard/myPackages"}>
        My Packages
      </Link>
    </div>
  );
};

export default PaymentSuccess;
