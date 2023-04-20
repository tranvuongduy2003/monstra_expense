import React, {ReactElement} from 'react';
import {TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface IAppButtonProps {
  backgroundColor?: string;
  title?: string;
  color?: string;
  onPress?: () => void;
  children?: ReactElement;
}

const {width} = Dimensions.get('screen');

const AppButton: React.FunctionComponent<IAppButtonProps> = ({
  backgroundColor,
  title,
  color = '#FCFCFC',
  onPress = () => {},
  children,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        backgroundColor
          ? {backgroundColor: backgroundColor}
          : styles.whiteButton,
      ]}
      onPress={onPress}>
      {title ? <Text style={[styles.title, {color}]}>{title}</Text> : children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 17,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  whiteButton: {
    borderWidth: 1,
    borderColor: AppColors.borderColor,
  },
});

export default AppButton;
