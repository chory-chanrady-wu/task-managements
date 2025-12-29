"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#ff0000",
    status: "active",
    dueDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
            placeholder="Enter project name"
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
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
            placeholder="Enter project description"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-1 block w-16 h-10 p-0 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
          >
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
