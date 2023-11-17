import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  allDay: {
    type: Boolean,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },

});

const Calendar =
  mongoose.models.Calendar || mongoose.model("Calendar", calendarSchema);

export default Calendar;
