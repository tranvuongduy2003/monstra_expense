import {createContext, useEffect, useState} from 'react';
import {AuthPayload} from 'types/auth.type';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState<any>(null);

  const logIn = async (payload: AuthPayload) => {
    try {
      await auth().signInWithEmailAndPassword(payload.email, payload.password);
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await auth().signOut();
      console.log('User signed out!');
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (payload: AuthPayload) => {
    try {
      await auth().createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      );
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{logIn, logOut, signUp, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
