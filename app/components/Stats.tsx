type Task = {
  status: "todo" | "in-progress" | "done";
};

export default function Stats({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const overdue = 6; // mock or calculate by dueDate

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
      <Stat title="Total Tasks" value={total}/>
      <Stat title="Completed" value={completed} />
      <Stat title="In Progress" value={inProgress} />
      <Stat title="Overdue" value={overdue} />
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-green-400 p-6 rounded-2xl shadow-md">
      <p className="text-gray-800">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
