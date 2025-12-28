export async function getTasks() {
  const [tasksRes, projectsRes] = await Promise.all([
    fetch("http://localhost:3001/tasks", {
      cache: "no-store",
    }),
    fetch("http://localhost:3001/projects", {
      cache: "no-store",
    }),
  ]);

  if (!tasksRes.ok || !projectsRes.ok) {
    throw new Error("Failed to fetch tasks or projects");
  }

  const tasks = await tasksRes.json();
  const projects = await projectsRes.json();

  return { tasks, projects };
}
