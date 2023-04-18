import {AppColors} from 'constants/AppColors';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Animated, Touchable} from 'react-native';

interface IToggleProps {}

const Toggle: React.FunctionComponent<IToggleProps> = props => {
  const [on, setOn] = useState<boolean>(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: on ? 1 : 0,
      duration: 150,
      delay: 0,
      useNativeDriver: false,
    }).start();
  }, [on, animation]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [AppColors.primaryColor100, AppColors.primaryColor],
          }),
        },
      ]}
      onTouchEnd={() => setOn(!on)}>
      <Animated.View
        style={[
          styles.child,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 18],
                }),
              },
            ],
          },
        ]}></Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 42,
    justifyContent: 'center',
    height: 24,
    borderRadius: 24,
    backgroundColor: AppColors.primaryColor,
    padding: 2,
  },
  child: {
    zIndex: 50,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: AppColors.screenColor,
  },
});

export default Toggle;
