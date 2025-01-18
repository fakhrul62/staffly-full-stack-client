import useAuth from "../../hooks/useAuth";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { LuClock2 } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const EmployeeHome = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${user.email}`);
      return res.data;
    },
  });
  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const task = form.task.value;
    const hour = parseInt(form.hour.value);
    const date = selectedTask ? selectedTask.date : new Date(); 
    const user_name = user?.displayName;
    const user_email = user?.email;
    const newTask = { task, hour, date, user_name, user_email };
    const res = await axiosSecure.post("/tasks", newTask);
    if (res.data.insertedId) {
      refetch();
      Swal.fire({
        title: "Task Added!",
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
  const handleUpdate = async (e) => {
    e.preventDefault();
    // Extract form data
    const form = e.target;
    const updatedTask = form.task.value;
    const updatedHour = parseInt(form.hour.value);
    const updatedDate = selectedTask.date;

    const updatedTaskData = {
      task: updatedTask,
      hour: updatedHour,
      date: updatedDate,
    };
    // Send request to update the task
    const res = await axiosSecure.patch(
      `/tasks/${selectedTask._id}`,
      updatedTaskData
    );
    console.log(res.data);

    if (res.data.modifiedCount > 0) {
      refetch(); // Refetch tasks to update the UI
      Swal.fire({
        title: "Task Updated!",
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
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      iconColor: "#76a9fa",
      showCancelButton: true,
      cancelButtonColor: "#76a9fa",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "bg-blue-500 text-white font-body px-32",
        title: "font-head font-bold text-2xls",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/tasks/${item._id}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          iconColor: "#76a9fa",
          text: "Item has been removed from the database.",
          icon: "success",
          customClass: {
            confirmButton: "bg-blue-500 text-white font-body px-32",
            title: "font-head font-bold text-2xls",
          },
        });
      }
    });
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold font-bebas tracking-widest text-zinc-900 inline-block ">
          Welcome,{" "}
          <span className="border-b-4 border-blue-400 pb-1">
            {user?.displayName}
          </span>
        </h2>
      </div>
      <div className="mt-12 sticky top-5">
        <form
          className="font-body flex items-center gap-2 justify-between p-2 bg-zinc-300 rounded-lg"
          onSubmit={handleAdd}
        >
          <div className="flex items-center grow gap-2 input border-transparent focus:outline-none focus:ring-0 focus:border-transparent">
            <GoTasklist />
            <select
              name="task"
              className=" w-full input border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select a task
              </option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Content">Content</option>
              <option value="Paper-work">Paper-work</option>
              <option value="Marketing">Marketing</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Finance">Finance</option>
              <option value="Research">Research</option>
            </select>
          </div>

          <div className="flex items-center gap-2 input border-transparent focus:outline-none focus:ring-0 focus:border-transparent">
            <LuClock2 />
            <input
              type="number"
              placeholder="Hours worked"
              name="hour"
              className="input border-transparent grow focus:outline-none focus:ring-0 focus:border-transparent"
              required
            />
          </div>
          <div className="flex items-center gap-2 input border-transparent focus:outline-none focus:ring-0 focus:border-transparent">
            <IoCalendarOutline />
            <DatePicker
              className="border-transparent focus:outline-none focus:ring-0 focus:border-none"
              selected={selectedTask ? new Date(selectedTask.date) : new Date()}
              onChange={(date) =>
                setSelectedTask((prev) => ({
                  ...prev,
                  date: date.toISOString(), // Update the date
                }))
              }
            />
          </div>
          <div>
            <button className="btn text-xl bg-blue-500 hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 text-white hover:text-black duration-300 font-body">
              +
            </button>
          </div>
        </form>
      </div>
      <div className="mt-12">
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
                        Tasks
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Hours Worked
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tasks.map((item, idx) => (
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
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium space-x-2">
                          <button
                            onClick={() => {
                              setSelectedTask(item);
                              document.getElementById("my_modal_5").showModal();
                            }}
                            type="button"
                            className="hover:bg-green-500 hover:text-white bg-green-200 duration-300 gap-2 text-green-500 px-3 py-3 border border-green-500 rounded-lg"
                          >
                            <HiOutlinePencilSquare />
                          </button>
                          <dialog
                            id="my_modal_5"
                            className="modal z-0 modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <form
                                className="font-body space-y-2 p-2 bg-zinc-300 rounded-lg"
                                onSubmit={handleUpdate}
                              >
                                <div className="flex items-center grow gap-2 input border-transparent focus:outline-none focus:ring-0 focus:border-transparent">
                                  <GoTasklist />
                                  <select
                                    name="task"
                                    className="w-full input border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                    required
                                    value={selectedTask?.task || ""}
                                    onChange={(e) =>
                                      setSelectedTask((prev) => ({
                                        ...prev,
                                        task: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value="" disabled>
                                      Select a task
                                    </option>
                                    <option value="Sales">Sales</option>
                                    <option value="Support">Support</option>
                                    <option value="Content">Content</option>
                                    <option value="Paper-work">
                                      Paper-work
                                    </option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Development">
                                      Development
                                    </option>
                                    <option value="Design">Design</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Research">Research</option>
                                  </select>
                                </div>

                                <div className="flex items-center gap-2 input border-transparent focus:outline-none focus:ring-0 focus:border-transparent">
                                  <LuClock2 />
                                  <input
                                    type="number"
                                    placeholder="Hours worked"
                                    name="hour"
                                    className="input border-transparent grow focus:outline-none focus:ring-0 focus:border-transparent"
                                    required
                                    value={selectedTask?.hour || ""}
                                    onChange={(e) =>
                                      setSelectedTask((prev) => ({
                                        ...prev,
                                        hour: e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div className="flex items-center gap-2 input border-transparent focus:outline-none focus:ring-0 focus:border-transparent">
                                  <IoCalendarOutline />
                                  <DatePicker
                                    className="border-transparent focus:outline-none focus:ring-0 focus:border-none"
                                    selected={selectedTask?.date || new Date()} // Make sure it's using selectedTask's date
                                    onChange={(date) =>
                                      setSelectedTask((prev) => ({
                                        ...prev,
                                        date,
                                      }))
                                    }
                                  />
                                </div>

                                <div>
                                  <button className="btn w-full bg-blue-500 hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 text-white hover:text-black duration-300 font-body">
                                    Update Task
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
                            onClick={() => handleDelete(item)}
                            type="button"
                            className="hover:bg-red-500 hover:text-white bg-red-200 duration-300 gap-2 text-red-500 px-3 py-3 border border-red-500 rounded-lg"
                          >
                            <FaRegTrashCan />
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

export default EmployeeHome;
