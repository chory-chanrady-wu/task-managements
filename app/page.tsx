import React from "react";
import Stats from "./components/Stats";
import RecentTasks from "./components/RecentTasks";
import { getTasks } from "@/lib/getTasks";

export default async function DashboardPage() {
  const tasks = await getTasks();

  return (
    <main className="flex-1 p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Stats tasks={tasks} />
      <RecentTasks tasks={tasks} />
    </main>
  );
}
