import React from "react";
import Stats from "./components/Stats";
import RecentTasks from "./components/RecentTasks";
import ProjectSummary from "./components/ProjectSummary";
import { getTasks } from "@/lib/getTasks";
import { Bell } from "lucide-react";

export default async function DashboardPage() {
  const { tasks, projects } = await getTasks();

  return (
    <main className="flex-1 p-4 bg-gray-100 min-h-screen">
      <div className="mb-6 bg-white p-2 flex items-center justify-between rounded-2xl shadow">
        <div>
          <h1 className="text-2xl font-bold m-2">Dashboard</h1>
          <p className="text-gray-600 m-2">
            Welcome back! Here's an overview of your tasks.
          </p>
        </div>
        <div className="p-2 mr-5 bg-white rounded-full shadow-md hover:shadow-lg cursor-pointer">
          <span>
            <Bell className="hover:scale-125" />
          </span>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <ProjectSummary projects={projects} />
        <Stats tasks={tasks} />
      </div>
      <RecentTasks tasks={tasks} />
    </main>
  );
}
