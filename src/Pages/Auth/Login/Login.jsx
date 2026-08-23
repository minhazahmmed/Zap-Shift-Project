import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router";
import SocialLogin from "../Social Login/SocialLogin";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (data) => {
    setAuthError("");
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setAuthError(error.message.replace("Firebase: ", ""));
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-4xl w-full flex-col-reverse lg:flex-row overflow-hidden">
        {/* Banner Section */}
        <div className="lg:w-1/2 bg-neutral text-neutral-content p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-extrabold mb-3">ZapShift Delivery</h2>
          <p className="text-sm opacity-80">
            Fast, secure, and reliable delivery network at your fingertips. Log in to track your shipments.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(handleSignIn)} className="card-body lg:w-1/2 p-6 sm:p-8">
          <h1 className="text-3xl text-center font-bold">Welcome Back</h1>
          <p className="text-center font-medium text-gray-500 mb-2">Login with ZapShift</p>

          {authError && (
            <div className="alert alert-error text-sm py-2 px-3 text-white">
              <span>{authError}</span>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}

            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                state={{ from: location.state?.from }}
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button className="btn btn-neutral mt-4 w-full">Login</button>

          <p className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <Link
              to="/register"
              state={{ from: location.state?.from }}
              className="underline text-blue-600 font-semibold"
            >
              Register
            </Link>
          </p>

          <SocialLogin from={from} />
        </form>
      </div>
    </div>
  );
};

export default Login;