import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import {  FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async() => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    //const credentials = GoogleAuthProvider.credentialFromResult(result)
    const { displayName, uid, photoURL, email } = result.user;
    return {
      ok: true,
      displayName, email, photoURL, uid
    }

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    }
  }
}


export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { photoURL, uid } = resp.user
    await updateProfile(FirebaseAuth.currentUser, {displayName});
    return {
      ok: true,
      photoURL, uid, displayName, email
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}


export const loginWithEmailPassword = async ({email, password}) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)

    const {displayName, uid, photoURL} = resp.user

    return {
      ok: true,
      displayName, uid, photoURL, email
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}