import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';

interface IProfileScreenProps {}

const ProfileScreen: React.FunctionComponent<IProfileScreenProps> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.avatar}></View>
          <View style={styles.userNameContainer}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.userName}>Nhat Vy</Text>
          </View> 
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.contentButtonTop}>
              <View style={styles.content}>
                <View style={styles.iconContainer}></View>
                <Text style={styles.contentTitle}>Account</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButtonMid}>
              <View style={styles.content}>
                <View style={styles.iconContainer}></View>
                <Text style={styles.contentTitle}>Account</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButtonMid}>
              <View style={styles.content}>
                <View style={styles.iconContainer}></View>
                <Text style={styles.contentTitle}>Account</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButtonBot}>
              <View style={styles.content}>
                <View style={styles.iconContainer}></View>
                <Text style={styles.contentTitle}>Account</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.blankSpace}></View>
        </View>
      </View>
      <View style={styles.bottomContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.cultured,
  },
  topContainer:{
    flex: 707,
    backgroundColor: AppColors.cultured,
  },
  headerContainer: {
    width: scale(325),
    flex: 194,
    backgroundColor: AppColors.cultured,
    alignSelf: 'center',
    flexDirection:'row',
    alignItems: 'center'
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: 40,
    backgroundColor: AppColors.headerTitle,
  },
  userNameContainer: {
    width: 'auto',
    marginTop: scale(13),
    marginLeft: scale(19),
  },
  label: {
    fontSize: scale(14),
    fontFamily: 'Inter-Light',
  },
  userName: {
    fontSize: scale(24),
    fontFamily: 'Inter-SemiBold'
  },
  bodyContainer: {
    width: scale(336),
    flex: 513,
    backgroundColor: AppColors.cultured,
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 356,
    borderRadius: 24,
    backgroundColor: AppColors.white,
  },
  blankSpace: {
    flex: 157,
    backgroundColor: AppColors.cultured,
  },
  contentButtonTop: {
    width: 'auto',
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    borderColor: AppColors.cultured,
    borderBottomWidth: 0.25,
    flex: 1,
    backgroundColor: AppColors.white,
  },
  contentButtonMid: {
    width: 'auto',
    borderColor: AppColors.cultured,
    borderBottomWidth: 0.25,
    flex: 1,
    backgroundColor: AppColors.white,
  },
  contentButtonBot: {
    width: 'auto',
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24,
    flex: 1,
    backgroundColor: AppColors.white,
  },
  content: {
    width: scale(303),
    marginTop: scale(5),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  iconContainer: {
    width: scale(50),
    height: scale(50),
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: AppColors.mistyRose,
    padding: scale(10),
  },
  contentTitle: {
    width: 'auto',
    height: scale(60),
    marginLeft: scale(9),
    fontSize: scale(16),
    textAlignVertical: 'center',
  },
  bottomContainer:{
    flex: 113,
    backgroundColor: AppColors.mistyRose,
  }
});

export default ProfileScreen;
