import { notFound } from "next/navigation";
import { CheckCircle2, Circle, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const API_BASE = "https://json-api-self-server.vercel.app";

interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  tags: string[];
  subtasks: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }>;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

async function getTaskDetails(
  id: string
): Promise<{ task: Task; project: Project | null }> {
  try {
    const taskRes = await fetch(`${API_BASE}/tasks/${id}`, {
      cache: "no-store",
    });
    if (!taskRes.ok) return notFound();

    const task: Task = await taskRes.json();

    let project: Project | null = null;
    if (task.projectId) {
      const projectRes = await fetch(`${API_BASE}/projects/${task.projectId}`, {
        cache: "no-store",
      });
      if (projectRes.ok) {
        project = await projectRes.json();
      }
    }

    return { task, project };
  } catch (error) {
    return notFound();
  }
}

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

const priorityClasses = {
  low: "bg-blue-100 text-blue-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const priorityLabel = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { task, project } = await getTaskDetails(id);

  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const totalSubtasks = task.subtasks.length;

  // Get initials from author name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate color from string
  const getColorFromString = (str: string) => {
    const colors = [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen l mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/tasks" className="hover:text-gray-900">
          Tasks
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Task #{id}</span>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {task.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                statusClasses[task.status]
              }`}
            >
              {statusLabel[task.status]}
            </span>
            <span className="text-sm text-gray-500">
              Created {formatDate(task.dueDate)}
            </span>
            {project && (
              <span className="px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-700 flex items-center gap-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${project.color}`}
                />
                {project.name}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Description
          </h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {task.description}
          </div>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subtasks Section */}
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Subtasks</h2>
            <span className="text-sm text-gray-500">
              {completedSubtasks} of {totalSubtasks} completed
            </span>
          </div>

          <div className="space-y-3">
            {task.subtasks.map((subtask) => (
              <label
                key={subtask.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  readOnly
                  className="w-5 h-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                />
                <span
                  className={`text-gray-900 ${
                    subtask.completed
                      ? "line-through text-gray-400"
                      : "group-hover:text-gray-600"
                  }`}
                >
                  {subtask.title}
                </span>
              </label>
            ))}
          </div>

          <Button
            variant="ghost"
            className="mt-4 text-gray-600 hover:text-gray-900"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add subtask
          </Button>
        </div>
      )}

      {/* Comments Section */}
      {task.comments && task.comments.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
            <span className="text-sm text-gray-500">
              ({task.comments.length})
            </span>
          </div>

          <div className="space-y-6">
            {task.comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarFallback
                    className={`${getColorFromString(
                      comment.author
                    )} text-white font-semibold text-sm`}
                  >
                    {getInitials(comment.author)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDateTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
