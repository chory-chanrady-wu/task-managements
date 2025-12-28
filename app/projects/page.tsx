import { getTasks } from "@/lib/getTasks";
import { Bell } from "lucide-react";

export default async function DashboardPage() {
  const { tasks } = await getTasks();

  return (
    <main className="flex-1 p-4 bg-gray-100 min-h-screen">
      <div className="mb-2 bg-slate-100 p-2 flex items-center justify-between rounded-2xl shadow">
        <div>
          <h1 className="text-2xl font-bold m-2">Projects</h1>
          <p className="text-gray-600 m-2">Total Tasks: {tasks.length}</p>
        </div>
        <div className="p-2 mr-5 bg-white rounded-full shadow-md hover:shadow-lg cursor-pointer">
          <span>
            <Bell className="hover:scale-125" />
          </span>
        </div>
      </div>
    </main>
  );
}
