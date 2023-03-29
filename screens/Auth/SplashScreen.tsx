import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ImageSourcePropType,
  FlatList,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import Slider from './components/slider/Slider';

interface ISplashScreenProps {}

const {width, height} = Dimensions.get('screen');

const SplashScreen: React.FunctionComponent<ISplashScreenProps> = props => {
  const [isDisplayIntro, setIsDisplayIntro] = useState<boolean>(false);

  return (
    <SafeAreaView>
      {!isDisplayIntro ? (
        <TouchableOpacity
          style={styles.childContainer}
          onPress={() => setIsDisplayIntro(true)}>
          <Text style={styles.splashText}>monstra</Text>
        </TouchableOpacity>
      ) : (
        <Slider />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  childContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: AppColors.primaryColor,
  },
  splashText: {
    color: '#EEEEEE',
    fontSize: 56,
    fontWeight: '700',
  },
});

export default SplashScreen;
