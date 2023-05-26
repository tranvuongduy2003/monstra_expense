import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {AppColors} from 'constants/AppColors';
import {useNavigation} from '@react-navigation/native';
import Input from 'components/Input';
import AppButton from 'components/AppButton';
import Attachment from 'components/Attachment';
import Toggle from 'components/Toggle';
import Dropdown from 'components/Dropdown';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import AttachmentBottomSheet from './components/AttachmentBottomSheet';
import RecurringBottomSheet from './components/RecurringBottomSheet';
import Tag from './components/Tag';
import RecurringInfo from './components/RecurringInfo';
import StatusModal from '../../components/StatusModal';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from 'providers/AuthProvider';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {OptionType} from 'types/option.type';
import {incomeCategoryOptions} from 'constants/Category';

interface IIncomeScreenProps {}

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

const IncomeScreen: React.FunctionComponent<IIncomeScreenProps> = props => {
  const navigation: any = useNavigation();
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
  const [wallet, setWallet] = useState<OptionType>();
  const [desc, setDesc] = useState<string>();
  const [attachment, setAttachment] = useState<any>();

  const attachmentRef = useRef<BottomSheet>(null);
  // const recurringRef = useRef<BottomSheet>(null);

  const handleAttachmentSheetChanges = useCallback((index: number) => {
    attachmentRef.current?.snapToIndex(index);
    setShowAttachment(true);
  }, []);

  const handleAddNewIncome = async () => {
    setLoading(true);
    try {
      if (!balance || !title || !category || !wallet || !attachment) {
        throw new Error();
      }

      const reference = storage().ref('income/' + attachment.fileName);
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
          wallet: wallet,
          attachment: attachmentURL,
          type: 'income',
          createdAt: firestore.Timestamp.fromDate(new Date()),
        });
      setStatusInfo({
        status: 'success',
        title: 'Income has been successfully added!',
      });
      setLoading(false);
      setShowInform(true);
    } catch (error) {
      console.log(error);
      setStatusInfo({
        status: 'error',
        title: 'Add new income unsuccessfully!',
      });
      setLoading(false);
      setShowInform(true);
    }
  };

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
        style={{backgroundColor: AppColors.primaryGreen}}
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
                options={incomeCategoryOptions}
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
              <Dropdown
                options={walletOptions}
                placeholder="Wallet"
                zIndex={40}
                select={wallet}
                setSelect={setWallet}
              />
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
                onPress={handleAddNewIncome}
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
    zIndex: 50,
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

export default IncomeScreen;
