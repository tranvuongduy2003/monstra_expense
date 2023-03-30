import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import Slider from './components/slider/Slider';
import {SliderItems} from './components/slider/SliderData';
import AppButton from 'components/AppButton';
import {useNavigation} from '@react-navigation/native';

interface ISplashScreenProps {}

const {width, height} = Dimensions.get('screen');

const SplashScreen: React.FunctionComponent<ISplashScreenProps> = props => {
  const [isDisplayIntro, setIsDisplayIntro] = useState<boolean>(false);

  const navigation = useNavigation();

  return (
    <>
      {!isDisplayIntro ? (
        <SafeAreaView>
          <TouchableOpacity
            style={styles.childContainer}
            onPress={() => setIsDisplayIntro(true)}>
            <Text style={styles.splashText}>monstra</Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
          style={{backgroundColor: AppColors.screenColor}}>
          <View style={styles.slider}>
            <Slider data={SliderItems} />
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Sign Up"
              backgroundColor={AppColors.primaryColor}
              onPress={() => navigation.navigate('SignUp' as never)}
            />
            <AppButton
              title="Login"
              backgroundColor={AppColors.lightPurple}
              color={AppColors.primaryColor}
              onPress={() => navigation.navigate('Login' as never)}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
  },
  slider: {
    paddingBottom: 'auto',
  },
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
  buttonContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 40,
  },
});

export default SplashScreen;
