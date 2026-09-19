import { useNavigate, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // 🔴 NEW

const SocialLogin = ({ from: propsFrom }) => {
  const { signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure(); // 🔴 NEW
  const navigate = useNavigate();
  const location = useLocation();

  // Props থেকে পাওয়া পাথ অথবা লোকাল লোকেশন স্টেট থেকে পাথ বের করা
  const redirectPath = propsFrom || location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);

        // 🔴 NEW: Google login সফল হলেই backend-এ user save করার চেষ্টা করা —
        // backend-এর /users route ইতিমধ্যে email দিয়ে duplicate check করে,
        // তাই বারবার login করলেও নতুন document তৈরি হবে না
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };

        axiosSecure
          .post("/users", userInfo)
          .then((dbRes) => {
            console.log("User saved to DB:", dbRes.data);
          })
          .catch((error) => {
            console.error("Failed to save user to DB:", error);
          })
          .finally(() => {
            navigate(redirectPath, { replace: true });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="text-center">
      <p className="py-1 font-bold text-gray-700">Or</p>
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="btn w-full bg-white text-black border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;