import { collection, getDocs } from "firebase/firestore/lite";
import { CloudFirestore } from "../firebase/config";

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('el UID del usuario no existe');

  const collectionRef = collection(CloudFirestore, `${uid}/journal/notes`)
  const docs = await getDocs(collectionRef)

  let notes = [];

  docs.forEach(doc => notes.push({ id: doc.id, ...doc.data() }));

  return notes; 

}