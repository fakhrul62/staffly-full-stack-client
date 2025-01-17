import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "./firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  //
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  //create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //observe onAuth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser){
        const userInfo = {email: currentUser.email};
        axiosPublic.post("/jwt", userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        })
      }
      else{
        localStorage.removeItem("access-token");
        setLoading(false);
      }
      // console.log("Obsering Cuurent User", currentUser);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);


  const userInfo = {
    user,
    loading,
    createUser,
    setUser,
    signInUser,
    logOut,
    googleSignIn,
    setLoading
  };
  return (
    <AuthContext.Provider value={userInfo}>
      {loading === "false" ? <span className="loading loading-infinity loading-lg"></span> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
