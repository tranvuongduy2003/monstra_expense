import {createContext, useEffect, useState} from 'react';
import {AuthPayload} from 'types/auth.type';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const logIn = async (payload: AuthPayload) => {
    try {
      await auth().signInWithEmailAndPassword(payload.email, payload.password);
      await AsyncStorage.setItem('user', JSON.stringify(auth()?.currentUser));
      setLoggedIn(true);
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await auth().signOut();
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const signUp = async (payload: AuthPayload) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          firestore()
            .collection('users')
            .doc(auth()?.currentUser?.uid)
            .set({
              name: payload.name,
              email: payload.email,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              avatar: null,
              pin: null,
            })
            .catch((error: any) => {
              throw error;
            });
        });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      throw error;
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        signUp,
        user,
        setUser,
        signInWithGoogle,
        sendPasswordResetEmail,
        loggedIn,
        setLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
