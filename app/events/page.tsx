"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Bell, } from "lucide-react";

const today = new Date();
const events = [
  {
    id: 1,
    title: "Team Meeting",
    date: "05-January-2026",
    description: "Monthly team sync-up meeting.",
  },
];
export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="flex-1 p-4 bg-gray-100 min-h-screen">
      <div className="mb-2 bg-white p-2 flex items-center justify-between rounded-2xl shadow">
        <div>
          <h1 className="text-2xl font-bold m-2">Calendar & Events</h1>
          <p className="text-gray-600 m-2">
            Welcome to your calendar and events dashboard.
          </p>
        </div>
        <div className="p-2 mr-5 bg-white rounded-full shadow-md hover:shadow-lg cursor-pointer">
          <span>
            <Bell className="hover:scale-125" />
          </span>
        </div>
      </div>
      <div className="p-2 justify-center items-center flex">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-xl p-4 shadow-md"
          defaultMonth={today}
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <div className="bg-white rounded-xl p-6 shadow-md">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="mb-4 justify-between flex items-center">
                <div>
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-gray-800">{event.description}</p>
                </div>
                <p className="text-gray-600">{event.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No upcoming events.</p>
          )}
        </div>
      </div>
    </main>
  );
}
