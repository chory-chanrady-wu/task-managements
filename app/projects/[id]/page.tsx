"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, MessageCircle, Calendar } from "lucide-react";

interface TaskComment {
  author: string;
  authorInitials?: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  dueDate?: string;
  comments?: TaskComment[];
  assignees?: Array<{ initials: string }>;
}

interface ProjectMember {
  name: string;
  role: string;
  initials: string;
  avatar?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  tasksTotal: number;
  tasksCompleted: number;
  tasksInProgress: number;
  tasksTodo: number;
  tasks: Task[];
  members: ProjectMember[];
}

const TASK_FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "done", label: "Completed" },
];

function formatDate(value: string | null | undefined): string {
  if (!value) return "No due date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [taskFilter, setTaskFilter] = useState("all");

  // Mock data - replace with actual data fetching
  const mockProject: Project = {
    id: params.id,
    name: "Marketing Campaign",
    description:
      "Q1 marketing initiatives and brand awareness campaigns across all digital channels.",
    color: "bg-pink-500",
    tasksTotal: 24,
    tasksCompleted: 18,
    tasksInProgress: 4,
    tasksTodo: 2,
    tasks: [
      {
        id: "1",
        title: "Create social media calendar",
        status: "done",
        comments: [{ author: "JD" }],
        assignees: [{ initials: "JD" }, { initials: "AB" }, { initials: "CD" }],
      },
      {
        id: "2",
        title: "Design email templates",
        status: "in-progress",
        assignees: [{ initials: "AB" }, { initials: "CD" }],
      },
      {
        id: "3",
        title: "Write blog content",
        status: "in-progress",
        assignees: [{ initials: "CD" }],
      },
      {
        id: "4",
        title: "Analytics dashboard setup",
        status: "todo",
        assignees: [{ initials: "JD" }],
      },
      {
        id: "5",
        title: "Partner outreach",
        status: "todo",
        assignees: [{ initials: "AB" }],
      },
    ],
    members: [
      {
        name: "John Doe",
        role: "Lead",
        initials: "JD",
      },
      {
        name: "Alice Brown",
        role: "Designer",
        initials: "AB",
      },
      {
        name: "Charlie Davis",
        role: "Developer",
        initials: "CD",
      },
    ],
  };

  const project = mockProject;

  const filteredTasks = useMemo(() => {
    if (taskFilter === "all") return project.tasks;
    if (taskFilter === "active")
      return project.tasks.filter((t) => t.status !== "done");
    return project.tasks.filter((t) => t.status === "done");
  }, [taskFilter, project.tasks]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: "bg-slate-100 text-slate-700",
      "in-progress": "bg-amber-100 text-amber-700",
      done: "bg-emerald-100 text-emerald-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      todo: "To Do",
      "in-progress": "In Progress",
      done: "Done",
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className={`${project.color} w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl`}
        >
          📁
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <a href="/projects">Projects</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{project.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {project.name}
          </h1>
          <p className="text-gray-600">{project.description}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">
            {project.tasksTotal}
          </div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-emerald-600">
            {project.tasksCompleted}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-amber-600">
            {project.tasksInProgress}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-600">
            {project.tasksTodo}
          </div>
          <div className="text-sm text-gray-600">To Do</div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tasks</h2>

        {/* Task Filters */}
        <div className="flex gap-2 mb-6">
          {TASK_FILTERS.map((filter) => (
            <Button
              key={filter.key}
              variant={taskFilter === filter.key ? "default" : "default"}
              className={`rounded-xl ${
                taskFilter === filter.key
                  ? "bg-blue-500 hover:bg-blue-700 rounded-xl text-white"
                  : ""
              }`}
              onClick={() => setTaskFilter(filter.key)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={task.status === "done"}
                onChange={() => {}}
                className="w-5 h-5 rounded accent-emerald-500"
                aria-label={`Mark ${task.title} as done`}
              />

              <div className="flex-1">
                <h3
                  className={`font-medium ${
                    task.status === "done"
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>
              </div>

              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
                  task.status
                )}`}
              >
                {getStatusLabel(task.status)}
              </span>
{/* 
              {task.comments && task.comments.length > 0 && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MessageCircle className="w-4 h-4" />
                  <span>{task.comments.length}</span>
                </div>
              )} */}

              {task.assignees && task.assignees.length > 0 && (
                <div className="flex -space-x-2">
                  {task.assignees.slice(0, 2).map((assignee, idx) => (
                    <Avatar key={idx} className="w-7 h-7 border-2 border-white">
                      <AvatarFallback className="bg-purple-500 text-white text-xs font-semibold">
                        {assignee.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {task.assignees.length > 2 && (
                    <Avatar className="w-7 h-7 border-2 border-white">
                      <AvatarFallback className="bg-gray-300 text-gray-600 text-xs font-semibold">
                        +{task.assignees.length - 2}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Team Members
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {project.members.length} members
        </p>

        <div className="space-y-4">
          {project.members.map((member) => (
            <div
              key={member.initials}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-purple-500 text-white font-semibold">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
