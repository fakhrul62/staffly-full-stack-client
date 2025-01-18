import useAuth from "../../hooks/useAuth";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { LuClock2 } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const EmployeeHome = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());

  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const task = form.task.value;
    const hour = parseInt(form.hour.value);
    const date = startDate;
    const user_name = user?.displayName;
    const user_email = user?.email;
    console.log(task, hour, date, user_name, user_email);
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
      <div className="mt-12">
        <form
          className="font-body flex items-center gap-2 justify-between p-2 bg-zinc-300 rounded-lg"
          onSubmit={handleAdd}
        >
          <div className="flex items-center grow gap-2 input border-transparent">
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

          <div className="flex items-center gap-2 input border-transparent">
            <LuClock2 />
            <input
              type="number"
              placeholder="Hours worked"
              name="hour"
              className="input border-transparent grow focus:outline-none focus:ring-0 focus:border-transparent"
              required
            />
          </div>
          <div className="flex items-center gap-2 input border-transparent">
            <IoCalendarOutline />
            {/* <input
              type="text"
              placeholder="Date"
              name="date"
              className="input border-transparent grow focus:outline-none focus:ring-0 focus:border-transparent"
              defaultValue={today}
            /> */}
            <DatePicker
              className="border-transparent"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div>
            <button className="btn bg-blue-500 hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 text-white hover:text-black duration-300 font-body">
              Add
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
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        John Brown
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        45
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        New York No. 1 Lake Park
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium space-x-2">
                        <button
                          type="button"
                          className="hover:bg-green-500 hover:text-white bg-green-200 duration-300 gap-2 text-green-500 px-3 py-3 border border-green-500 rounded-lg"
                        >
                          <HiOutlinePencilSquare />
                        </button>
                        <button
                          type="button"
                          className="hover:bg-red-500 hover:text-white bg-red-200 duration-300 gap-2 text-red-500 px-3 py-3 border border-red-500 rounded-lg"
                        >
                          <FaRegTrashCan />
                        </button>
                      </td>
                    </tr>
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
