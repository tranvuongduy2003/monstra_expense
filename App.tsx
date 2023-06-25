import messaging from '@react-native-firebase/messaging';
import {store} from 'app/store';
import {AppNavigation} from 'navigation/AppNavigation';
import {AuthProvider} from 'providers/AuthProvider';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Provider} from 'react-redux';

interface IAppProps {}

PushNotification.createChannel(
  {
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  PushNotification.localNotification({
    message: remoteMessage?.notification?.body,
    title: remoteMessage?.notification?.title,
    channelId: 'channel-id',
  });
});

const App: React.FunctionComponent<IAppProps> = props => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        message: remoteMessage?.notification?.body,
        title: remoteMessage?.notification?.title,
        channelId: 'channel-id',
      });
    });

    return unsubscribe;
  }, []);

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default App;
