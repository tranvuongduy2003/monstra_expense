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
      <View style={{flex: 1}}>
        {/* <View style={styles.backContainer}></View>
        <View>
          <TouchableOpacity style={styles.addButtonContainer}>
            <AddIcon></AddIcon>
          </TouchableOpacity>
        </View> */}
      </View>
  );
};

const styles = StyleSheet.create({
  // addButtonContainer: {
  //   width: scale(57),
  //   height: scale(57),
  //   alignSelf: 'center',
  //   borderRadius: 40,
  //   zIndex: 10,
  //   backgroundColor: AppColors.lavender,
  // },
  // backContainer: {
  //   position: 'absolute',
  //   backgroundColor: AppColors.primaryTextColor,
  //   borderWidth: 2,
  //   borderRadius: 3,
  //   x: 0,
  //   y: 0,
  //   marginVertical: 0,
  //   bottom: 0,
  //   width: '100%',
  //   height: scale(70),
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingVertical: 10,
  //   paddingHorizontal: 30,
  // },
  // buttonContainer: {
  // width: scale(32),
  // height: scale(48),
  // alignItems: 'center',
  // justifyContent: 'center',
  // marginLeft: scale(26),
  // backgroundColor: AppColors.lavender,
  // },
  // icon: {
  //   width: scale(20),
  //   height: scale(20),
  // },
  // title: {
  //   fontSize: scale(10),
  //   fontFamily: 'Inter-Medium',
  // },
});

export default BottomBar;
