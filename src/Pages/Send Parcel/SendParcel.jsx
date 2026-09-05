import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const serviceCenters = useLoaderData(); // serviceCenters.json data from route loader

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const {user} = useAuth();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Unique regions using Set
  const regions = [...new Set(serviceCenters.map((sc) => sc.region))];

  // Watch selected region for sender & receiver
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  // Districts filtered by selected region
  const senderDistricts = serviceCenters
    .filter((sc) => sc.region === senderRegion)
    .map((sc) => sc.district);

  const receiverDistricts = serviceCenters
    .filter((sc) => sc.region === receiverRegion)
    .map((sc) => sc.district);

  const handleParcelSubmit = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight) || 0;

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      const minCharge = isSameDistrict ? 110 : 150;
      const extraWeight = Math.max(parcelWeight - 3, 0);
      const extraCharge = isSameDistrict
        ? extraWeight * 40
        : extraWeight * 40 + 40;
      cost = minCharge + extraCharge;
    }

    console.log('cost', cost);
    data.cost = cost;

    Swal.fire({
      title: "Confirm Your Booking",
      html: `
        <div style="text-align:left; font-size:14px; line-height:1.6;">
          <p><b>Parcel Type:</b> ${isDocument ? "Document" : "Non-Document"}</p>
          <p><b>From:</b> ${data.senderDistrict}, ${data.senderRegion}</p>
          <p><b>To:</b> ${data.receiverDistrict}, ${data.receiverRegion}</p>
          <hr style="margin:8px 0;"/>
          <p style="font-size:16px;"><b>Delivery Cost: ৳${cost}</b></p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
          //save the parcel info to the database
          axiosSecure.post('/parcels', data)
          .then(res=>{
            console.log(res.data)
          })


        Swal.fire({
          title: "Booking Confirmed!",
          html: `Your parcel has been booked successfully.<br/><b>Total Cost: ৳${cost}</b>`,
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        navigate('/dashboard/my-parcels')
        reset();
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-1">Send A Parcel</h2>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-500 mb-6">
        Enter your parcel details
      </h2>

      <div className="bg-white rounded-2xl shadow-sm p-5 md:p-10">
        <form
          className="text-black"
          onSubmit={handleSubmit(handleParcelSubmit)}
        >
          {/* Parcel Type */}
          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="document"
                {...register("parcelType", { required: true })}
                className="radio radio-success"
                defaultChecked
              />
              Document
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType", { required: true })}
                className="radio radio-success"
              />
              Non-Document
            </label>
          </div>
          {errors.parcelType && (
            <p className="text-red-500 text-sm -mt-4 mb-4">
              Parcel type is required
            </p>
          )}

          {/* Parcel Name / Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mb-8">
            <fieldset className="fieldset">
              <label className="label">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName", {
                  required: "Parcel name is required",
                })}
                className="input w-full"
                placeholder="Parcel Name"
              />
              {errors.parcelName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parcelName.message}
                </p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <label className="label">Parcel Weight (KG)</label>
              <input
                type="number"
                step="0.01"
                {...register("parcelWeight", {
                  required: "Parcel weight is required",
                  min: { value: 0.1, message: "Weight must be greater than 0" },
                })}
                className="input w-full"
                placeholder="Parcel Weight (KG)"
              />
              {errors.parcelWeight && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parcelWeight.message}
                </p>
              )}
            </fieldset>
          </div>

          {/* Sender / Receiver */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 md:gap-x-10">
            {/* Sender Details */}
            <fieldset className="fieldset">
              <h2 className="text-lg md:text-xl font-bold mb-2">
                Sender Details
              </h2>

              <label className="label">Sender Name</label>
              <input
                type="text"
                {...register("senderName", {
                  required: "Sender name is required",
                })}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Sender Name"
              />
              {errors.senderName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderName.message}
                </p>
              )}

              <label className="label">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail", {
                  required: "Sender email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                 defaultValue={user?.email}
                className="input w-full"
                placeholder="Sender Email"
              />
              {errors.senderEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderEmail.message}
                </p>
              )}

              <label className="label">Address</label>
              <input
                type="text"
                {...register("senderAddress", {
                  required: "Address is required",
                })}
                className="input w-full"
                placeholder="Address"
              />
              {errors.senderAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderAddress.message}
                </p>
              )}

              <label className="label">Sender Phone No</label>
              <input
                type="text"
                {...register("senderPhoneNumber", {
                  required: "Phone number is required",
                })}
                className="input w-full"
                placeholder="Sender Phone No"
              />
              {errors.senderPhoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderPhoneNumber.message}
                </p>
              )}

              {/* Region */}
              <label className="label">Your Region</label>
              <select
                {...register("senderRegion", {
                  required: "Region is required",
                })}
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
              {errors.senderRegion && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderRegion.message}
                </p>
              )}

              {/* District (depends on Region) */}
              <label className="label">Your District</label>
              <select
                {...register("senderDistrict", {
                  required: "District is required",
                })}
                defaultValue=""
                className="select w-full"
                disabled={!senderRegion}
              >
                <option value="" disabled>
                  {senderRegion ? "Select your District" : "Select Region first"}
                </option>
                {senderDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.senderDistrict && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.senderDistrict.message}
                </p>
              )}

              <label className="label">Pickup Instruction</label>
              <textarea
                {...register("pickupInstruction")}
                className="textarea w-full"
                placeholder="Pickup Instruction"
                rows={3}
              ></textarea>
            </fieldset>

            {/* Receiver Details */}
            <fieldset className="fieldset">
              <h2 className="text-lg md:text-xl font-bold mb-2">
                Receiver Details
              </h2>

              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName", {
                  required: "Receiver name is required",
                })}
                className="input w-full"
                placeholder="Receiver Name"
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverName.message}
                </p>
              )}

              <label className="label">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail", {
                  required: "Receiver email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="input w-full"
                placeholder="Receiver Email"
              />
              {errors.receiverEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverEmail.message}
                </p>
              )}

              <label className="label">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress", {
                  required: "Address is required",
                })}
                className="input w-full"
                placeholder="Address"
              />
              {errors.receiverAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverAddress.message}
                </p>
              )}

              <label className="label">Receiver Contact No</label>
              <input
                type="text"
                {...register("receiverPhoneNumber", {
                  required: "Phone number is required",
                })}
                className="input w-full"
                placeholder="Receiver Contact No"
              />
              {errors.receiverPhoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverPhoneNumber.message}
                </p>
              )}

              {/* Region */}
              <label className="label">Receiver Region</label>
              <select
                {...register("receiverRegion", {
                  required: "Region is required",
                })}
                defaultValue=""
                className="select w-full"
              >
                <option value="" disabled>
                  Select Region
                </option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.receiverRegion && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverRegion.message}
                </p>
              )}

              {/* District (depends on Region) */}
              <label className="label">Receiver District</label>
              <select
                {...register("receiverDistrict", {
                  required: "District is required",
                })}
                defaultValue=""
                className="select w-full"
                disabled={!receiverRegion}
              >
                <option value="" disabled>
                  {receiverRegion ? "Select District" : "Select Region first"}
                </option>
                {receiverDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.receiverDistrict && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receiverDistrict.message}
                </p>
              )}

              <label className="label">Delivery Instruction</label>
              <textarea
                {...register("deliveryInstruction")}
                className="textarea w-full"
                placeholder="Delivery Instruction"
                rows={3}
              ></textarea>
            </fieldset>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            * PickUp Time 4pm-7pm Approx.
          </p>

          <input
            className="btn btn-primary text-black w-full md:w-auto mt-4"
            type="submit"
            value="Proceed to Confirm Booking"
          />
        </form>
      </div>
    </div>
  );
};

export default SendParcel;