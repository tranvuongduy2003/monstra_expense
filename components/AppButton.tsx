import React, {ReactElement} from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface IAppButtonProps {
  backgroundColor?: string;
  title?: string;
  color?: string;
  onPress?: () => void;
  children?: ReactElement;
  loading?: boolean;
}

const {width} = Dimensions.get('screen');

const AppButton: React.FunctionComponent<IAppButtonProps> = ({
  backgroundColor,
  title,
  color = '#FCFCFC',
  onPress = () => {},
  children,
  loading,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        backgroundColor
          ? {backgroundColor: backgroundColor}
          : styles.whiteButton,
        {opacity: loading ? 0.6 : 1},
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{padding: 0, margin: 0}}
          color={AppColors.primaryColor}
        />
      ) : title ? (
        <Text style={[styles.title, {color}]}>{title}</Text>
      ) : (
        children
      )}
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
