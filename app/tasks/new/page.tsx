"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ProjectOption {
  id: string;
  name: string;
}

interface Subtask {
  title: string;
  completed: boolean;
}

interface TaskFormData {
  title: string;
  description: string;
  projectId: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string; // yyyy-mm-dd
  tagsInput: string; // comma-separated
  subtasks: Subtask[];
}

export default function NewTaskPage() {
  const router = useRouter();
  const API_BASE =
    "https://json-api-self-server.vercel.app";

  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    projectId: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    tagsInput: "",
    subtasks: [],
  });

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${API_BASE}/projects`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        const opts = (data || []).map((p: any) => ({
          id: String(p.id),
          name: p.name,
        }));
        setProjects(opts);
        setFormData((prev) => ({ ...prev, projectId: opts[0]?.id ?? "" }));
      } catch (e: any) {
        setError(e.message ?? "Error loading projects");
      } finally {
        setLoadingProjects(false);
      }
    }
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSubtask = () => {
    setFormData((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, { title: "", completed: false }],
    }));
  };

  const updateSubtask = (index: number, patch: Partial<Subtask>) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((s, i) =>
        i === index ? { ...s, ...patch } : s
      ),
    }));
  };

  const removeSubtask = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        projectId: formData.projectId,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate,
        tags: formData.tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        subtasks: formData.subtasks.map((s, idx) => ({
          id: String(idx + 1),
          title: s.title.trim(),
          completed: !!s.completed,
        })),
        comments: [],
      };

      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create task");
      }

      router.push("/tasks");
      router.refresh();
    } catch (e: any) {
      setError(e.message ?? "Unexpected error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 text-red-700 p-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
            placeholder="Task title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
            placeholder="Task description"
            rows={4}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project
            </label>
            <select
              name="projectId"
              value={formData.projectId}
              onChange={onChange}
              disabled={loadingProjects || projects.length === 0}
              className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
              required
            >
              {projects.length === 0 ? (
                <option value="">
                  {loadingProjects ? "Loading..." : "No projects"}
                </option>
              ) : (
                projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              name="tagsInput"
              value={formData.tagsInput}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
              placeholder="e.g. design, accessibility"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Subtasks
            </label>
            <Button
              type="button"
              onClick={addSubtask}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 rounded-xl"
            >
              Add Subtask
            </Button>
          </div>
          <div className="space-y-3">
            {formData.subtasks.map((s, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center"
              >
                <input
                  type="text"
                  value={s.title}
                  onChange={(e) =>
                    updateSubtask(idx, { title: e.target.value })
                  }
                  placeholder="Subtask title"
                  className="md:col-span-9 mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
                />
                <label className="md:col-span-2 flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={s.completed}
                    onChange={(e) =>
                      updateSubtask(idx, { completed: e.target.checked })
                    }
                  />
                  Completed
                </label>
                <Button
                  type="button"
                  onClick={() => removeSubtask(idx)}
                  className="md:col-span-1 bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Remove
                </Button>
              </div>
            ))}
            {formData.subtasks.length === 0 && (
              <p className="text-sm text-gray-500">No subtasks added.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl hover:scale-105"
          >
            Cancel
          </Button>
          <Button
            // type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl hover:scale-105"
          >
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
}
