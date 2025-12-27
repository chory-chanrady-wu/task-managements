import React from "react";

export default async function SettingsPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Settings Page</h1>
      <p>This is the Settings page content.</p>
    </div>
  );
}