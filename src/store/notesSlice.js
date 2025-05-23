import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notes: [],
  selectedNoteId: null,
  status: 'idle', 
  error: null,
  isOnline: navigator.onLine,
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload)
      state.selectedNoteId = action.payload.id
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id)
      if (index !== -1) {
        state.notes[index] = action.payload
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
      if (state.selectedNoteId === action.payload) {
        state.selectedNoteId = null
      }
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSelectedNote: (state, action) => {
      state.selectedNoteId = action.payload
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
} = notesSlice.actions

export default notesSlice.reducer 