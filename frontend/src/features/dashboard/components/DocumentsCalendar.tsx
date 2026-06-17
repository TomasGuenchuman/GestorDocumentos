"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

import "./documents-calendar.css";

type CalendarEvent = {
  date: string; // "YYYY-MM-DD"
  title: string;
};

type DocumentsCalendarProps = {
  events: CalendarEvent[];
};

export default function DocumentsCalendar({ events }: DocumentsCalendarProps) {
  return (
    <div className="documents-calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        events={events}
        height="100%"
        contentHeight="100%"
        expandRows={true}
        dayMaxEvents={2}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        buttonText={{
          today: "Hoy",
        }}
      />
    </div>
  );
}
