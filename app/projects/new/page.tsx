

// modal
export default function NewProjectPage() {
  return (
    <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
        {/* Form fields for new project creation */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter project name"
                required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter project description"
              rows={4}
            ></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                    type="color"
                    className="mt-1 block w-16 h-10 p-0 border-0"
                    defaultValue="#ff0000"
                />
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >Cancel</button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >Create Project</button>
            </div>
        </form>
    </div>
  );
}