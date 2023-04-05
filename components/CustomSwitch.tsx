import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';

interface ICustomSwitchProps {}

const CustomSwitch: React.FunctionComponent<ICustomSwitchProps> = ({}) => {
  const [isOn, setIsOn] = useState(true);
  function toggleSwitch() {
    setIsOn(isOn => !isOn);
  }
  return (
    <TouchableOpacity
      style={[
        styles.switch,
        isOn
          ? {
              justifyContent: 'flex-end',
              backgroundColor: AppColors.primaryColor,
            }
          : {
              justifyContent: 'flex-start',
              backgroundColor: AppColors.lightPurple,
            },
      ]}
      activeOpacity={1}
      onPress={toggleSwitch}>
      <View style={styles.inner}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: scale(60),
    height: scale(30),
    backgroundColor: 'grey',
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 2,
  },
  inner: {
    width: scale(26),
    height: scale(26),
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 8,
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
});

export default CustomSwitch;
