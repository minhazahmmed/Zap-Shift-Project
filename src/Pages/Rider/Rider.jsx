import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import agentPendingImg from "../../assets/agent-pending.png"; 
const Rider = () => {
  const serviceCenters = useLoaderData(); 

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Unique regions
  const regions = [...new Set(serviceCenters.map((sc) => sc.region))];

  const selectedRegion = useWatch({ control, name: "region" });

  const districts = serviceCenters
    .filter((sc) => sc.region === selectedRegion)
    .map((sc) => sc.district);

  const handleRiderSubmit = (data) => {
    Swal.fire({
      title: "Confirm Your Application",
      html: `
        <div style="text-align:left; font-size:14px; line-height:1.6;">
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Region:</b> ${data.region}</p>
          <p><b>District:</b> ${data.district}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Submit Application",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/riders", data)
          .then((res) => {
            console.log(res.data);

            Swal.fire({
              title: "Application Submitted!",
              text: "Your rider application has been submitted. We'll review it soon.",
              icon: "success",
              confirmButtonColor: "#16a34a",
            });

            reset();
            navigate("/");
          })
          .catch((error) => {
            console.error(error);

            if (error.response?.status === 409) {
              Swal.fire({
                title: "Already Applied",
                text: error.response.data.message,
                icon: "warning",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to submit application. Please try again.",
                icon: "error",
              });
            }
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-1">Be a Rider</h2>
      <p className="text-gray-500 mb-8 max-w-2xl">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
        personal packages to business shipments — we deliver on time, every time.
      </p>

      <div className="bg-white rounded-2xl shadow-sm p-5 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <form className="text-black" onSubmit={handleSubmit(handleRiderSubmit)}>
          <h3 className="text-lg md:text-xl font-bold mb-4">Tell us about yourself</h3>

          <fieldset className="fieldset">
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}

            <label className="label">Driving License Number</label>
            <input
              type="text"
              {...register("drivingLicenseNumber", {
                required: "Driving license number is required",
              })}
              className="input w-full"
              placeholder="Driving License Number"
            />
            {errors.drivingLicenseNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.drivingLicenseNumber.message}
              </p>
            )}

            <label className="label">Your Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}

            {/* Region */}
            <label className="label">Your Region</label>
            <select
              {...register("region", { required: "Region is required" })}
              defaultValue=""
              className="select w-full"
            >
              <option value="" disabled>
                Select your Region
              </option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.region && (
              <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
            )}

            {/* District (depends on Region) */}
            <label className="label">Your District</label>
            <select
              {...register("district", { required: "District is required" })}
              defaultValue=""
              className="select w-full"
              disabled={!selectedRegion}
            >
              <option value="" disabled>
                {selectedRegion ? "Select your District" : "Select Region first"}
              </option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>
            )}

            <label className="label">NID No</label>
            <input
              type="text"
              {...register("nidNumber", { required: "NID number is required" })}
              className="input w-full"
              placeholder="NID"
            />
            {errors.nidNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.nidNumber.message}</p>
            )}

            <label className="label">Phone Number</label>
            <input
              type="text"
              {...register("phoneNumber", { required: "Phone number is required" })}
              className="input w-full"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
            )}

            <label className="label">Bike Brand Model and Year</label>
            <input
              type="text"
              {...register("bikeModel", {
                required: "Bike brand, model and year is required",
              })}
              className="input w-full"
              placeholder="Bike Brand Model and Year"
            />
            {errors.bikeModel && (
              <p className="text-red-500 text-sm mt-1">{errors.bikeModel.message}</p>
            )}

            <label className="label">Bike Registration Number</label>
            <input
              type="text"
              {...register("bikeRegistrationNumber", {
                required: "Bike registration number is required",
              })}
              className="input w-full"
              placeholder="Bike Registration Number"
            />
            {errors.bikeRegistrationNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bikeRegistrationNumber.message}
              </p>
            )}

            <label className="label">Tell Us About Yourself</label>
            <textarea
              {...register("aboutYourself")}
              className="textarea w-full"
              placeholder="Tell Us About Yourself"
              rows={3}
            ></textarea>
          </fieldset>

          <button
            type="submit"
            className="btn bg-lime-400 hover:bg-lime-500 border-none text-black w-full mt-6"
          >
            Submit
          </button>
        </form>

        {/* Image Section */}
        <div className="hidden lg:flex justify-center items-center">
          <img src={agentPendingImg} alt="Rider on delivery bike" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Rider;