import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "" });
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await axios.get("/api/events");
    setEvents(res.data);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/events", form);
    setForm({ title: "", description: "", date: "", location: "" });
    fetchEvents();
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🎫 Event Registration</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required /><br /><br />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br /><br />
        <input name="date" placeholder="Date" value={form.date} onChange={handleChange} /><br /><br />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} /><br /><br />
        <button type="submit">Add Event</button>
      </form>

      <h2>📋 Events</h2>
      <ul>
        {events.map((e) => (
          <li key={e._id}>
            <b>{e.title}</b> — {e.date} @ {e.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;


