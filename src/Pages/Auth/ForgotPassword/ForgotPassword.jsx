import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation } from "react-router";
import { useState } from "react";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { resetPassword } = useAuth();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = (data) => {
    setMessage("");
    setErrorMsg("");

    resetPassword(data.email)
      .then(() => {
        setMessage("A password reset link has been sent to your email.");
      })
      .catch((error) => {
        setErrorMsg(error.message.replace("Firebase: ", ""));
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <div className="card bg-base-100 shadow-2xl max-w-md w-full p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-4">
          Enter your registered email to receive a password reset link.
        </p>

        {message && (
          <div className="alert alert-success text-sm py-2 px-3 text-white mb-3">
            <span>{message}</span>
          </div>
        )}

        {errorMsg && (
          <div className="alert alert-error text-sm py-2 px-3 text-white mb-3">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(handleReset)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <button className="btn btn-neutral mt-4 w-full">Send Reset Link</button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/login"
            state={{ from: location.state?.from }}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;