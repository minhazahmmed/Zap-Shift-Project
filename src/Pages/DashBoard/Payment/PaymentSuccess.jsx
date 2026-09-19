// PaymentSuccess.jsx
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useRef, useState } from "react";

const PaymentSuccess = () => {
  const [searchparams] = useSearchParams();
  const sessionId = searchparams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState(null);
  const hasCalledRef = useRef(false); // 👈 duplicate call ঠেকানোর guard

  useEffect(() => {
    if (sessionId && !hasCalledRef.current) {
      hasCalledRef.current = true; // 👈 প্রথমবার call করার সাথে সাথেই lock করে দিচ্ছি
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`).then((res) => {
        console.log(res.data);
        if (res.data?.transactionId) {
          setTransactionId(res.data.transactionId);
        }
      });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 text-center shadow-sm">
        {/* Success icon */}
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-success/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="size-8 text-success"
          >
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-base-content">
          Payment successful
        </h2>
        <p className="mb-2 text-sm text-base-content/70">
          Your payment has been completed successfully.
        </p>

        {transactionId && (
          <p className="mb-6 text-xs text-base-content/50 break-all">
            Transaction ID: {transactionId}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <Link to="/dashboard" className="btn btn-success w-full">
            Go to dashboard
          </Link>
          <Link to="/" className="btn btn-ghost w-full">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;