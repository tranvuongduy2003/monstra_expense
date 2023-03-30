import React from 'react';
import {TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native';

interface IAppButtonProps {
  backgroundColor: string;
  title: string;
  color?: string;
  onPress?: () => void;
}

const {width} = Dimensions.get('screen');

const AppButton: React.FunctionComponent<IAppButtonProps> = ({
  backgroundColor,
  title,
  color = '#FCFCFC',
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      onPress={onPress}>
      <Text style={[styles.title, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AppButton;
