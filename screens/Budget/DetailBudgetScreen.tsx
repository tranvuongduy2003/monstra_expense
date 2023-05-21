import {AppColors} from 'constants/AppColors';
import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppButton from 'components/AppButton';
import {useNavigation} from '@react-navigation/native';
import {
  ExclamationCircleIcon,
  ShoppingBagIcon,
  TrashIcon,
} from 'react-native-heroicons/solid';
import HeaderBar from 'screens/layout/HeaderBar';
import RemoveConfirmationBottomSheet from './components/RemoveConfirmationBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';

interface IDetailBudgetScreenProps {}

const DetailBudgetScreen: React.FunctionComponent<
  IDetailBudgetScreenProps
> = props => {
  const [showRemoveConfirmation, setShowRemoveConfirmation] =
    useState<boolean>(false);
  const navigation = useNavigation();

  const removeConfirmationRef = useRef<BottomSheet>(null);

  const handleRemoveConfirmationSheetChanges = useCallback((index: number) => {
    removeConfirmationRef.current?.snapToIndex(index);
    setShowRemoveConfirmation(true);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <HeaderBar
          name="Detail Budget"
          backgroundColor={AppColors.screenColor}
          color={AppColors.primaryTextColor}
          icon={
            <TouchableOpacity
              onPress={() => handleRemoveConfirmationSheetChanges(0)}>
              <TrashIcon color={AppColors.primaryTextColor} />
            </TouchableOpacity>
          }
        />
        {showRemoveConfirmation && <View style={styles.overlay} />}
        <View style={styles.body}>
          {/* TAG */}
          <View style={styles.tag}>
            <View style={styles.tagIcon}>
              <ShoppingBagIcon color={AppColors.yellow} fontSize={18} />
            </View>
            <Text style={styles.tagTitle}>Shopping</Text>
          </View>
          {/* TITLE */}
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>Remaining</Text>
            <Text style={styles.amount}>$0</Text>
          </View>
          {/* PROGRESS BAR */}
          <View style={styles.baseBar}>
            <View style={styles.progressBar} />
          </View>
          {/* WARNING */}
          <View style={styles.warningContainer}>
            <ExclamationCircleIcon color={AppColors.screenColor} />
            <Text style={styles.warningText}>You've exceed the limit!</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Edit"
            backgroundColor={AppColors.primaryColor}
            onPress={() => navigation.navigate('EditBudget' as never)}
          />
        </View>
      </ScrollView>
      {showRemoveConfirmation && (
        <RemoveConfirmationBottomSheet
          bottomSheetRef={removeConfirmationRef}
          setShow={setShowRemoveConfirmation}
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
  body: {
    alignItems: 'center',
    padding: 16,
    gap: 32,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  tag: {
    padding: 16,
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    backgroundColor: AppColors.whiteText,
  },
  tagIcon: {
    padding: 7,
    borderRadius: 8,
    backgroundColor: AppColors.yellow100,
  },
  tagTitle: {
    color: AppColors.primaryTextColor,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
    color: AppColors.primaryTextColor,
  },
  amount: {
    fontWeight: '600',
    fontSize: 64,
    lineHeight: 77,
    color: AppColors.primaryTextColor,
  },
  baseBar: {
    height: 12,
    flex: 1,
    width: '100%',
    backgroundColor: AppColors.borderColor,
    borderRadius: 12,
    position: 'relative',
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: AppColors.yellow,
    borderRadius: 12,
  },
  warningContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 12,
    paddingRight: 16,
    paddingVertical: 8,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: AppColors.red,
  },
  warningText: {
    color: AppColors.screenColor,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
  },
});

export default DetailBudgetScreen;
