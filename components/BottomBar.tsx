import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';

import HomeIcon from 'assets/svg/HomeIcon';
import TransactionIcon from 'assets/svg/TransactionIcon';
import BudgetIcon from 'assets/svg/BudgetIcon';
import UserIcon from 'assets/svg/UserIcon';
import AddIcon from 'assets/svg/AddIcon';

interface IBottomBarProps {}
const BottomBar: React.FunctionComponent<IBottomBarProps> = ({}) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.addButtonContainer}>
          <AddIcon></AddIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 0.8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#D34251"
  },
  addButtonContainer: {
    width: scale(57),
    height: scale(57),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: AppColors.lavender,
  },
  buttonContainer: {
  width: scale(32),
  height: scale(48),
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: scale(26),
  backgroundColor: AppColors.lavender,
  },
  icon: {
    width: scale(20),
    height: scale(20),
  },
  title: {
    fontSize: scale(10),
    fontFamily: 'Inter-Medium',
  },
});

export default BottomBar;
