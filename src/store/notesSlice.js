import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  notes: [],
  selectedNoteId: null,
  status: 'idle', 
  error: null,
  isOnline: navigator.onLine,
  lastSynced: null
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: uuidv4(),
        title: action.payload.title || 'Untitled Note',
        content: action.payload.content || '',
        updatedAt: new Date().toISOString(),
        synced: false
      }
      state.notes.unshift(newNote)
      state.selectedNoteId = newNote.id
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id)
      if (index !== -1) {
        state.notes[index] = {
          ...state.notes[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
          synced: false
        }
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
      if (state.selectedNoteId === action.payload) {
        state.selectedNoteId = state.notes[0]?.id || null
      }
    },
    setNotes: (state, action) => {
      state.notes = action.payload.sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt)
      )
    },
    setSelectedNote: (state, action) => {
      state.selectedNoteId = action.payload
    },
     setSelectedNoteId: (state, action) => {
      state.selectedNoteId = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload
    },
    setLastSynced: (state, action) => {
      state.lastSynced = action.payload
    },
    markNoteAsSynced: (state, action) => {
      const note = state.notes.find(n => n.id === action.payload)
      if (note) {
        note.synced = true
      }
    }
  },
})

export const {
  addNote,
  updateNote,
  deleteNote,
  setNotes,
  setSelectedNote,
  setStatus,
  setError,
  setOnlineStatus,
  setSelectedNoteId,
  setLastSynced,
  markNoteAsSynced
} = notesSlice.actions

export default notesSlice.reducer 