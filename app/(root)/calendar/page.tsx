"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Transition } from "@headlessui/react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import EventForm from "@/components/forms/createEventForm";
import deleteEventModal from "@/components/forms/deleteEventModal";

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

// Imports inchangés

export default function Home() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    allDay: false,
    id: 0,
  });
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    allDay: false,
  });

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

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }

  function handleDelete() {
    setAllEvents(allEvents.filter((event) => Number(event.id) !== Number(idToDelete)));
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleDeleteEvent() {
    // Supprimer l'événement avec l'idToDelete
    if (idToDelete !== null) {
      setAllEvents(allEvents.filter((event) => Number(event.id) !== Number(idToDelete)));
      setIdToDelete(null);
      setShowDeleteModal(false);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const event = {
      ...formData,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
    setShowModal(false);
  }

  function handleCreateEventClick() {
    setFormData({
      title: "",
      start: "",
      allDay: false,
    });
    setShowModal(true);
  }

  return (
    <>
      <nav className="flex justify-between mb-15 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-violet-700">Agenda</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-18">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek",
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
          <div
            id="draggable-el"
            className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-2/3 bg-violet-50"
          >
            <h1 className="font-bold text-lg text-center">Create Event</h1>
            <button
              className="border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white hover:bg-gray-100"
              onClick={handleCreateEventClick}
            >
              Create Event
            </button>
            <Transition.Root show={showModal} as="div">
              <form onSubmit={handleFormSubmit}>
                <label>
                  Event Title:
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </label>
                <label>
                  Event Date:
                  <input
                    type="datetime-local"
                    value={formData.start}
                    onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                  />
                </label>
                <button type="submit">Add Event</button>
              </form>
            </Transition.Root>
          </div>
        </div>

        <Transition.Root show={showDeleteModal} as="div">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as="div"
                className="fixed inset-0 transition-opacity"
                onClick={handleCloseModal}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </Transition.Child>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

              <Transition.Child
                as="div"
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              >
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Delete Event
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this event? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={handleDeleteEvent}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Transition.Root>

        {/* ... (rest of the code unchanged) */}
      </main>
    </>
  );
}
