import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';
import Input from 'components/Input';
import AppButton from 'components/AppButton';
import {useNavigation} from '@react-navigation/native';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import Dropdown, {OptionType} from 'components/Dropdown';
import {AccountListType} from 'types/account.type';
import {Banks} from 'constants/Banks';
import {Wallets} from 'constants/Wallets';
import AccountTypeItem from './components/AccountTypeItem';
import ErrorMessage from 'components/ErrorMessage';
import {TextInput} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import StatusModal from 'components/StatusModal';

interface IAddNewAccountScreenProps {}

const accountTypeOptions: OptionType[] = [
  {
    title: 'Bank',
    value: 'bank',
  },
  {
    title: 'Wallet',
    value: 'wallet',
  },
];

const AddNewAccountScreen: React.FunctionComponent<
  IAddNewAccountScreenProps
> = props => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState<number | null>();
  const [name, setName] = useState<string>();
  const [select, setSelect] = useState<OptionType>();
  const [typeList, setTypeList] = useState<AccountListType[]>();
  const [typeItem, setTypeItem] = useState<AccountListType>();
  const [error, setError] = useState<string>();
  const [showStatus, setShowStaus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAccountTypeChange = useRef<any>(null);

  useEffect(() => {
    handleAccountTypeChange.current = () => {
      if (select?.value === 'bank') {
        setTypeList(Banks);
      } else if (select?.value === 'wallet') {
        setTypeList(Wallets);
      }
    };
    handleAccountTypeChange.current();
  }, [select]);

  const handleAddNewAccount = async () => {
    setLoading(true);
    try {
      if (!name || !typeItem || !balance) {
        setError('You are missing something!');
      } else {
        await firestore()
          .collection('accounts')
          .add({
            userId: auth().currentUser?.uid,
            balance: balance,
            name: name,
            type: select?.value,
            type_item: typeItem,
            createdAt: firestore.Timestamp.fromDate(new Date()),
          });
        setLoading(false);
        navigation.navigate('Set' as never);
      }
    } catch (error) {
      console.log(error);
      setError('Failed to add new account!');
      setShowStaus(true);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.primaryColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
          position: 'relative',
        }}>
        <ClickOutsideProvider>
          <View style={styles.balanceContainer}>
            <Text style={styles.title}>Balance</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.amount}>$</Text>
              <TextInput
                style={styles.amount}
                keyboardType="numeric"
                onChangeText={val =>
                  val ? setBalance(parseInt(val)) : setBalance(null)
                }
              />
            </View>
          </View>
          <View style={styles.setupContainer}>
            <View style={styles.inputContainer}>
              <Input placeholder="Name" onChangeText={val => setName(val)} />
              <Dropdown
                select={select}
                setSelect={setSelect}
                options={accountTypeOptions}
                placeholder="Account Type"
                zIndex={50}
              />
              {select && (
                <>
                  <Text style={styles.typeTitle}>{select?.title}</Text>
                  <View style={styles.typeItems}>
                    {typeList?.map(item => {
                      return (
                        <AccountTypeItem
                          onPress={() => setTypeItem(item)}
                          key={item.id}
                          imageSource={item.image}
                        />
                      );
                    })}
                  </View>
                </>
              )}
              {error && <ErrorMessage title={error} />}
            </View>
            <View style={{zIndex: 0}}>
              <AppButton
                loading={loading}
                title="Continue"
                backgroundColor={AppColors.primaryColor}
                onPress={handleAddNewAccount}
              />
            </View>
          </View>
        </ClickOutsideProvider>
      </ScrollView>
      {showStatus && error && (
        <StatusModal
          status={'error'}
          show={showStatus}
          setShow={setShowStaus}
          title={error}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    paddingHorizontal: 16,
    gap: 13,
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: AppColors.whiteText,
    opacity: 0.64,
  },
  amount: {
    fontWeight: '600',
    fontSize: 64,
    lineHeight: 77,
    color: AppColors.whiteText,
  },
  setupContainer: {
    backgroundColor: AppColors.screenColor,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 40,
    zIndex: 50,
  },
  typeTitle: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },
  typeItems: {
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default AddNewAccountScreen;
