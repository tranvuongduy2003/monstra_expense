import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
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

interface IExpenseScreenProps {}

interface ITagProps {
  title: string;
  desc: string;
}

const categoryOptions = [
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

const walletOptions = [
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
  const [show, setShow] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
    setShow(true);
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
        {show && <View style={styles.overlay}></View>}
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
              <Attachment onPress={() => handleSheetChanges(0)} />
              <View style={styles.serviceContainer}>
                <Tag title="Repeat" desc="Repeat transaction" />
                <View>
                  <Toggle />
                </View>
              </View>
              <View style={styles.serviceContainer}>
                <Tag title="Frequency" desc="Yearly - December 29" />
                <Tag title="End After" desc="29 December 2025" />
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <AppButton
                title="Continue"
                backgroundColor={AppColors.primaryColor}
                onPress={() => navigation.navigate('Set' as never)}
              />
            </View>
          </View>
        </ClickOutsideProvider>
      </ScrollView>
      {show && (
        <AttachmentBottomSheet
          bottomSheetRef={bottomSheetRef}
          setShow={setShow}
        />
      )}
    </SafeAreaView>
  );
};

const Tag: React.FunctionComponent<ITagProps> = ({title, desc}) => {
  return (
    <View style={styles.toggleTextContainer}>
      <Text style={styles.toggleTitle}>{title}</Text>
      <Text style={styles.toggleDesc}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000000',
    opacity: 0.6,
    position: 'absolute',
    flex: 1,
    top: -100,
    paddingTop: -100,
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
  toggleTitle: {
    color: AppColors.primaryTextColor,
    lineHeight: 19,
    fontSize: 16,
    fontWeight: '500',
  },
  toggleDesc: {
    color: AppColors.secondaryTextColor,
    lineHeight: 16,
    fontSize: 13,
    fontWeight: '500',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: AppColors.violet,
    borderRadius: 99,
  },
  editButtonText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: AppColors.primaryColor,
  },
});

export default ExpenseScreen;
