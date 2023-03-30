import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';

interface IProfileScreenProps {}

const ProfileScreen: React.FunctionComponent<IProfileScreenProps> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.avatar}></View>
        <Text style={styles.userName}>Username</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.cultured,
  },
  headerContainer: {
    width: scale(325),
    height: scale(80),
    marginTop: scale(74),
    marginLeft: scale(34),
    backgroundColor: AppColors.lightPurple,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: 40,
    backgroundColor: AppColors.introDesc,
  },
  userNameBox:{
    width: 'auto',
    marginTop: scale(13),
    marginLeft: scale(19),
    backgroundColor: AppColors.lightPurple,
  },
  userName: {
    fontSize: scale(14),
    marginTop: scale(13),
    marginLeft: scale(19),
    fontFamily: 'Inter-Light',
  },
});

export default ProfileScreen;
