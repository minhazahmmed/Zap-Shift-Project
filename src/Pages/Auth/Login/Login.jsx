import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../Social Login/SocialLogin";

const Login = () => {
  
    const {register, handleSubmit , formState: {errors}} = useForm();

     const navigate = useNavigate();

  const { signInUser } = useAuth();

  const handleSignIn = (data) => {
    signInUser(data.email, data.password)
      .then((result) => { 
        console.log(result.user);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };




  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      
      <div className="card-body bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl ">
        <h1 className="text-3xl text-center font-bold">Welcome Back</h1>
      <p className="text-center font-medium">Login with ZapShift</p>
        <div>
          <fieldset className="fieldset">
            {/* Email Field */}
            <label className="label">Email</label>
            <input {...register('email', {required: true})} type="email" className="input" placeholder="Email" />

        {
          errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>

        }



            {/* password field */}
            <label className="label">Password</label>
            <input {...register('password', {
              required: true,
              minLength: 6,
            })} type="password" className="input" placeholder="Password" />
           
           {
            errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>
           }


            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
          
        </div>
        <p>Don’t have any account? <Link to={'/register'} className="underline text-blue-600">Register</Link> </p>
         <SocialLogin></SocialLogin>
      </div>
     
    </form>
  );
};


export default Login;
