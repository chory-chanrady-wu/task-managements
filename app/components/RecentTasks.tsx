import {
  CardHeader,
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

type Task = {
  id: string;
  title: string;
  status: string;
  dueDate: string;
  description: string;
};

const statusStyle: Record<string, string> = {
  todo: "bg-gray-100 text-gray-600",
  "in-progress": "bg-orange-100 text-orange-600",
  done: "bg-green-100 text-green-600",
};

export default function RecentTasks({ tasks }: { tasks: Task[] }) {
  return (
    <div className="bg-white rounded-xl p-6 mt-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>
      <Card>
        <ul className="space-y-4">
          {tasks.slice(0, 5).map((task) => (
            <li
              key={task.id}
              className="border-b border-b-gray-300 pb-4 last:border-b-0"
            >
              <div className="flex items-center justify-between mb-2">
                <input type="checkbox" className="mr-2" />
                <CardHeader className="mr-2">#{task.id}</CardHeader>
                <CardTitle className="flex-1">{task.title}</CardTitle>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    statusStyle[task.status]
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <CardDescription>{task.description}</CardDescription>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
