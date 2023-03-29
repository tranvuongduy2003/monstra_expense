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
    height,
    alignItems: 'center',
  },
  image: {
    flex: 0.6,
    width: '100%',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    color: AppColors.introTitle,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 39,
    textAlign: 'center',
    marginBottom: 16,
  },
  desc: {
    color: AppColors.introDesc,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },
});

export default SliderItem;
