// PaymentCancelled.jsx
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 text-center shadow-sm">
        {/* Cancelled icon */}
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-error/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="size-8 text-error"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-base-content">
          Payment cancelled
        </h2>
        <p className="mb-6 text-sm text-base-content/70">
          Your payment was not completed. No amount has been charged. You can
          try again anytime.
        </p>

        <div className="flex flex-col gap-2">
          <Link to="/dashboard/my-parcels" className="btn btn-error w-full">
            Try again
          </Link>
          <Link to="/" className="btn btn-ghost w-full">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;