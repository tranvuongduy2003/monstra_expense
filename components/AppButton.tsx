import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

interface IAppButtonProps {
  backgroundColor: string;
  title: string;
  color?: string;
}

const {width} = Dimensions.get('screen');

const AppButton: React.FunctionComponent<IAppButtonProps> = ({
  backgroundColor,
  title,
  color = '#FCFCFC',
}) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.title, {color}]}>{title}</Text>
    </View>
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
