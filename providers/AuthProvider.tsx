import {createContext, useEffect, useState} from 'react';
import {AuthPayload} from 'types/auth.type';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

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
            })
            .catch((error: any) => {
              console.log(
                'Something went wrong with added user to firestore: ',
                error,
              );
            });
        });
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

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('Something went wrong with sign up: ', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{logIn, logOut, signUp, user, setUser, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );
};
