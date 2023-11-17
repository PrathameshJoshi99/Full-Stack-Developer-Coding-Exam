// notekeeper_frontend/src/components/NoteForm.js

import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ onSubmit, initialData = { title: '', content: '' } }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Content:
        <textarea name="content" value={formData.content} onChange={handleChange} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default NoteForm;
