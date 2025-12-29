export async function getTasks() {
  const [tasksRes, projectsRes] = await Promise.all([
    fetch("https://json-api-self-server.vercel.app/tasks", {
      cache: "no-store",
    }),
    fetch("https://json-api-self-server.vercel.app/projects", {
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
