import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { TiUserAdd } from "react-icons/ti";
import { HiUserRemove } from "react-icons/hi";
import { FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ApprovedRiders = () => {
    const axiosSecure = useAxiosSecure()
    const modalRef = useRef(null)
    const [selectedRider, setSelectedRider] = useState(null)

    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders')
            return res.data;
        }
    });

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: status === 'approved' ? 'Rider has been approved!' : 'Rider has been rejected',
                        icon: "success",
                        confirmButtonColor: "#16a34a",
                        timer: 2000
                    });

                    modalRef.current?.close();
                    refetch();
                }
            })
    }

    const handleApproval = (rider) => {
        updateRiderStatus(rider, 'approved');
    }

    const handleRejection = (rider) => {
        updateRiderStatus(rider, 'rejected')
    }

    const handleViewRider = (rider) => {
        setSelectedRider(rider)
        modalRef.current?.showModal()
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This rider application will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/riders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The rider application has been deleted.",
                                icon: "success",
                                timer: 2000
                            });
                            refetch();
                        }
                    })
            }
        })
    }

    return (
        <div>
            <h2 className="text-5xl">All Riders are: {riders.length} </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>License Number</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.drivingLicenseNumber}</td>
                                <td>{rider.district}</td>
                                <td className={`${rider.status === 'approved' ? 'text-green-800' : rider.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>{rider.status}</td>

                                <td className="flex gap-2">
                                    <button className="btn" onClick={() => handleViewRider(rider)}>
                                        <FaEye className="text-blue-600" />
                                    </button>
                                    <button className="btn" onClick={() => handleApproval(rider)}>
                                        <TiUserAdd className="text-green-600" />
                                    </button>
                                    <button className="btn" onClick={() => handleRejection(rider)}>
                                        <HiUserRemove className="text-pink-600" />
                                    </button>
                                    <button className="btn" onClick={() => handleDelete(rider._id)}>
                                        <FaTrash className="text-red-600" />
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    {selectedRider && (
                        <>
                            <h3 className="font-bold text-2xl mb-4">Rider Details</h3>

                            <div className="space-y-2 text-sm">
                                <p><span className="font-semibold">Name:</span> {selectedRider.name}</p>
                                <p><span className="font-semibold">Email:</span> {selectedRider.email}</p>
                                <p><span className="font-semibold">Driving License:</span> {selectedRider.drivingLicenseNumber}</p>
                                <p><span className="font-semibold">Region:</span> {selectedRider.region}</p>
                                <p><span className="font-semibold">District:</span> {selectedRider.district}</p>
                                <p><span className="font-semibold">NID No:</span> {selectedRider.nidNumber}</p>
                                <p><span className="font-semibold">Phone Number:</span> {selectedRider.phoneNumber}</p>
                                <p><span className="font-semibold">Bike Model:</span> {selectedRider.bikeModel}</p>
                                <p><span className="font-semibold">Bike Registration:</span> {selectedRider.bikeRegistrationNumber}</p>
                                <p><span className="font-semibold">About:</span> {selectedRider.aboutYourself}</p>
                                <p>
                                    <span className="font-semibold">Status:</span>{" "}
                                    <span className={`${selectedRider.status === 'approved' ? 'text-green-800' : selectedRider.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                                        {selectedRider.status}
                                    </span>
                                </p>
                            </div>

                            <div className="modal-action">
                                <button
                                    className="btn btn-success text-white"
                                    onClick={() => handleApproval(selectedRider)}
                                >
                                    <TiUserAdd /> Approve
                                </button>
                                <button
                                    className="btn btn-error text-white"
                                    onClick={() => handleRejection(selectedRider)}
                                >
                                    <HiUserRemove /> Reject
                                </button>
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ApprovedRiders;