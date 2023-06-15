import {AppColors} from 'constants/AppColors';
import React from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const {width} = Dimensions.get('screen');

const min = 0;
const max = 100;
const step = 1;
const sliderWidth = width - 32 * 2;

interface IProgressBarProps {
  limit: number;
  setLimit: any;
}

const ProgressBar: React.FunctionComponent<IProgressBarProps> = ({
  limit,
  setLimit,
}) => {
  const position = useSharedValue((limit / 100) * sliderWidth);
  const onValueChange = value => {
    setLimit(value.min);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = position.value;
    },
    onActive: (e, ctx: any) => {
      if (ctx.startX + e.translationX < 0) {
        position.value = 0;
      } else if (ctx.startX + e.translationX > sliderWidth) {
        position.value = sliderWidth;
      } else {
        position.value = ctx.startX + e.translationX;
      }
    },
    onEnd: () => {
      runOnJS(onValueChange as any)({
        min:
          min +
          Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
            step,
        max:
          min +
          Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
            step,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: step}],
  }));
  const sliderStyle = useAnimatedStyle(() => ({
    width: position.value,
  }));

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const labelText = useAnimatedProps(() => {
    return {
      text: `${limit}%`,
    };
  });
  return (
    <View style={[styles.sliderContainer, {width: sliderWidth}]}>
      <View style={[styles.sliderBack, {width: sliderWidth}]} />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[sliderStyle, styles.sliderFront]}>
          <Animated.View style={[animatedStyle, styles.thumb]}>
            <AnimatedTextInput
              style={styles.labelText}
              animatedProps={labelText as any}
              editable={false}
              defaultValue={`${limit}%`}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sliderBack: {
    height: 12,
    backgroundColor: AppColors.borderColor,
    borderRadius: 100,
    position: 'relative',
  },
  sliderFront: {
    height: 12,
    backgroundColor: AppColors.primaryColor,
    borderRadius: 100,
    position: 'absolute',
  },
  thumb: {
    right: -27,
    top: -9,
    height: 30,
    width: 54,
    backgroundColor: AppColors.primaryColor,
    borderColor: AppColors.screenColor,
    borderWidth: 3,
    borderRadius: 100,
    position: 'absolute',
  },
  labelText: {
    color: AppColors.screenColor,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    alignSelf: 'center',
    padding: 0,
  },
});
