"use client";

import { useRouter } from "next/navigation";
import { Calendar, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Project {
  id: string;
  slug?: string;
  name: string;
  description: string;
  color: string;
  status: "active" | "completed" | "on-hold";
  tasksTotal: number;
  tasksCompleted: number;
  dueDate?: string;
  members?: Array<{ initials: string }>;
}

export default function AllProject({
  projects = [],
}: {
  projects?: Project[];
}) {
  const router = useRouter();

  const extractColorClass = (color: string) => {
    // Color is already a full class string like "bg-pink-500"
    return color || "bg-gray-500";
  };

  const handleProjectClick = (projectId: string | undefined) => {
    if (projectId) {
      router.push(`/projects/${projectId}`);
    }
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => {
        const dotColor = extractColorClass(project.color);
        const progressPercent = Math.round(
          (project.tasksCompleted / project.tasksTotal) * 100
        );

        return (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Header with title and menu */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`w-3 h-3 rounded-full ${dotColor} mt-1.5`}
                ></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
              </div>
            </div>

            {/* Progress section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Progress
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {project.tasksCompleted}/{project.tasksTotal} tasks
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${dotColor} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Footer with members and date */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              {project.members && project.members.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((member, idx) => (
                      <Avatar
                        key={idx}
                        className="w-7 h-7 border-2 border-white"
                      >
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white text-xs font-semibold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members.length > 3 && (
                      <Avatar className="w-7 h-7 border-2 border-white">
                        <AvatarFallback className="bg-gray-300 text-gray-600 text-xs font-semibold">
                          +{project.members.length - 3}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              )}
              {project.dueDate && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Due Date<span>{project.dueDate}</span>
                </div>
              )}
              {project.status && !project.dueDate && (
                <div className="text-sm text-gray-600">{project.status}</div>
              )}
            </div>
          </div>
        );
      })}

      {projects.length === 0 && (
        <div className="text-center text-gray-500 border rounded-xl bg-white py-12">
          No projects to display.
        </div>
      )}
    </div>
  );
}
