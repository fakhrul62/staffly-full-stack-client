import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payrolls = [], refetch } = useQuery({
    queryKey: ["payrolls"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payrolls`);
      return res.data;
    },
  });


  const handlePay = async (item) => {
    const currentDate = new Date();
    const date = currentDate.toISOString().split("T")[0];  // Format the date as YYYY-MM-DD
  
    try {
      // Send PATCH request to the server to update the payment date and status
      const updatedData = {
        payment_date: date,
        payment_status: "paid",
      };
  
      const res = await axiosSecure.patch(
        `/payrolls/${item._id}`,  // Endpoint for updating a specific payroll
        updatedData
      );
      console.log(res.data);
      
      if (res.status === 200) {
        // If successful, refetch the data to reflect the changes (optional)
        refetch();
      } else {
        console.error("Failed to update payroll");
      }
    } catch (error) {
      console.error("Error updating payroll:", error);
    }
  };
  
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold font-bebas tracking-widest text-zinc-900 inline-block ">
          Payroll
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
                        Salary
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Month
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Year
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Payment Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Pay
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payrolls.map((item, idx) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item.employee.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.employee.salary}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.month}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.payment_date}
                          
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.payment_status === "pending" ? (
                            <button
                              onClick={() => handlePay(item)}
                              type="button"
                              className="px-4 py-2 rounded-lg border border-zinc-950"
                            >
                              Pay
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="px-4 py-2 bg-green-300 text-green-700 rounded-lg border border-green-700"
                            >
                              Paid
                            </button>
                          )}
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

export default Payroll;
