import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {ImagesAssets} from 'assets/images/ImagesAssets';
import scale from 'constants/Responsive';
import AccountIcon from 'assets/svg/AccountIcon';
import AppButton from 'components/AppButton';

interface IAccountScreenProps {}

const AccountScreen: React.FunctionComponent<IAccountScreenProps> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ImageBackground
          source={ImagesAssets.bg}
          style={styles.imageBg}
          resizeMode="stretch">
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Account Balance</Text>
            <Text style={styles.number}>$9400</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.content}>
            <View style={styles.category}>
              <View style={styles.icons}>
                <AccountIcon></AccountIcon>
              </View>
              <Text style={styles.contentTitle}>Wallet</Text>
            </View>
            <Text style={styles.cash}>$400</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.category}>
              <View style={styles.icons}>
                <AccountIcon></AccountIcon>
              </View>
              <Text style={styles.contentTitle}>Chase</Text>
            </View>
            <Text style={styles.cash}>$1000</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.category}>
              <View style={styles.icons}>
                <AccountIcon></AccountIcon>
              </View>
              <Text style={styles.contentTitle}>Citi</Text>
            </View>
            <Text style={styles.cash}>$6000</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.category}>
              <View style={styles.icons}>
                <AccountIcon></AccountIcon>
              </View>
              <Text style={styles.contentTitle}>Paypal</Text>
            </View>
            <Text style={styles.cash}>$2000</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <View style={styles.titleButtonContainer}>
              <Text style={styles.titleButton}>+ Add new wallet</Text>
            </View>
          </TouchableOpacity>
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
  imageBg: {
    width: '100%',
    height: scale(165),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: scale(14),
    color: AppColors.secondaryTextColor,
  },
  number: {
    fontSize: scale(40),
    fontFamily: 'Inter-SemiBold',
    color: AppColors.textColor,
  },
  categoryContainer: {
    width: scale(375),
  },
  content: {
    width: scale(303),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(14),
    // borderBottomWidth: 0.75,
    // borderBottomColor: AppColors.borderColor,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  contentTitle: {
    fontSize: scale(18),
    marginLeft: scale(8),
    color: AppColors.textColor,
    fontFamily: 'Inter-SemiBold',
  },
  cash: {
    fontSize: scale(18),
    marginLeft: scale(8),
    color: AppColors.textColor,
    fontFamily: 'Inter-SemiBold',
  },
  bottomContainer: {
    flexDirection: 'column-reverse',
    height: scale(90),
    //marginBottom: scale(16),
    alignItems: 'center',
  },
  button: {
    width: scale(343),
    height: scale(56),
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: AppColors.primaryColor,
  },
  titleButtonContainer: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: scale(16),
  },
  titleButton: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: AppColors.white,
    marginLeft: scale(10),
  },
});

export default AccountScreen;
