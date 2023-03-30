import React from 'react';
import {SliderItems} from './SliderData';
import {StyleSheet, View, Animated, Dimensions} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface IPaginationProps {
  data: any;
  scrollX: Animated.Value;
  index: number;
}

const {width, height} = Dimensions.get('screen');

const Pagination: React.FunctionComponent<IPaginationProps> = ({
  data,
  scrollX,
  index,
}) => {
  return (
    <View style={styles.container}>
      {data.map((_: any, idx: number) => {
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
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
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
