import {store} from 'app/store';
import React from 'react';
import {Provider} from 'react-redux';

import {AppNavigation} from 'navigation/AppNavigation';
import {AuthProvider} from 'providers/AuthProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = props => {
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
