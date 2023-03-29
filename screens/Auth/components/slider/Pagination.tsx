import React from 'react';
import {SliderItems} from './SliderData';
import {StyleSheet, View, Animated, Dimensions} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface IPaginationProps {
  scrollX: Animated.Value;
  index: number;
}

const {width} = Dimensions.get('screen');

const Pagination: React.FunctionComponent<IPaginationProps> = ({
  scrollX,
  index,
}) => {
  return (
    <View style={styles.container}>
      {SliderItems.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotSize = scrollX.interpolate({
          inputRange,
          outputRange: [8, 16, 8],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            AppColors.lightPurple,
            AppColors.primaryColor,
            AppColors.lightPurple,
          ],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotSize, height: dotSize, backgroundColor},
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: AppColors.lightPurple,
    borderRadius: 99,
    marginHorizontal: 8,
  },
});

export default Pagination;
