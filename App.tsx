import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'app/store';
import {AppNavigation} from 'navigation/AppNavigation';
import {Path, Svg} from 'react-native-svg';
import * as shape from 'd3-shape';
import {Dimensions} from 'react-native';

interface IAppProps {}

const {width} = Dimensions.get('window');

const tabWidth = width / 5;
const height = 70;

const left = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(shape.curveBasis)([
  {x: 0, y: 0},
  {x: width, y: 0},
]);

const tab = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(shape.curveBasis)([
  {x: width, y: 0},
  {x: width + 5, y: 0},
  {x: width + 10, y: 10},
  {x: width + 15, y: height},
  {x: width + tabWidth - 15, y: height},
  {x: width + tabWidth - 10, y: 10},
  {x: width + tabWidth - 5, y: 0},
  {x: width + tabWidth, y: 0},
]);

const right = shape
  .line()
  .x(d => d.x)
  .y(d => d.y)([
  {x: width + tabWidth, y: 0},
  {x: width * 2, y: 0},
  {x: width * 2, y: height},
  {x: 0, y: height},
  {x: 0, y: 0},
]);
const d = `${left} ${tab} ${right}`;

const App: React.FunctionComponent<IAppProps> = props => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
