import BottomSheet from '@gorhom/bottom-sheet';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import Attachment from 'components/Attachment';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import {AppColors} from 'constants/AppColors';
import {AuthContext} from 'providers/AuthProvider';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import StatusModal from '../../components/StatusModal';
import AttachmentBottomSheet from './components/AttachmentBottomSheet';

interface ITransferScreenProps {}

const TransferScreen: React.FunctionComponent<ITransferScreenProps> = props => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext) as any;
  const [showAttachment, setShowAttachment] = useState<boolean>(false);
  const [showInform, setShowInform] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<any>();

  const [balance, setBalance] = useState<number | null>();
  const [title, setTitle] = useState<string>();
  const [from, setFrom] = useState<any>();
  const [to, setTo] = useState<any>();
  const [desc, setDesc] = useState<string>();
  const [attachment, setAttachment] = useState<any>();

  const attachmentRef = useRef<BottomSheet>(null);
  const fetchAccountData = useRef<any>(null);

  const handleAttachmentSheetChanges = useCallback((index: number) => {
    attachmentRef.current?.snapToIndex(index);
    setShowAttachment(true);
  }, []);

  useEffect(() => {
    fetchAccountData.current = async () => {
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
            setOptions(results);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccountData.current();
  }, []);

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      if (!balance || !title || !from || !to || !attachment) {
        setStatusInfo({
          status: 'error',
          title: "You're missing something!",
        });
        setLoading(false);
        setShowInform(true);
        return;
      }

      if (!from.balance || from.balance < balance) {
        setStatusInfo({
          status: 'error',
          title: "Your account doesn't have enough capacity!",
        });
        setLoading(false);
        setShowInform(true);
        return;
      }

      const reference = storage().ref('transfer/' + attachment.fileName);
      await reference.putFile(attachment.uri);
      const attachmentURL = await reference.getDownloadURL();

      await firestore()
        .collection('transactions')
        .add({
          userId: user?.uid,
          balance: balance,
          title: title,
          desc: desc,
          from: {id: from.id, title: from.title, value: from.value},
          to: {id: to.id, title: to.title, value: to.value},
          attachment: attachmentURL,
          type: 'transfer',
          createdAt: firestore.Timestamp.fromDate(new Date()),
        });

      await firestore()
        .collection('accounts')
        .doc(from.id)
        .update({
          balance: from.balance - balance,
        });

      await firestore()
        .collection('accounts')
        .doc(to.id)
        .update({
          balance: to.balance + balance,
        });

      setStatusInfo({
        status: 'success',
        title: 'Transfer has been successfully added!',
      });
      setLoading(false);
      setShowInform(true);
    } catch (error) {
      console.log(error);
      setStatusInfo({
        status: 'error',
        title: 'Add new transfer unsuccessfully!',
      });
      setLoading(false);
      setShowInform(true);
    }
  };

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
      <View
        style={[
          {
            backgroundColor: AppColors.primaryBlue,
            flexGrow: 1,
            justifyContent: 'flex-end',
            position: 'relative',
          },
        ]}>
        {showAttachment && <View style={styles.overlay}></View>}
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
              <View style={styles.transfer}>
                <Dropdown
                  options={options}
                  placeholder="From"
                  zIndex={40}
                  select={from}
                  setSelect={setFrom}
                />
                <Dropdown
                  options={options}
                  placeholder="To"
                  zIndex={40}
                  select={to}
                  setSelect={setTo}
                />
              </View>
              <Input
                placeholder="Description"
                name="Description"
                onChangeText={setDesc}
              />
              <Attachment
                onPress={() => handleAttachmentSheetChanges(0)}
                attachment={attachment}
              />
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
      </View>
      {showAttachment && (
        <AttachmentBottomSheet
          bottomSheetRef={attachmentRef}
          setShow={setShowAttachment}
          handleChoosePhoto={handleChoosePhoto}
          handleTakePhoto={handleTakePhoto}
        />
      )}
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
  transfer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    zIndex: 100,
  },
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

export default TransferScreen;
