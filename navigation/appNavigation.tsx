import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {AuthContext} from 'providers/AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export interface IAppNavigationProps {}

export function AppNavigation(props: IAppNavigationProps) {
  const {loggedIn, user, setUser} = useContext(AuthContext) as any;
  const [initializing, setInitializing] = useState<boolean>(true);

  const onAuthStateChanged = user => {
    firestore()
      .collection('users')
      .doc(user?.uid)
      .onSnapshot(documentSnapshot => {
        setUser({uid: user?.uid, ...documentSnapshot.data()});
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
