// CalendarComponent.tsx
import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core/index.js";

interface CalendarComponentProps {
  allEvents: Event[];
  handleDateClick: (arg: { date: Date; allDay: boolean }) => void;
  addEvent: (data: DropArg) => void;
  handleDeleteModal: (data: { event: { id: string } }) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  allEvents,
  handleDateClick,
  addEvent,
  handleDeleteModal,
}) => {
  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          return { title, id, start };
        },
      });
    }
  }, []);

  return (
    <div className="col-span-8">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineWook, dayGridMonth,timeGridWeek",
        }}
        events={allEvents as EventSourceInput}
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        dateClick={handleDateClick}
        drop={(data) => addEvent(data)}
        eventClick={(data) => handleDeleteModal(data)}
      />
    </div>
  );
};

export default CalendarComponent;
