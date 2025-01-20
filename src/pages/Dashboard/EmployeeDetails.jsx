import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const EmployeeDetails = () => {
  const id = useParams();
  const item = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const getMonthName = (month) => {
    return new Date(2026, month - 1).toLocaleString("en-US", { month: "long" });
  };

//   const { data: payrolls = [], refetch } = useQuery({
//     queryKey: ["payrolls"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payrolls`);
//       return res.data;
//     },
//   });
  const { data: myPay = [], refetch } = useQuery({
    queryKey: ["myPay", item.email, "paid"],  // Include dependencies for re-fetching
    queryFn: async () => {
      const res = await axiosSecure.get(`/payrolls/${item.email}?status=paid`);
      return res.data;
    },
  });
  const transformedData = myPay.map((item) => ({
    month: `${getMonthName(item.month)}, ${item.year}`, // "January 2026"
    salary: item.employee.salary,
  }));
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="w-20 rounded-xl overflow-hidden p-1 bg-purple-400">
          <img src={item.photoURL} className="rounded-xl" />
        </div>
        <div className="">
          <h2 className="font-bold text-black uppercase text-2xl">
            {item.name}
          </h2>
          <h2>{item.designation}</h2>
        </div>
      </div>
      <div className="mt-10">
        <BarChart
          width={900}
          height={400}
          data={transformedData} // Use the transformed data
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" /> {/* X-axis shows Month/Year */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="salary"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default EmployeeDetails;
