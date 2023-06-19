import BottomSheet from '@gorhom/bottom-sheet';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import Attachment from 'components/Attachment';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import {AppColors} from 'constants/AppColors';
import {expenseCategoryOptions} from 'constants/Category';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OptionType} from 'types/option.type';
import StatusModal from '../../components/StatusModal';
import AttachmentBottomSheet from './components/AttachmentBottomSheet';

interface IEditExpenseScreenProps {}

const EditExpenseScreen: React.FunctionComponent<
  IEditExpenseScreenProps
> = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {transaction}: any = route.params;

  const [showAttachment, setShowAttachment] = useState<boolean>(false);
  // const [showRecurring, setShowRecurring] = useState<boolean>(false);
  // const [showEditRecurring, setShowEditRecurring] = useState<boolean>(false);
  const [showInform, setShowInform] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(transaction.title);
  const [category, setCatogory] = useState<OptionType>(transaction.category);
  const [wallets, setWallets] = useState<OptionType[]>();
  const [wallet, setWallet] = useState<OptionType>(transaction.wallet);
  const [desc, setDesc] = useState<string>(transaction.desc);
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
      if (!title || !category || !wallet) {
        setStatusInfo({
          status: 'error',
          title: "You're missing something!",
        });
        setLoading(false);
        setShowInform(true);
        return;
      }

      const payload: any = {
        title: title,
        category: category,
        desc: desc,
        wallet: {id: wallet.id, title: wallet.title, value: wallet.value},
        updatedAt: firestore.Timestamp.fromDate(new Date()),
      };

      if (attachment) {
        const reference = storage().ref('expense/' + attachment.fileName);
        await reference.putFile(attachment.uri);
        const attachmentURL = await reference.getDownloadURL();
        payload.attachment = attachmentURL;
      }

      await firestore()
        .collection('transactions')
        .doc(transaction.id)
        .update(payload);
      setStatusInfo({
        status: 'success',
        title: 'Expense has been successfully updated!',
      });

      setLoading(false);
      setShowInform(true);
    } catch (error) {
      console.log(error);
      setStatusInfo({
        status: 'error',
        title: 'Update expense unsuccessfully!',
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
                balance: data.blance,
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
              <Text style={styles.amount}>{transaction.balance}</Text>
            </View>
          </View>
          <View style={styles.setupContainer}>
            <View style={styles.inputContainer}>
              <Input
                defaultValue={title}
                placeholder="Title"
                name="Title"
                onChangeText={setTitle}
              />
              <Dropdown
                options={expenseCategoryOptions}
                placeholder="Category"
                zIndex={50}
                select={category}
                setSelect={setCatogory}
              />
              <Input
                defaultValue={desc}
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
                attachment={attachment || transaction.attachment}
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

export default EditExpenseScreen;
