import { getTasks } from "@/lib/getTasks";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import AllProject from "../components/AllProject";
import Link from "next/link";

export default async function DashboardPage() {
  const { projects } = await getTasks();

  return (
    <main className="flex-1 p-4 bg-gray-100 min-h-screen">
      <div className="mb-2 bg-white p-2 flex items-center justify-between rounded-2xl shadow">
        <div>
          <h1 className="text-2xl font-bold m-2">Projects</h1>
          <p className="text-gray-600 m-2">Total Projects: {projects.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-2 mr-5 bg-white rounded-full shadow-md hover:shadow-lg cursor-pointer">
            <span>
              <Bell className="hover:scale-125" />
            </span>
          </div>
          <Link href="/projects/new">
            <Button className="mr-5 rounded-xl bg-green-500 hover:bg-green-600 hover:text-white hover:scale-105">
              New Project
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <AllProject projects={projects} />
      </div>
    </main>
  );
}
