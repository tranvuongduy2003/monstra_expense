import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface IAccountTypeItemProps {
  imageSource: ImageSourcePropType;
  onPress: Function;
}

const {width} = Dimensions.get('screen');

const AccountTypeItem: React.FunctionComponent<IAccountTypeItemProps> = ({
  imageSource,
  onPress,
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    selected && onPress();
  }, [selected]);

  return (
    <TouchableOpacity
      style={[styles.typeItem, selected && styles.selectedItem]}
      onPress={() => setSelected(!selected)}>
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
    width: 24,
    height: 24,
  },
});

export default AccountTypeItem;
