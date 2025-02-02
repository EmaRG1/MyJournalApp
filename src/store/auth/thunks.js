
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/provider"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const checkingGoogleSignIn = () => {
  return async (dispatch) => {

    dispatch(checkingCredentials())

    const result = await signInWithGoogle()

    if (!result.ok) return dispatch(logout(result.errorMessage));
    
    dispatch(login(result))
  }
}

export const checkingEmailPasswordSignIn = ({email, password, displayName}) => {
  return async (dispatch) => {

    dispatch(checkingCredentials())

    const {ok ,uid, photoURL, errorMessage}= await registerUserWithEmailPassword({ email, password, displayName })
    if (!ok) return dispatch(logout({errorMessage}));
    dispatch(login({ uid, email, displayName, photoURL }));
  }
}

export const startLoginWithEmailPassword = ({email, password}) => {
  return async (dispatch) => {

    dispatch(checkingCredentials())

    const {ok, uid, displayName, photoURL, errorMessage} = await loginWithEmailPassword({ email, password })
    if (!ok) return dispatch(logout( { errorMessage } ))
    dispatch(login( {uid, email, displayName, photoURL} ))
  }
}

export const startLogout = () => {
  return async (dispatch) => {

    await logoutFirebase();
    dispatch(logout())
  }
}