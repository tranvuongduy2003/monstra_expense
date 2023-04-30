import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet, View, Text, Modal} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {AppColors} from 'constants/AppColors';
import {useNavigation} from '@react-navigation/native';
import Input from 'components/Input';
import AppButton from 'components/AppButton';
import Attachment from 'components/Attachment';
import Toggle from 'components/Toggle';
import Dropdown, {OptionType} from 'components/Dropdown';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import AttachmentBottomSheet from './components/AttachmentBottomSheet';
import RecurringBottomSheet from './components/RecurringBottomSheet';
import Tag from './components/Tag';
import RecurringInfo from './components/RecurringInfo';
import {CheckCircleIcon} from 'react-native-heroicons/solid';
import AddSuccessModal from './components/AddSuccessModal';

interface IExpenseScreenProps {}

const categoryOptions: OptionType[] = [
  {
    title: 'Subscription',
    value: 'subscription',
  },
  {
    title: 'Shopping',
    value: 'shopping',
  },
  {
    title: 'Food',
    value: 'food',
  },
];

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
  const [showAttachment, setShowAttachment] = useState<boolean>(false);
  const [showRecurring, setShowRecurring] = useState<boolean>(false);
  const [showEditRecurring, setShowEditRecurring] = useState<boolean>(false);
  const [showInform, setShowInform] = useState<boolean>(false);

  const attachmentRef = useRef<BottomSheet>(null);
  const recurringRef = useRef<BottomSheet>(null);

  const handleAttachmentSheetChanges = useCallback((index: number) => {
    attachmentRef.current?.snapToIndex(index);
    setShowAttachment(true);
  }, []);

  useEffect(() => {
    if (showEditRecurring) {
      handleRecurringSheetChanges(0);
    }
  }, [showEditRecurring]);

  const handleRecurringSheetChanges = useCallback((index: number) => {
    recurringRef.current?.snapToIndex(index);
    setShowRecurring(true);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.red}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
          position: 'relative',
        }}>
        {(showInform || showAttachment || showRecurring) && (
          <View style={styles.overlay}></View>
        )}
        <ClickOutsideProvider>
          <View style={styles.balanceContainer}>
            <Text style={styles.title}>Balance</Text>
            <Text style={styles.amount}>$00.0</Text>
          </View>
          <View style={styles.setupContainer}>
            <View style={styles.inputContainer}>
              <Dropdown
                options={categoryOptions}
                placeholder="Category"
                zIndex={50}
              />
              <Input placeholder="Description" />
              <Dropdown
                options={walletOptions}
                placeholder="Wallet"
                zIndex={40}
              />
              <Attachment onPress={() => handleAttachmentSheetChanges(0)} />
              <View style={styles.serviceContainer}>
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
              )}
            </View>
            <View>
              <AppButton
                title="Continue"
                backgroundColor={AppColors.primaryColor}
                onPress={() => setShowInform(true)}
              />
            </View>
          </View>
        </ClickOutsideProvider>
      </ScrollView>
      {showAttachment && (
        <AttachmentBottomSheet
          bottomSheetRef={attachmentRef}
          setShow={setShowAttachment}
        />
      )}
      {showRecurring && (
        <RecurringBottomSheet
          bottomSheetRef={recurringRef}
          setShow={setShowRecurring}
        />
      )}
      {showInform && (
        <AddSuccessModal show={showInform} setShow={setShowInform} />
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
