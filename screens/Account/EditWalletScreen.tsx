import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import {OptionType} from 'components/CustomDropList';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import StatusModal from 'components/StatusModal';
import {AppColors} from 'constants/AppColors';
import {Banks} from 'constants/Banks';
import {Wallets} from 'constants/Wallets';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import AccountTypeItem from 'screens/Auth/components/AccountTypeItem';
import {AccountListType} from 'types/account.type';

interface IEditWalletScreenProps {}

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

const EditWalletScreen: React.FunctionComponent<
  IEditWalletScreenProps
> = props => {
  const route = useRoute();
  const {data}: any = route.params;
  const navigation = useNavigation();

  const [balance, setBalance] = useState<number | null>(data.balance);
  const [name, setName] = useState<string>(data.name);
  const [select, setSelect] = useState<OptionType>(data.type);
  const [typeList, setTypeList] = useState<AccountListType[]>();
  const [typeItem, setTypeItem] = useState<AccountListType>(data.type_item);

  const [showInform, setShowInform] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<any>();
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

  const handleEditAccount = async () => {
    setLoading(true);
    try {
      if (!name || !typeItem || !balance) {
        setStatusInfo({
          status: 'error',
          title: "You're missing something!",
        });
        setLoading(false);
        setShowInform(true);
        return;
      } else {
        await firestore().collection('accounts').doc(data.id).update({
          balance: balance,
          name: name,
          type: select,
          type_item: typeItem,
        });
        setStatusInfo({
          status: 'success',
          title: 'Edit wallet successfully!',
        });
        setShowInform(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setStatusInfo({
        status: 'error',
        title: 'Failed to edit wallet!',
      });
      setLoading(false);
      setShowInform(true);
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
                defaultValue={JSON.stringify(balance)}
                keyboardType="numeric"
                onChangeText={val =>
                  val ? setBalance(parseInt(val)) : setBalance(null)
                }
              />
            </View>
          </View>
          <View style={styles.setupContainer}>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Name"
                defaultValue={name}
                onChangeText={val => setName(val)}
              />
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
                          selected={
                            typeItem.id === item.id &&
                            typeItem.name === item.name
                          }
                          onPress={() => setTypeItem(item)}
                          key={item.id}
                          imageSource={item.image}
                        />
                      );
                    })}
                  </View>
                </>
              )}
            </View>
            <View style={{zIndex: 0}}>
              <AppButton
                loading={loading}
                title="Continue"
                backgroundColor={AppColors.primaryColor}
                onPress={handleEditAccount}
              />
            </View>
          </View>
        </ClickOutsideProvider>
      </ScrollView>
      {showInform && (
        <StatusModal
          status={statusInfo.status}
          show={showInform}
          setShow={setShowInform}
          title={statusInfo.title}
          onClose={() =>
            statusInfo.status === 'success' &&
            navigation.navigate('Account' as never)
          }
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

export default EditWalletScreen;
