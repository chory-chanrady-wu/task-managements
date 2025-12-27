export async function getTasks() {
  const res = await fetch("http://localhost:3001/tasks", {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
}
