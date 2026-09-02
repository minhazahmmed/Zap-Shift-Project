import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteParcels = (id) => {
  console.log(id);

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete API call
      axiosSecure.delete(`/parcels/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
              refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
        
          
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the parcel.",
            icon: "error",
          });
        });
    }
  });
};

  return (
    <div>
      <h2>All of my parcels : {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {
                    parcel.paymentStatus === 'paid' ? 
                    <span className="btn btn-primary text-black">Paid</span>
                    
                    :
                      <Link to={`/dashboard/payment/${parcel._id}`}  className="btn btn-sm btn-primary text-black">
                        Pay
                      
                      </Link>
                  }

                </td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  <button className="btn btn-square hover:btn-primary text-black mx-1">
                    <FaEdit />
                  </button>
                  <button className="btn btn-square hover:btn-primary text-black mx-1">
                    <FaMagnifyingGlass />
                  </button>

                  <button
                    onClick={() => handleDeleteParcels(parcel._id)}
                    className="btn btn-square hover:btn-primary text-black mx-1"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
