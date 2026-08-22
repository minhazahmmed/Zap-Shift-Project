import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../Social Login/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser } = useAuth();
  const navigate = useNavigate();
  

  const handleRegistration = (data) => {
    console.log(data.photo[0]);
    const ProfileImage = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        const formData = new FormData();
        formData.append('image', ProfileImage)
        const Image_API_URL = `https://api.imgbb.com/1/upload?key=import.meta.env.VITE_image_host_key`
        axios.post(Image_API_URL)
        .then(res =>{
          console.log(res);
          
        })
      
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <div className="card-body bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-3xl text-center font-bold">Create an Account</h1>
          <p className="text-center font-medium">Register with ZapShift</p>
          <div>
            <fieldset className="fieldset">
              {/* name field */}

              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", {
                  required: true,
                })}
                className="input"
                placeholder="Name"
              />

              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
              {/* photo field */}

             

              <label className="label">Profile Photo</label>
              <input
                type="file"
                {...register("photo", {
                 
                })}
                className="file-input"
                placeholder="Upload your photo"
              />

              {errors.photo?.type === "required" && (
                <p className="text-red-500">Photo is required</p>
              )}

              {/* email field */}

              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                })}
                className="input"
                placeholder="Email"
              />

              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* password field */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                })}
                className="input"
                placeholder="Password"
              />

              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must conatin 6 letters or more than 6 letters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password requires at least one uppercase, one lowercase, one
                  symbol and one number
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </div>
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="underline text-blue-600">
              Login
            </Link>{" "}
          </p>
           <SocialLogin></SocialLogin>
        </div>
        
      </form>
    </div>
  );
};

export default Register;
