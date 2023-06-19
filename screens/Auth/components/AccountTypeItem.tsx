import {AppColors} from 'constants/AppColors';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface IAccountTypeItemProps {
  imageSource: ImageSourcePropType;
  onPress: any;
  selected: boolean;
}

const {width} = Dimensions.get('screen');

const AccountTypeItem: React.FunctionComponent<IAccountTypeItemProps> = ({
  imageSource,
  onPress,
  selected,
}) => {
  return (
    <TouchableOpacity
      style={[styles.typeItem, selected && styles.selectedItem]}
      onPress={onPress}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  typeItem: {
    width: (width - 56) / 4,
    height: 40,
    backgroundColor: AppColors.borderColor,
    borderColor: AppColors.borderColor,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: AppColors.primaryColor100,
    borderColor: AppColors.primaryColor,
  },
  image: {
    width: '70%',
    height: '70%',
  },
});

export default AccountTypeItem;
