import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
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

  return (
    <div>

      <h2>Please Pay for: {parcel?.parcelName}</h2>
      <p>Total Cost: ৳{parcel?.cost}</p>
    </div>
  );
};

export default Payment;