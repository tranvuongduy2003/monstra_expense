import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface ISliderItemProps {
  imageSource: ImageSourcePropType;
  title: string;
  desc: string;
}

const {width, height} = Dimensions.get('screen');

const SliderItem: React.FunctionComponent<ISliderItemProps> = ({
  imageSource,
  title,
  desc,
}) => {
  return (
    //Illustration
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
    //Title
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 40,
  },
  image: {
    width: width - 64,
    height: width - 64,
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    color: AppColors.primaryTextColor,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 39,
    textAlign: 'center',
    marginBottom: 16,
  },
  desc: {
    color: AppColors.secondaryTextColor,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },
});

export default SliderItem;
