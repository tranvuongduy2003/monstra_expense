import React, {useContext, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import AccountIcon from 'assets/svg/AccountIcon';
import SettingsIcon from 'assets/svg/SettingsIcon';
import ExportIcon from 'assets/svg/ExportIcon';
import LogoutIcon from 'assets/svg/LogoutIcon';
import EditIcon from 'assets/svg/EditIcon';
import {AuthContext} from 'providers/AuthProvider';
import ProfileOption from './components/ProfileOption';
import {useNavigation} from '@react-navigation/native';

interface IProfileScreenProps {}

const ProfileScreen: React.FunctionComponent<IProfileScreenProps> = props => {
  const navigation: any = useNavigation();
  const {user, logOut} = useContext(AuthContext) as any;
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const splittedName = user?.name?.split(' ') || '';
    setName(
      (splittedName[splittedName.length - 2] || '') +
        ' ' +
        (splittedName[splittedName.length - 1] || ''),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}></View>
        </View>
        <View style={styles.userNameContainer}>
          <Text style={styles.label}>Username</Text>
          <Text numberOfLines={1} style={styles.userName}>
            {name}
          </Text>
        </View>
        <TouchableOpacity style={styles.edit}>
          <EditIcon></EditIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.contentContainer}>
          <ProfileOption icon={<AccountIcon />} title="Account" onPress={() => navigation.navigate('Account' as never)}/>
          <ProfileOption icon={<SettingsIcon />} title="Settings" />
          <ProfileOption
            icon={<LogoutIcon />}
            title="Logout"
            onPress={logOut}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.cultured,
    paddingHorizontal: 20,
  },
  headerContainer: {
    backgroundColor: AppColors.cultured,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 75,
    paddingBottom: 40,
  },
  avatarContainer: {
    width: scale(84),
    height: scale(84),
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 82,
    borderWidth: 2,
    borderColor: '#AD00FF',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 84,
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
    backgroundColor: AppColors.cultured,
    alignSelf: 'center',
  },
  contentContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: AppColors.white,
  },
});

export default ProfileScreen;
