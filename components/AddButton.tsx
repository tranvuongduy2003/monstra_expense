import {AppColors} from 'constants/AppColors';
import React, {useEffect, useRef, useState} from 'react';
import {PlusIcon} from 'react-native-heroicons/outline';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import IncomeIcon from 'assets/svg/IncomeIcon';
import ExpenseIcon from 'assets/svg/ExpenseIcon';
import MoneyExchangeIcon from 'assets/svg/MoneyExchangeIcon';
import {useNavigation} from '@react-navigation/native';

interface IAddButtonProps {}

const AddButton: React.FunctionComponent<IAddButtonProps> = props => {
  const {navigate} = useNavigation();
  const [opened, setOpened] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 150,
      delay: 0,
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Animated.View
          style={[
            styles.item,
            {
              backgroundColor: AppColors.primaryGreen,
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -62],
                  }),
                },
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -62],
                  }),
                },
              ],
            },
          ]}>
          <IncomeIcon />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Animated.View
          style={[
            styles.item,
            {
              backgroundColor: AppColors.primaryBlue,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -120],
                  }),
                },
              ],
            },
          ]}>
          <MoneyExchangeIcon />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Expense' as never)}>
        <Animated.View
          style={[
            styles.item,
            {
              backgroundColor: AppColors.red,
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 62],
                  }),
                },
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -62],
                  }),
                },
              ],
            },
          ]}>
          <ExpenseIcon />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setOpened(!opened)}>
        <Animated.View
          style={[
            styles.moreButton,
            {
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                  }),
                },
              ],
            },
          ]}>
          <PlusIcon
            color={AppColors.screenColor}
            style={{width: '100%', height: '100%'}}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 50,
    transform: [{translateY: -23}],
  },
  moreButton: {
    width: 62,
    height: 62,
    borderRadius: 50,
    backgroundColor: AppColors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  item: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 62,
    height: 62,
    backgroundColor: AppColors.primaryColor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddButton;
