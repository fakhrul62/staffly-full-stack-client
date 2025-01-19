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
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
      // Swal.fire({
      //   title: "Status Updated!",
      //   icon: "success",
      //   iconColor: "#76a9fa ",
      //   confirmButtonText: "Okay",
      //   customClass: {
      //     confirmButton: "bg-blue-500 text-white font-body px-32",
      //     title: "font-head font-bold text-2xls",
      //   },
      // });
    }
  };

  const handlePayroll = async (e, email) => {
    e.preventDefault();
    const form = e.target;

    try {
      // Check if payroll already exists before making a request
      const { data: existingPayroll } = await axiosSecure.get(
        `/payrolls/check?employee_email=${email}&month=${month}&year=${year}`
      );

      if (existingPayroll.exists) {
        Swal.fire({
          title: "Payroll for this month has already been requested!!",
          icon: "error",
          iconColor: "#76a9fa ",
          confirmButtonText: "Okay",
          customClass: {
            confirmButton: "bg-blue-500 text-white font-body px-32",
            title: "font-head font-bold text-2xls",
          },
        });
        return;
      }

      // Proceed with payroll request if no duplicate exists
      const payroll = {
        month: parseInt(month),
        year: parseInt(year),
        employee_email: email,
        hr_email: user.email,
      };

      const res = await axiosSecure.post("/payrolls", payroll);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Payroll request sent successfully!!",
          icon: "success",
          iconColor: "#76a9fa ",
          confirmButtonText: "Okay",
          customClass: {
            confirmButton: "bg-blue-500 text-white font-body px-32",
            title: "font-head font-bold text-2xls",
          },
        });

      }
    } catch (error) {
      Swal.fire({
        title: "Payroll for this month has already been requested!!",
        icon: "error",
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
                              <IoCheckmarkSharp className="text-white bg-green-400 p-2 rounded-full text-4xl duration-300" />
                            ) : (
                              <RxCross2 className="text-white bg-red-400 p-2 rounded-full text-4xl duration-300" />
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
                            onClick={() => {
                              setSelectedEmployee(item); // Store the selected employee
                              document.getElementById("my_modal_5").showModal();
                            }}
                            type="button"
                            disabled={!item.isVerified}
                            className="hover:bg-emerald-600 hover:text-white bg-emerald-200 duration-300 gap-2 text-emerald-600 px-3 py-3 border border-emerald-500 rounded-lg"
                          >
                            Pay
                          </button>
                          <dialog
                            id="my_modal_5"
                            className="modal !z-0 modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <h2 className="text-center font-bebas uppercase font-bold text-black tracking-wide text-2xl mb-6 mt-3">
                                Monthly Pay Request
                              </h2>
                              <form
                                className="font-body space-y-2 p-2 bg-zinc-200 rounded-lg"
                                onSubmit={(e) => {
                                  e.preventDefault(); // Prevent default form submission
                                  
                                  handlePayroll(e, selectedEmployee.email); // Use the selected employee
                                  
                                      document
                                        .getElementById("my_modal_5")
                                        ?.close();
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="bg-zinc-300 grow space-y-2 p-2 rounded-lg ">
                                    <select
                                      id="month"
                                      className="w-full  border-transparent focus:outline-none focus:ring-0 focus:border-transparent rounded-lg"
                                      value={month}
                                      required
                                      onChange={(e) => {
                                        setMonth(e.target.value);
                                      }}
                                    >
                                      <option value="">Select Month</option>
                                      <option value="01">January</option>
                                      <option value="02">February</option>
                                      <option value="03">March</option>
                                      <option value="04">April</option>
                                      <option value="05">May</option>
                                      <option value="06">June</option>
                                      <option value="07">July</option>
                                      <option value="08">August</option>
                                      <option value="09">September</option>
                                      <option value="10">October</option>
                                      <option value="11">November</option>
                                      <option value="12">December</option>
                                    </select>
                                  </div>

                                  <div className="bg-zinc-300 space-y-2 p-2 rounded-lg">
                                    <select
                                      id="year"
                                      required
                                      defaultValue=""
                                      className="w-full border-transparent focus:outline-none focus:ring-0 focus:border-transparent rounded-lg"
                                      onChange={(e) => setYear(e.target.value)}
                                    >
                                      <option value="">Select Year</option>
                                      {/* Example: You can dynamically create years using a loop */}
                                      {Array.from({ length: 30 }, (_, i) => {
                                        const currentYear =
                                          new Date().getFullYear();
                                        return (
                                          <option
                                            key={i}
                                            value={currentYear + i}
                                          >
                                            {currentYear + i}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>

                                <div>
                                  <button className="btn w-full bg-blue-500 hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 text-white hover:text-black duration-300 font-body">
                                    Request Admin for Pay
                                  </button>
                                </div>
                              </form>
                              <div className="modal-action">
                                <form method="dialog">
                                  <button className="btn">Close</button>
                                </form>
                              </div>
                            </div>
                          </dialog>

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
