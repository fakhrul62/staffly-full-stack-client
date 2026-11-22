import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  Calendar,
  ClipboardList,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Dialog } from "../../components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";

const taskCategories = [
  "Sales",
  "Support",
  "Content",
  "Paper-work",
  "Marketing",
  "Development",
  "Design",
  "Finance",
  "Research",
];

const EmployeeHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [addDate, setAddDate] = useState(new Date());
  const [editingTask, setEditingTask] = useState(null);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${user.email}`);
      return res.data;
    },
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newTask = {
      task: form.task.value,
      hour: parseInt(form.hour.value, 10),
      date: addDate.toISOString(),
      user_name: user?.displayName,
      user_email: user?.email,
    };

    const res = await axiosSecure.post("/tasks", newTask);
    if (res.data.insertedId) {
      form.reset();
      setAddDate(new Date());
      refetch();
      Swal.fire({
        title: "Task Added",
        icon: "success",
        confirmButtonColor: "#1d4ed8",
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingTask) return;

    const updatedTaskData = {
      task: editingTask.task,
      hour: parseInt(editingTask.hour, 10),
      date:
        editingTask.date instanceof Date
          ? editingTask.date.toISOString()
          : editingTask.date,
    };

    const res = await axiosSecure.patch(
      `/tasks/${editingTask._id}`,
      updatedTaskData
    );

    if (res.data.modifiedCount > 0) {
      setEditingTask(null);
      refetch();
      Swal.fire({
        title: "Task Updated",
        icon: "success",
        confirmButtonColor: "#1d4ed8",
      });
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Delete this task?",
      text: "This work log entry will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/tasks/${item._id}`);
        refetch();
        Swal.fire({
          title: "Deleted",
          text: "Work log entry removed.",
          icon: "success",
          confirmButtonColor: "#1d4ed8",
        });
      }
    });
  };

  const totalHours = tasks.reduce((sum, t) => sum + Number(t.hour || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="default" className="mb-3">
            Employee Workspace
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {user?.displayName || "Team Member"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Log your daily tasks, track hours worked, and manage your work sheet.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="py-1.5 px-3 tabular-nums">
            <ClipboardList className="h-3.5 w-3.5 text-blue-600" strokeWidth={1.75} />
            {tasks.length} Tasks
          </Badge>
          <Badge variant="default" className="py-1.5 px-3 tabular-nums">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
            {totalHours} hrs total
          </Badge>
        </div>
      </div>

      {/* Add Task Form Card */}
      <Card className="p-5 bg-white border-slate-200/80 shadow-sm">
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end"
        >
          <div className="lg:col-span-4 space-y-1.5">
            <Label htmlFor="new-task">Task Category</Label>
            <Select id="new-task" name="task" required defaultValue="">
              <option value="" disabled>
                Select a task
              </option>
              {taskCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </div>

          <div className="lg:col-span-3 space-y-1.5">
            <Label htmlFor="new-hour">Hours Worked</Label>
            <Input
              id="new-hour"
              type="number"
              min="1"
              max="24"
              name="hour"
              placeholder="e.g. 4"
              required
            />
          </div>

          <div className="lg:col-span-3 space-y-1.5">
            <Label>Date</Label>
            <div className="relative">
              <Calendar
                className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400"
                strokeWidth={1.75}
              />
              <DatePicker
                selected={addDate}
                onChange={(date) => setAddDate(date || new Date())}
                wrapperClassName="w-full"
                className="flex h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <Button type="submit" className="w-full h-10">
              <Plus className="h-4 w-4" strokeWidth={2} />
              Add Task
            </Button>
          </div>
        </form>
      </Card>

      {/* Tasks Table Card */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">No.</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Hours Worked</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <ClipboardList className="h-8 w-8" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-600">
                      No tasks logged yet
                    </p>
                    <p className="text-xs text-slate-400">
                      Use the form above to add your first work sheet entry.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium text-slate-400 tabular-nums">
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{item.task}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 tabular-nums">
                    {item.hour} hrs
                  </TableCell>
                  <TableCell className="text-slate-600 tabular-nums">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setEditingTask({
                            ...item,
                            date: new Date(item.date),
                          })
                        }
                        aria-label="Edit task"
                        className="h-8 w-8"
                      >
                        <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(item)}
                        aria-label="Delete task"
                        className="h-8 w-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Edit Task Dialog */}
      <Dialog
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Update Work Log"
        description="Modify the task category, hours worked, or date."
      >
        {editingTask && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-task">Task Category</Label>
              <Select
                id="edit-task"
                name="task"
                required
                value={editingTask.task || ""}
                onChange={(e) =>
                  setEditingTask((prev) => ({ ...prev, task: e.target.value }))
                }
              >
                <option value="" disabled>
                  Select a task
                </option>
                {taskCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-hour">Hours Worked</Label>
              <Input
                id="edit-hour"
                type="number"
                min="1"
                max="24"
                name="hour"
                required
                value={editingTask.hour || ""}
                onChange={(e) =>
                  setEditingTask((prev) => ({ ...prev, hour: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <DatePicker
                selected={
                  editingTask.date ? new Date(editingTask.date) : new Date()
                }
                onChange={(date) =>
                  setEditingTask((prev) => ({ ...prev, date }))
                }
                wrapperClassName="w-full"
                className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </Dialog>
    </div>
  );
};

export default EmployeeHome;
