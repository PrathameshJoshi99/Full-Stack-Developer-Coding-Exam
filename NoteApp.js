// notekeeper_frontend/src/components/NoteApp.js

import React, { useState } from 'react';
import axios from 'axios';
import NoteList from './NoteList';
import NoteForm from './NoteForm';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = () => {
    axios.get('/api/notes/')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching notes:', error));
  };

  const handleCreateNote = (data) => {
    axios.post('/api/notes/', data)
      .then(() => {
        fetchNotes();
        setEditingNote(null);
      })
      .catch(error => console.error('Error creating note:', error));
  };

  const handleUpdateNote = (data) => {
    axios.put(`/api/notes/${editingNote.id}/`, data)
      .then(() => {
        fetchNotes();
        setEditingNote(null);
      })
      .catch(error => console.error('Error updating note:', error));
  };

  const handleDeleteNote = (id) => {
    axios.delete(`/api/notes/${id}/`)
      .then(fetchNotes)
      .catch(error => console.error('Error deleting note:', error));
  };

  return (
    <div>
      <h1>NoteKeeper</h1>
      <NoteList
        notes={notes}
        onEdit={(note) => setEditingNote(note)}
        onDelete={handleDeleteNote}
      />
      {editingNote ? (
        <NoteForm
          onSubmit={handleUpdateNote}
          initialData={{ title: editingNote.title, content: editingNote.content }}
        />
      ) : (
        <NoteForm onSubmit={handleCreateNote} />
      )}
    </div>
  );
};

export default NoteApp;
