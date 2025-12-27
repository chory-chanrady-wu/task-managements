import React from "react";
import { Button } from "@/components/ui/button";

export default async function page() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      <div>
        <h2 className="bg-gray-500 p-3 text-white rounded-sm text-center text-xl font-bold">
          Tasks Dashboard
        </h2>
      </div>
      <div>
        <Button className="bg-green-500 p-2 mt-2 hover:bg-green-600">New Task</Button>
      </div>
    </div>
  );
}
