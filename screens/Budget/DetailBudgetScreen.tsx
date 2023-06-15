import BottomSheet from '@gorhom/bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import StatusModal from 'components/StatusModal';
import {AppColors} from 'constants/AppColors';
import {icons} from 'constants/CategoryIcon';
import React, {useCallback, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ExclamationCircleIcon, TrashIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBar from 'screens/layout/HeaderBar';
import RemoveConfirmationBottomSheet from './components/RemoveConfirmationBottomSheet';

interface IDetailBudgetScreenProps {}

const DetailBudgetScreen: React.FunctionComponent<
  IDetailBudgetScreenProps
> = props => {
  const [showRemoveConfirmation, setShowRemoveConfirmation] =
    useState<boolean>(false);
  const navigation: any = useNavigation();
  const route = useRoute();
  const {data}: any = route.params;

  const [loading, setLoading] = useState<boolean>(false);
  const [showInform, setShowInform] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<any>();

  const removeConfirmationRef = useRef<BottomSheet>(null);

  const handleRemoveConfirmationSheetChanges = useCallback((index: number) => {
    removeConfirmationRef.current?.snapToIndex(index);
    setShowRemoveConfirmation(true);
  }, []);

  const currentBalance = data.expenses
    .map(item => item.balance)
    .reduce((prev, cur) => prev + cur, 0);

  const handleDeleteBudget = async () => {
    setLoading(true);
    try {
      await firestore().collection('budgets').doc(data.id).delete();
      setStatusInfo({
        status: 'success',
        title: 'Delete budget successfully!',
      });
      setShowInform(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setStatusInfo({
        status: 'error',
        title: 'Failed to delete budget!',
      });
      setLoading(false);
      setShowInform(true);
    }
  };

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
            <View
              style={[
                styles.tagIcon,
                {backgroundColor: icons.get(data.category.value)?.bgColor},
              ]}>
              {icons.get(data.category.value)?.child}
            </View>
            <Text style={styles.tagTitle}>{data.category.title}</Text>
          </View>
          {/* TITLE */}
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>Remaining</Text>
            <Text style={styles.amount}>{`$${
              currentBalance <= data.budget ? data.budget - currentBalance : 0
            }`}</Text>
          </View>
          {/* PROGRESS BAR */}
          <View style={styles.baseBar}>
            <View
              style={[
                styles.progressBar,
                {
                  backgroundColor: icons.get(data.category.value)?.color,
                  width: `${
                    currentBalance <= data.budget
                      ? (currentBalance / data.budget) * 100
                      : 100
                  }%`,
                },
              ]}
            />
          </View>
          {/* WARNING */}
          {data.budget <= currentBalance && (
            <View style={styles.warningContainer}>
              <ExclamationCircleIcon color={AppColors.screenColor} />
              <Text style={styles.warningText}>You've exceed the limit!</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Edit"
            backgroundColor={AppColors.primaryColor}
            onPress={() => navigation.navigate('EditBudget', {data: data})}
          />
        </View>
      </ScrollView>
      {showRemoveConfirmation && (
        <RemoveConfirmationBottomSheet
          bottomSheetRef={removeConfirmationRef}
          setShow={setShowRemoveConfirmation}
          handleDeleteBudget={handleDeleteBudget}
          loading={loading}
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
