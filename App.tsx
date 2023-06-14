import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'app/store';

import {AppNavigation} from 'navigation/AppNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AuthProvider} from 'providers/AuthProvider';

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = props => {
  const data = Data.GetInstance()
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
