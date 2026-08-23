import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router";
import SocialLogin from "../Social Login/SocialLogin";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [authError, setAuthError] = useState("");
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleRegistration = (data) => {
    setAuthError("");
    const ProfileImage = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        const formData = new FormData();
        formData.append("image", ProfileImage);
        const Image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios
          .post(Image_API_URL, formData)
          .then((res) => {
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };

            updateUserProfile(userProfile)
              .then(() => {
                navigate(from, { replace: true });
              })
              .catch((error) => {
                console.log(error);
                navigate(from, { replace: true });
              });
          })
          .catch((error) => console.log(error));
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
          <h2 className="text-3xl font-extrabold mb-3">Join ZapShift</h2>
          <p className="text-sm opacity-80">
            Create an account today and experience seamless parcel management and ultra-fast deliveries.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(handleRegistration)} className="card-body lg:w-1/2 p-6 sm:p-8">
          <h1 className="text-3xl text-center font-bold">Create Account</h1>
          <p className="text-center font-medium text-gray-500 mb-2">Register with ZapShift</p>

          {authError && (
            <div className="alert alert-error text-sm py-2 px-3 text-white">
              <span>{authError}</span>
            </div>
          )}

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Photo */}
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Profile Photo</span>
            </label>
            <input
              type="file"
              {...register("photo", { required: "Photo is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && (
              <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters required" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                  message: "Requires uppercase, lowercase, number and special char",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button className="btn btn-neutral mt-4 w-full">Register</button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              state={{ from: location.state?.from }}
              className="underline text-blue-600 font-semibold"
            >
              Login
            </Link>
          </p>

          <SocialLogin from={from} />
        </form>
      </div>
    </div>
  );
};

export default Register;