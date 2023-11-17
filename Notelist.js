// notekeeper_frontend/src/components/NoteList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('/api/notes/')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.title} - {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
