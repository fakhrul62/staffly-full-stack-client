import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Progress = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEmail, setSelectedEmail] = useState("");
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks`);
      return res.data;
    },
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees`);
      return res.data;
    },
  });
  const filteredTasks = selectedEmail
    ? tasks.filter((task) => task.user_email === selectedEmail)
    : tasks;
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold font-bebas tracking-widest text-zinc-900 inline-block ">
          Progress
        </h2>
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-zinc-900 mb-6">
          All Employees:
        </h3>
        <div className="flex items-center gap-5 mb-5">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 px-10 border border-zinc-500"
            >
              Filter
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {users.map((user) => (
                <li key={user.email} onClick={() => setSelectedEmail(user.email)}>
                  <a>{user.name}</a>
                </li>
              ))}
            </ul>
          </div>
          {selectedEmail && (
          <div>
            {/* <p className="text-gray-600">Filtering tasks for: {selectedEmail}</p> */}
            <button
              onClick={() => setSelectedEmail("")}
              className="btn m-1 px-10 border border-zinc-500 text-zinc-800  "
            >
              Clear Filter
            </button>
          </div>
        )}
        </div>
        
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
                        Task Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Hour Spent
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Made by
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTasks.map((item, idx) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item.task}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.hour}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.user_name}
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

export default Progress;
