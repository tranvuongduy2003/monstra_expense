import React from 'react';
import {AppColors} from 'constants/AppColors';
import {ScrollView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import scale from 'constants/Responsive';


interface IDateCateButtonProps {}

const DateCateButton: React.FunctionComponent<IDateCateButtonProps> = props => {

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button}></TouchableOpacity>
        <TouchableOpacity style={styles.button}></TouchableOpacity>
        <TouchableOpacity style={styles.button}></TouchableOpacity>
        <TouchableOpacity style={styles.button}></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(346),
    height: scale(34),
    backgroundColor: 'red',
    borderRadius: 16,
    flexDirection: 'row',
  },
  button: {
    width: scale(90),
    height: '100%',
    backgroundColor: 'blue',
    borderRadius: 16,
  }
});

export default DateCateButton;
