import React from "react";

interface CreateEventFormProps {
  formData: {
    title: string;
    start: string;
    allDay: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  formData,
  handleChange,
  handleFormSubmit,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Event Title:
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Event Date:
        <input
          type="datetime-local"
          value={formData.start}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default CreateEventForm;
