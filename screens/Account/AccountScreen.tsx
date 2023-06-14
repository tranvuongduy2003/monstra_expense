import React, {useState, useRef, useEffect, ReactElement} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  TruckIcon,
} from 'react-native-heroicons/solid';
import {AppColors} from 'constants/AppColors';
import {ImagesAssets} from 'assets/images/ImagesAssets';
import scale from 'constants/Responsive';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Phase from './components/Phase';
import Momo from 'assets/svg/Momo';
import Vietcombank from 'assets/svg/Vietcombank';

interface IAccountScreenProps {}

type IconType = {
  child: ReactElement;
};

const icons = new Map<string, IconType>();
icons.set('Vietcombank', {
  child: <Vietcombank></Vietcombank>,
});

icons.set('Momo', {
  child: <Momo></Momo>,
});

const AccountScreen: React.FunctionComponent<IAccountScreenProps> = props => {
  const [wallets, setWallets] = useState<Map<string, Array<any>>>();
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
            let results = new Map<string, Array<any>>();
            let totalPrice = 0;

            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();
              let key = '';
              
              const items = {
                id: documentSnapshot.id,
                userId: auth().currentUser?.uid,
                icon: icons.get(data.type_item.name)?.child,
                title: data.name,
                price: `${'$'}${data.balance}`,
              };
              totalPrice = data.balance + totalPrice;
              
              const filteredArray = results.get(key) || [];
              results.set(key, [...filteredArray, items]);
            });
            Data.GetInstance().setAccBalance(totalPrice.toString())
            setWallets(results);
            setTotalPrice(totalPrice);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccountsData.current();
  });

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
            <Text style={styles.number}>${totalPrice}</Text>
          </View>
        </ImageBackground>
      <ScrollView>
        {Array.from(wallets?.keys() || []).map(key => (
          <Phase key={key} wallets={wallets?.get(key as string)} />
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={styles.titleButtonContainer}>
            <Text style={styles.titleButton}>+ Add new wallet</Text>
          </View>
        </TouchableOpacity>
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
