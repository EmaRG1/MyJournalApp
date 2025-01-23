import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null
}

export const journalSlice = createSlice({
   name: 'journal',
   initialState: 
     initialState
   ,
   reducers: {
     addNewEmptyNote: (state, action) => {
       state.notes.push(action.payload);
       state.isSaving = false;
     },
     setActiveNote: (state,  action ) => {
       state.active = action.payload;
       state.messageSaved = '';
     },
     setNotes: (state,  action  ) => {
        state.notes = action.payload
     },
     setSaving: (state ) => {
       state.isSaving = true
       state.messageSaved = ''
     },
     updateNote: (state, action) => {
       state.isSaving = false;
      //  let index = state.notes.findIndex(note => note.id === action.payload.id);
      //  if (index !== -1) {
      //    state.notes[index] = action.payload;
      //  }
       
       state.notes = state.notes.map(note => {
         if (note.id === action.payload.id) {
           return action.payload
         }
         return note
       })
       state.messageSaved = 'Nota actualizada correctamente'
     },
     deleteNoteById: (state, action) => {
       state.active = null;
       state.notes = state.notes.filter( note => note.id !== action.payload )
     },
     isSavingNote: (state) => {
       state.isSaving=true
     },
     setPhotosToActiveNote: (state, action) => {
       state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
       state.isSaving = false;
     },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });
  }
});


export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  isSavingNote,
  setPhotosToActiveNote,
  clearNotesLogout
} = journalSlice.actions;