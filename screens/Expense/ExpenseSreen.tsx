import BottomSheet from '@gorhom/bottom-sheet';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import axios from 'axios';
import AppButton from 'components/AppButton';
import Attachment from 'components/Attachment';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import {AppColors} from 'constants/AppColors';
import {expenseCategoryOptions} from 'constants/Category';
import {AuthContext} from 'providers/AuthProvider';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OptionType} from 'types/option.type';
import StatusModal from '../../components/StatusModal';
import AttachmentBottomSheet from './components/AttachmentBottomSheet';

interface IExpenseScreenProps {}

const walletOptions: OptionType[] = [
  {
    title: 'Momo',
    value: 'momo',
  },
  {
    title: 'Banking',
    value: 'banking',
  },
  {
    title: 'Cash',
    value: 'cash',
  },
];

const ExpenseScreen: React.FunctionComponent<IExpenseScreenProps> = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const {token} = useAppSelector(state => state.token);
  const {isNotify} = useAppSelector(state => state.notify);

  const {user} = useContext(AuthContext) as any;
  const [showAttachment, setShowAttachment] = useState<boolean>(false);
  // const [showRecurring, setShowRecurring] = useState<boolean>(false);
  // const [showEditRecurring, setShowEditRecurring] = useState<boolean>(false);
  const [showInform, setShowInform] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const [balance, setBalance] = useState<number | null>();
  const [title, setTitle] = useState<string>();
  const [category, setCatogory] = useState<OptionType>();
  const [wallets, setWallets] = useState<OptionType[]>();
  const [wallet, setWallet] = useState<OptionType>();
  const [desc, setDesc] = useState<string>();
  const [attachment, setAttachment] = useState<any>();

  const attachmentRef = useRef<BottomSheet>(null);
  const handleFetchWallets = useRef<any>(null);
  // const recurringRef = useRef<BottomSheet>(null);

  const handleAttachmentSheetChanges = useCallback((index: number) => {
    attachmentRef.current?.snapToIndex(index);
    setShowAttachment(true);
  }, []);

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      if (!balance || !title || !category || !wallet || !attachment) {
        setStatusInfo({
          status: 'error',
          title: "You're missing something!",
        });
        setLoading(false);
        setShowInform(true);
        return;
      }

      if (!wallet.balance || wallet.balance < balance) {
        setStatusInfo({
          status: 'error',
          title: "Your account doesn't have enough capacity!",
        });
        setLoading(false);
        setShowInform(true);
        return;
      }

      const reference = storage().ref('expense/' + attachment.fileName);
      await reference.putFile(attachment.uri);
      const attachmentURL = await reference.getDownloadURL();

      await firestore()
        .collection('transactions')
        .add({
          userId: user?.uid,
          balance: balance,
          title: title,
          category: category,
          desc: desc,
          wallet: {id: wallet.id, title: wallet.title, value: wallet.value},
          attachment: attachmentURL,
          type: 'expense',
          createdAt: firestore.Timestamp.fromDate(new Date()),
        })
        .then(expenseSnapshot => {
          const expenseId = expenseSnapshot.id;

          firestore()
            .collection('budgets')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                const data = documentSnapshot.data();
                const itemDate = data.createdAt.toDate();
                const now = new Date();
                if (
                  data.category.value === category.value &&
                  now.getMonth() === itemDate.getMonth() &&
                  now.getFullYear() === itemDate.getFullYear()
                ) {
                  const expenses = data.expenses;

                  if (data.isReceiveAlert && isNotify) {
                    const totalExpense = expenses
                      .map(item => item.balance)
                      .reduce((prev, cur) => prev + cur, 0);

                    if (data.budget <= totalExpense + balance) {
                      // Thông báo exceed limit
                      axios
                        .post(`http://10.0.126.180:8080/send-group-message`, {
                          title: `${category.title}: Expense limitation`,
                          body: "You've exceed the limit",
                          token: token,
                        })
                        .catch(function (error) {
                          console.log(
                            '🚀 ~ file: ExpenseSreen.tsx:157 ~ handleAddExpense ~ error:',
                            error,
                          );
                        });
                    } else if (
                      data.budget * (data.limit / 100) <=
                      totalExpense + balance
                    ) {
                      // Hiển thị thông báo
                      axios
                        .post(`http://10.0.126.180:8080/send-group-message`, {
                          title: `${category.title}: Expense limitation`,
                          body: 'You are going to reach your budget limit',
                          token: token,
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    }
                  }

                  expenses.push({
                    id: expenseId,
                    balance: balance,
                  });
                  documentSnapshot.ref.update({
                    expenses: expenses,
                  });
                }
              });
            });
        });

      await firestore()
        .collection('accounts')
        .doc(wallet.id)
        .update({
          balance: wallet.balance - balance,
        });

      setStatusInfo({
        status: 'success',
        title: 'Expense has been successfully added!',
      });
      setShowInform(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setStatusInfo({
        status: 'error',
        title: 'Failed to add new expense!',
      });
      setLoading(false);
      setShowInform(true);
    }
  };

  useEffect(() => {
    handleFetchWallets.current = async () => {
      try {
        await firestore()
          .collection('accounts')
          .where('userId', '==', auth().currentUser?.uid)
          .get()
          .then(querySnapshot => {
            const results: any = [];
            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();
              results.push({
                id: documentSnapshot.id,
                value: data.name,
                title: data.name,
                balance: data.balance,
              });
            });
            setWallets(results);
          });
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchWallets.current();
  }, [isFocused]);

  // useEffect(() => {
  //   if (showEditRecurring) {
  //     handleRecurringSheetChanges(0);
  //   }
  // }, [showEditRecurring]);

  // const handleRecurringSheetChanges = useCallback((index: number) => {
  //   recurringRef.current?.snapToIndex(index);
  //   setShowRecurring(true);
  // }, []);

  const handleTakePhoto = async () => {
    try {
      const {assets}: any = await launchCamera({
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
      });
      setAttachment(assets[0]);
      setShowAttachment(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChoosePhoto = async () => {
    try {
      const {assets}: any = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
      });
      setAttachment(assets[0]);
      setShowAttachment(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.red}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
          position: 'relative',
        }}>
        {/* {(showInform || showAttachment || showRecurring) && ( */}
        {(showInform || showAttachment) && <View style={styles.overlay}></View>}
        <ClickOutsideProvider>
          <View style={styles.balanceContainer}>
            <Text style={styles.title}>How much?</Text>
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
              <Input placeholder="Title" name="Title" onChangeText={setTitle} />
              <Dropdown
                options={expenseCategoryOptions}
                placeholder="Category"
                zIndex={50}
                select={category}
                setSelect={setCatogory}
              />
              <Input
                placeholder="Description"
                name="Description"
                onChangeText={setDesc}
              />
              {wallets && (
                <Dropdown
                  options={wallets}
                  placeholder="Wallet"
                  zIndex={40}
                  select={wallet}
                  setSelect={setWallet}
                />
              )}
              <Attachment
                onPress={() => handleAttachmentSheetChanges(0)}
                attachment={attachment}
              />
              {/* <View style={styles.serviceContainer}>
                <Tag title="Repeat" desc="Repeat transaction" />
                <View>
                  <Toggle
                    on={showEditRecurring}
                    setOn={() => setShowEditRecurring(!showEditRecurring)}
                  />
                </View>
              </View>
              {showEditRecurring && (
                <RecurringInfo
                  editable={true}
                  onEdit={() => handleRecurringSheetChanges(0)}
                />
              )} */}
            </View>
            <View>
              <AppButton
                title="Continue"
                backgroundColor={AppColors.primaryColor}
                onPress={handleAddExpense}
                loading={loading}
              />
            </View>
          </View>
        </ClickOutsideProvider>
      </ScrollView>
      {showAttachment && (
        <AttachmentBottomSheet
          bottomSheetRef={attachmentRef}
          setShow={setShowAttachment}
          handleChoosePhoto={handleChoosePhoto}
          handleTakePhoto={handleTakePhoto}
        />
      )}
      {/* {showRecurring && (
        <RecurringBottomSheet
          bottomSheetRef={recurringRef}
          setShow={setShowRecurring}
        />
      )} */}
      {showInform && (
        <StatusModal
          status={statusInfo.status}
          show={showInform}
          setShow={setShowInform}
          title={statusInfo.title}
          onClose={() => statusInfo.status === 'success' && navigation.goBack()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000000',
    opacity: 0.6,
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
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
    zIndex: 100,
  },
  toggleTextContainer: {
    gap: 4,
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ExpenseScreen;
