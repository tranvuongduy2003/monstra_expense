import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'app/store';
import {AppNavigation} from 'navigation/appNavigation';

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = props => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
