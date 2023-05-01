import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {ImagesAssets} from 'assets/images/ImagesAssets';

interface IAccountScreenProps {}

const AccountScreen: React.FunctionComponent<IAccountScreenProps> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={ImagesAssets.bg}></Image>
        <View>
          <Text>Account Balance</Text>
          <Text>$9400</Text>
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
});

export default AccountScreen;
