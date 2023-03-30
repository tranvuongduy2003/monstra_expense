import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';

interface IProfileScreenProps {}

const ProfileScreen: React.FunctionComponent<IProfileScreenProps> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.avatar}>
          
        </View>
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
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    marginTop: scale(74),
    marginLeft: scale(34),
    borderRadius: 40,
    backgroundColor: AppColors.introDesc,
  },
  userName: {
    width: 'auto',
    height: 'auto',
    fontWeight: scale(500),
    color: AppColors.introDesc,
  },
});

export default ProfileScreen;
