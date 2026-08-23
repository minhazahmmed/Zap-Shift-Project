import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-4 text-center">
      <h1 className="text-9xl font-black text-gray-800 tracking-widest">404</h1>
      <div className="bg-neutral text-white px-3 py-1 text-xs rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="text-xl font-semibold text-gray-700 mt-6">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-gray-500 text-sm mt-2 max-w-sm">
        {error?.statusText || error?.message || "It might have been moved or deleted."}
      </p>
      <Link to="/" className="btn btn-neutral mt-6 px-6">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;