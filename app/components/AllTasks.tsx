"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

const statusClasses = {
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-amber-100 text-amber-700",
  done: "bg-emerald-100 text-emerald-700",
};

const statusLabel = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

function formatDate(value: string | null | undefined): string {
  if (!value) return "No due date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate?: string;
  comments?: Array<{ author: string }>;
  projectId?: string;
}

interface ProjectRef {
  id: string;
  name: string;
  color?: string; // Tailwind class like bg-pink-500
}

export default function AllTasks({
  tasks = [],
  projects = [],
}: {
  tasks?: Task[];
  projects?: ProjectRef[];
}) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");

  const projectMap = useMemo(() => {
    const map = new Map<string, { name: string; color?: string }>();
    projects.forEach((p) =>
      map.set(String(p.id), { name: p.name, color: p.color })
    );
    return map;
  }, [projects]);

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [filter, tasks]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? "default" : "destructive"}
            className={`min-w-[96px] rounded-xl ${
              filter === f.key ? "bg-blue-500 hover:bg-blue-600 text-white" : ""
            }`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
        <span className="ml-auto text-sm text-gray-500">
          {filteredTasks.length} of {tasks.length} tasks
        </span>
      </div>

      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => router.push(`/tasks/${task.id}`)}
            className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <input
              type="checkbox"
              defaultChecked={task.status === "done"}
              aria-label={`Mark ${task.title} as done`}
              className="mt-1 h-4 w-4 accent-emerald-500"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-base font-semibold text-gray-900">
                  {task.title}
                </h3>
                <p
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusClasses[task.status] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {statusLabel[task.status] || task.status}
                </p>
                {task.projectId && projectMap.has(String(task.projectId)) && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 flex items-center gap-1`}
                    title="Project"
                  >
                    {/* Small dot with project color if available */}
                    {projectMap.get(String(task.projectId))?.color && (
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          projectMap.get(String(task.projectId))!.color
                        }`}
                      />
                    )}
                    {projectMap.get(String(task.projectId))?.name ||
                      "Unknown Project"}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {task.comments && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{task.comments.length}</span>
                  {task.comments.length > 0 && (
                    <span className="text-xs bg-purple-700 rounded-xl p-1 px-2 text-white">
                      by {task.comments[0].author}
                    </span>
                  )}
                </div>
              )}
              {task.dueDate && (
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center text-gray-500 border rounded-xl bg-white py-6">
            No tasks in this view.
          </div>
        )}
      </div>
    </div>
  );
}
