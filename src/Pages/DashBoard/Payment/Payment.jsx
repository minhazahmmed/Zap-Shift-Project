import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, isError, data: parcel } = useQuery({
    queryKey: ['parcels', id], 
    enabled: !!id, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-50">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError || !parcel) {
    return <div>Failed to load parcel details.</div>;
  }

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        cost: parcel.cost,
        id: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName,
      };

      console.log("Sending payment info:", paymentInfo); 

      const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
      console.log(res.data);
      
     
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment request failed:", error.response?.data || error.message);
    }
  };

  



  return (
    <div>

      <h2>Please Pay for: {parcel?.parcelName}</h2>
      <p>Total Cost: ৳{parcel?.cost}</p>
      <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
    </div>
  );
};

export default Payment;