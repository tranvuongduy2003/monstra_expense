import {AppColors} from 'constants/AppColors';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';
import ExceedLimitSlide from './components/ExceedLimitSlide';
import ExpenseSlide from './components/ExpenseSlide';
import IncomeSlide from './components/IncomeSlide';
import LastSlide from './components/LastSlide';

interface IFinancialSplashScreenProps {}

const FinancialSplashScreen: React.FunctionComponent<
  IFinancialSplashScreenProps
> = () => {
  const [slide, setSlide] = useState<number>(0);
  const [bgColor, setBgColor] = useState<string>(AppColors.red);

  useEffect(() => {
    if (slide === 0) setBgColor(AppColors.red);
    else if (slide === 1) setBgColor(AppColors.primaryGreen);
    else setBgColor(AppColors.primaryColor);
  }, [slide]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Swiper
        showsButtons={true}
        renderPagination={index => (
          <View style={[styles.slideBar]}>
            {Array(4)
              .fill(0)
              .map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.sliderBarItem,
                    index === idx && {opacity: 1},
                  ]}></View>
              ))}
          </View>
        )}>
        <ExpenseSlide />
        <IncomeSlide />
        <ExceedLimitSlide />
        <LastSlide />
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slideBar: {
    height: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2.25,
    position: 'absolute',
    top: 19,
    left: 0,
    right: 0,
  },
  sliderBarItem: {
    borderRadius: 8,
    height: 4,
    flex: 1,
    backgroundColor: AppColors.white,
    opacity: 0.24,
  },
});

export default FinancialSplashScreen;
