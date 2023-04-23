import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'app/store';

import { AppNavigation } from 'navigation/appNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = props => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
