import {AppColors} from 'constants/AppColors';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface IErrorMessageProps {
  title: string;
}

const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = ({title}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{`*${title}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    padding: 10,
  },
  errorText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: AppColors.red,
  },
});

export default ErrorMessage;
