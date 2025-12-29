export default function TaskDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <p>Task ID: {params.id}</p>
    </div>
  );
}
