import {Dimensions} from 'react-native';
const designWidth = 375;

function scale(number: number) {
  let scaleNumber;
  const currentDeviceWidth = Dimensions.get('window').width;
  scaleNumber = (number / designWidth) * currentDeviceWidth;
  return scaleNumber;
}

export default scale;