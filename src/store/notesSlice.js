import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  currentNote: null,
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      console.log('Setting notes in store:', action.payload);
    },

  },
});

export const {
  setNotes,

  clearNotes
} = notesSlice.actions;

export default notesSlice.reducer; 