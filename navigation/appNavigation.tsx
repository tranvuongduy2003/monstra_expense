import React, {useContext, useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {AuthContext} from 'providers/AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export interface IAppNavigationProps {}

export function AppNavigation(props: IAppNavigationProps) {
  const {loggedIn, setLoggedIn, user, setUser} = useContext(AuthContext) as any;
  const [initializing, setInitializing] = useState<boolean>(true);

  const handleFetchUser = useRef<any>();

  useEffect(() => {
    handleFetchUser.current = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user && user !== '') {
          setUser(user);
          setLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchUser.current();
    return handleFetchUser.current;
  }, []);

  const onAuthStateChanged = user => {
    firestore()
      .collection('users')
      .doc(user?.uid)
      .onSnapshot(documentSnapshot => {
        const userData = {uid: user?.uid, ...documentSnapshot.data()};
        setUser(userData);
        AsyncStorage.setItem('user', JSON.stringify(userData));
      });
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user && loggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}