type Task = {
  status: "todo" | "in-progress" | "done";
  dueDate: string;
};

export default function Stats({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const overdue = tasks.filter((t)=> t.dueDate < new Date().toISOString() && t.status !== "done").length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
      <Stat title="Total Tasks" value={total} />
      <Stat title="Completed" value={completed} />
      <Stat title="In Progress" value={inProgress} />
      <Stat title="To Do" value={todo} />
      <Stat title="Overdue" value={overdue} />
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  const getColorClass = () => {
    if (title === "Completed") return "bg-green-500";
    if (title === "In Progress") return "bg-blue-500";
    if (title === "To Do") return "bg-yellow-500";
    if (title === "Overdue") return "bg-red-500";
    return "bg-gray-500";
  };

  return (
    <div className={`${getColorClass()} p-6 rounded-2xl shadow-md text-white`}>
      <p className="text-white/90">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
