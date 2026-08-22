import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,

} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.init";
import { useEffect, useState } from "react";


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const[loading, setLoading] = useState(true);


  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = ()=>{
     setLoading(true)
    return signInWithPopup(auth, googleProvider)
    
  }

  const logOut = ()=>{
    setLoading(true)
    signOut(auth)
  }



useEffect(()=>{
  const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
    setLoading(false)
   setUser(currentUser)
  })
  return ()=>{
    unSubscribe();
  }
}, [])

  const AuthInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
  };
  return <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
