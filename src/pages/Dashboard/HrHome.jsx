import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const HrHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees`);
      return res.data;
    },
  });
  const handleToggleVerified = async (id, currentStatus) => {
    const user = { isVerified: !currentStatus };
    const res = await axiosSecure.patch(`/users/${id}`, user);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Status Updated!",
        icon: "success",
        iconColor: "#76a9fa ",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: "bg-blue-500 text-white font-body px-32",
          title: "font-head font-bold text-2xls",
        },
      });
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold font-bebas tracking-widest text-zinc-900 inline-block ">
          Welcome,{" "}
          <span className="border-b-4 border-purple-600 pb-1">
            {user?.displayName}
          </span>
        </h2>
      </div>
      <div className="mt-20">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Verify Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Bank
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Salary
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((item, idx) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleVerified(item._id, item.isVerified)
                            }
                          >
                            {item.isVerified ? (
                              <IoCheckmarkSharp className="text-white bg-green-400 p-2 rounded-full text-4xl" />
                            ) : (
                              <RxCross2 className="text-white bg-red-400 p-2 rounded-full text-4xl" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.bank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          ${item.salary}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium space-x-2">
                          <button
                            type="button"
                            className="hover:bg-emerald-600 hover:text-white bg-emerald-200 duration-300 gap-2 text-emerald-600 px-3 py-3 border border-emerald-500 rounded-lg"
                          >
                            Pay
                          </button>

                          <button
                            type="button"
                            className="hover:bg-blue-500 hover:text-white bg-blue-200 duration-300 gap-2 text-blue-500 px-3 py-3 border border-blue-500 rounded-lg"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrHome;
