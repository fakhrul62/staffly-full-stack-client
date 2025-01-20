import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllEmployees = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users`);
      return res.data;
    },
  });
  // Handle firing an employee
  const handleFire = async (id) => {
    try {
      const res = await axiosSecure.patch(`/fire-user/${id}`, {
        workStatus: "inactive",
      });
      refetch(); // Refresh the data
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
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              iconColor: "#76a9fa",
              text: "Employee fired successfully.",
              icon: "success",
              customClass: {
                confirmButton: "bg-blue-500 text-white font-body px-32",
                title: "font-head font-bold text-2xls",
              },
            });
          }
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Failed to fire employee!",
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
  // Handle role toggle between employee and HR
  const handleRoleToggle = async (id, currentRole) => {
    const newRole = currentRole === "employee" ? "hr" : "employee";

    try {
      const res = await axiosSecure.patch(`/update-role/${id}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        refetch(); // Refresh data
        alert(`User role updated to ${newRole}!`);
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role.");
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold font-bebas tracking-widest text-zinc-900 inline-block ">
          All Employees
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
                        Designation
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Make HR
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                      >
                        Fire
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allUsers.map((item, idx) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.designation ? item.designation : "HR"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <button
                            onClick={() =>
                              handleRoleToggle(item._id, item.role)
                            }
                            type="button"
                            className={`px-4 py-2 rounded-lg border ${
                              item.role === "employee"
                                ? "bg-green-300 text-green-700 border-green-700"
                                : "bg-red-300 text-red-700 border-red-700"
                            }`}
                          >
                            {item.role === "employee"
                              ? "Make HR"
                              : "Make Employee"}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.workStatus === "active" ? (
                            <button
                              onClick={() => handleFire(item._id)}
                              type="button"
                              className="px-4 py-2 bg-red-300 text-red-700 rounded-lg border border-red-700"
                            >
                              Fire
                            </button>
                          ) : (
                            <button
                              disabled
                              type="button"
                              className="px-4 py-2 bg-orange-300 text-orange-700 rounded-lg border border-orange-700"
                            >
                              Fired
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

export default AllEmployees;
