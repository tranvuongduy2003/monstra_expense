import React, {useContext} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import AccountIcon from 'assets/svg/AccountIcon';
import SettingsIcon from 'assets/svg/SettingsIcon';
import ExportIcon from 'assets/svg/ExportIcon';
import LogoutIcon from 'assets/svg/LogoutIcon';
import EditIcon from 'assets/svg/EditIcon';
import {AuthContext} from 'providers/AuthProvider';

interface IProfileScreenProps {}

const ProfileScreen: React.FunctionComponent<IProfileScreenProps> = props => {
  const {logOut} = useContext(AuthContext) as any;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.avatar}></View>
          <View style={styles.userNameContainer}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.userName}>Nhat Vy</Text>
          </View>
          <TouchableOpacity style={styles.edit}>
            <EditIcon></EditIcon>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.contentButtonTop}>
              <View style={styles.content}>
                <View style={styles.icons}>
                  <AccountIcon></AccountIcon>
                </View>
                <Text style={styles.contentTitle}>Account</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButtonMid}>
              <View style={styles.content}>
                <View style={styles.icons}>
                  <SettingsIcon></SettingsIcon>
                </View>
                <Text style={styles.contentTitle}>Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButtonMid}>
              <View style={styles.content}>
                <View style={styles.icons}>
                  <ExportIcon></ExportIcon>
                </View>
                <Text style={styles.contentTitle}>Export Data</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButtonBot} onPress={logOut}>
              <View style={styles.content}>
                <View style={styles.logoutIC}>
                  <LogoutIcon></LogoutIcon>
                </View>
                <Text style={styles.contentTitle}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.blankSpace}></View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {/* <BottomBar></BottomBar> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.cultured,
  },
  topContainer: {
    flex: 707,
    backgroundColor: AppColors.cultured,
  },
  headerContainer: {
    width: scale(325),
    flex: 194,
    backgroundColor: AppColors.cultured,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: 40,
    backgroundColor: AppColors.mistyRose,
  },
  userNameContainer: {
    width: scale(186),
    marginTop: scale(13),
    marginLeft: scale(19),
    backgroundColor: AppColors.cultured,
  },
  label: {
    fontSize: scale(14),
    fontFamily: 'Inter-Light',
  },
  userName: {
    fontSize: scale(24),
    fontFamily: 'Inter-SemiBold',
  },
  edit: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.cultured,
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
  icons: {
    width: scale(50),
    height: scale(50),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: AppColors.lavender,
    padding: scale(10),
  },
  logoutIC: {
    width: scale(50),
    height: scale(50),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
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
  bottomContainer: {
    flex: 113,
    backgroundColor: AppColors.cultured,
  },
});

export default ProfileScreen;
