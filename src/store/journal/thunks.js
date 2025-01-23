import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { CloudFirestore } from "../../firebase/config"
import { addNewEmptyNote, deleteNoteById, isSavingNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"
import { loadNotes } from "../../helpers/loadNotes"
import { fileUpload } from "../../helpers/fileUpload"

export const startNewNote = () =>{
  return async (dispatch, getState) => {

    dispatch(isSavingNote())

    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const newDoc = doc(collection(CloudFirestore, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))

    dispatch(setActiveNote(newNote));
  }
} 

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    
    const { uid } = getState().auth

    const  notes  = await loadNotes(uid);

    dispatch(setNotes(notes))
  }
}

export const startSavingNote = () => {
  return async (dispatch, getState) => {

    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const newDoc = doc(CloudFirestore, `${uid}/journal/notes/${note.id}`);
    await setDoc(newDoc, note);
    dispatch(updateNote(note));
  }
}

export const startUploadingFiles = (files) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosURLS = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosURLS));
  }
}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;
    const { active: note } = getState().journal
    
    const docRef = doc(CloudFirestore, `${uid}/journal/notes/${note.id}`)

    await deleteDoc(docRef)


    dispatch(deleteNoteById(note.id))
  }
}