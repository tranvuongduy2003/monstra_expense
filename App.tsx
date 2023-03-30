import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'app/store';
import {AppNavigation} from 'navigation/appNavigation';
import ProfileScreen from 'screens/Auth/ProfileScreen';

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = props => {
  return (
    <Provider store={store}>
      <ProfileScreen/>
    </Provider>
  );
};

export default App;
