import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';

interface INotiScreenProps {}

const NotiScreen: React.FunctionComponent<INotiScreenProps> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.noti}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerNoti}>Shopping budget has exceeds the..</Text>
          <Text style={styles.detailNoti}>Your Shopping budget has exceeds the lim....</Text>
        </View>
        <View style={styles.numContainer}>
          <Text style={styles.num}>19.30</Text>
        </View>
      </View>
      <View style={styles.noti}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerNoti}>Utilities budget has exceeds the..</Text>
          <Text style={styles.detailNoti}>Your Utilities budget has exceeds the limit....</Text>
        </View>
        <View style={styles.numContainer}>
          <Text style={styles.num}>19.30</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  noti: {
    width: scale(375),
    height: scale(71),
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.75,
    borderBottomColor: AppColors.cultured,
  },
  titleContainer:{
    height: scale(51),
    marginLeft: scale(10),
    marginRight: scale(3),
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  headerNoti: {
    fontSize: scale(16),
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: AppColors.titleColor,
  },
  detailNoti: {
    fontSize: scale(13),
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: AppColors.secondaryTextColor,
  },
  numContainer: {
    width: scale(51),
    height: scale(63),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  num:{
    fontSize: scale(13),
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: AppColors.secondaryTextColor,
    textAlign: 'center',
  },
});

export default NotiScreen;
