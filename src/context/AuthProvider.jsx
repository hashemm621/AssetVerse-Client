import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import auth from '../firebase/firebase.init';

const AuthProvider = ({children}) => {
const [user,setUser] = useState(null)
const [loading, setLoading] = useState(true);

const createUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}

const signIn = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
}

const logOut =  () => {
  setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
      
    })
    
  }


   // onAuthStateChange
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      
      setUser(currentUser)
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])



const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile
}


    return (
        <AuthContext value={authInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;