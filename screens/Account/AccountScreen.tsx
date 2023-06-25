import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ImagesAssets} from 'assets/images/ImagesAssets';
import AppButton from 'components/AppButton';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import {IAccount} from 'interfaces/IAccount';
import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AccountItem from './components/AccountItem';

interface IAccountScreenProps {}

type IconType = {
  child: ReactElement;
};

const AccountScreen: React.FunctionComponent<IAccountScreenProps> = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [wallets, setWallets] = useState<IAccount[]>([]);
  const [totalPrice, setTotalPrice] = useState<any>(null);
  const fetchAccountsData = useRef<any>(null);

  useEffect(() => {
    fetchAccountsData.current = async () => {
      try {
        await firestore()
          .collection('accounts')
          .where('userId', '==', auth().currentUser?.uid)
          .get()
          .then(querySnapshot => {
            let results: any = [];
            let totalPrice = 0;

            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();

              results.push({...data, id: documentSnapshot.id});
            });
            setWallets(results);
            setTotalPrice(totalPrice);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccountsData.current();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <ImageBackground
          source={ImagesAssets.bg}
          style={styles.imageBg}
          resizeMode="stretch">
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Account Balance</Text>
            <Text style={styles.number}>{`$${wallets
              .map(item => item.balance)
              .reduce((prev, cur) => prev + cur, 0)}`}</Text>
          </View>
        </ImageBackground>
        <ScrollView>
          {wallets &&
            wallets.map((item, index) => (
              <AccountItem key={index} data={item} />
            ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Add new wallet"
            color={AppColors.white}
            backgroundColor={AppColors.primaryColor}
            onPress={() => navigation.navigate('AddNewWallet' as never)}
          />
        </View>
      </ScrollView>
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
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 50,
  },
});

export default AccountScreen;
