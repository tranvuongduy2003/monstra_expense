import {AppColors} from 'constants/AppColors';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {CheckIcon} from 'react-native-heroicons/outline';

interface ICheckboxProps {
  checked: boolean;
  setChecked: any;
}

const Checkbox: React.FunctionComponent<ICheckboxProps> = ({
  checked,
  setChecked,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: !checked ? '#FFFFFF' : AppColors.primaryColor},
      ]}
      onPress={setChecked}>
      {checked && <CheckIcon color={AppColors.screenColor} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: AppColors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Checkbox;
