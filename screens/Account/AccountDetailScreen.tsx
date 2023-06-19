import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import EditIcon from 'assets/svg/EditIcon';
import {AppColors} from 'constants/AppColors';
import {icons} from 'constants/CategoryIcon';
import scale from 'constants/Responsive';
import {ITransaction} from 'interfaces/Transaction';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowsRightLeftIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import Phase from 'screens/Transaction/components/Phase';
import HeaderBar from 'screens/layout/HeaderBar';

interface IAccountDetailScreenProps {}

const AccountDetailScreen: React.FunctionComponent<
  IAccountDetailScreenProps
> = () => {
  const route = useRoute();
  const {data}: any = route.params;
  const isFocused = useIsFocused();
  const navigation: any = useNavigation();

  const [transactions, setTransactions] =
    useState<Map<string, Array<ITransaction>>>();

  const fetchTransactionsData = useRef<any>(null);

  useEffect(() => {
    fetchTransactionsData.current = async () => {
      try {
        await firestore()
          .collection('transactions')
          .where('userId', '==', auth().currentUser?.uid)
          .where('wallet.id', '==', data.id)
          .get()
          .then(querySnapshot => {
            let results = new Map<string, Array<any>>();
            let dateOptions: any;

            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();
              const itemDate: Date = data.createdAt.toDate();
              const now = new Date();
              let key = '';

              if (itemDate.getFullYear() !== now.getFullYear()) {
                key = itemDate.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });
              } else {
                key = itemDate.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                });
              }

              const items = {
                id: documentSnapshot.id,
                userId: auth().currentUser?.uid,
                icon:
                  data.type !== 'transfer' ? (
                    icons.get(data.category?.value || '')?.child
                  ) : (
                    <ArrowsRightLeftIcon
                      color={AppColors.primaryBlue}
                      fontSize={30}
                    />
                  ),
                title:
                  data.type !== 'transfer' ? data.category.title : 'Transfer',
                desc: data.title,
                price: data.balance,
                time: itemDate.toLocaleTimeString('vi-VI', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                iconBgColor:
                  data.type !== 'transfer'
                    ? icons.get(data.category?.value || '')?.bgColor
                    : AppColors.primaryBlue100,
                type: data.type,
              };

              const filteredArray = results.get(key) || [];
              results.set(key, [...filteredArray, items]);
            });
            setTransactions(results);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactionsData.current();
    return fetchTransactionsData.current;
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        name="Detail account"
        icon={
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditWallet', {
                data: data,
              })
            }>
            <EditIcon color={AppColors.black} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View>
          <View style={styles.walletContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={data.type_item.image}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.contentTitle}>{data.name}</Text>
          </View>
        </View>
        <ScrollView>
          {Array.from(transactions?.keys() || []).map(key => (
            <Phase
              key={key}
              timeTitle={key as string}
              transactions={transactions?.get(key as string)}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  walletContainer: {
    marginTop: scale(30),
    alignItems: 'center',
    marginBottom: scale(50),
    gap: 8,
  },
  contentTitle: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
    color: AppColors.primaryTextColor,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: AppColors.borderColor,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default AccountDetailScreen;
