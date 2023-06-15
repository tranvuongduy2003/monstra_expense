import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import Dropdown from 'components/Dropdown';
import StatusModal from 'components/StatusModal';
import Toggle from 'components/Toggle';
import {AppColors} from 'constants/AppColors';
import {expenseCategoryOptions} from 'constants/Category';
import {AuthContext} from 'providers/AuthProvider';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OptionType} from 'types/option.type';
import ProgressBar from './components/ProgressBar';

interface IEditBudgetScreenProps {}

const EditBudgetScreen: React.FunctionComponent<
  IEditBudgetScreenProps
> = props => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const {data}: any = route.params;

  const {user} = useContext(AuthContext) as any;
  const [isReceiveAlert, setIsReceiveAlert] = useState<boolean>(
    data.isReceiveAlert,
  );
  const [budget, setBudget] = useState<number | null>(data.budget);
  const [limit, setLimit] = useState<number>(data.limit);
  const [category, setCatogory] = useState<OptionType>(data.category);
  const [loading, setLoading] = useState<boolean>(false);

  const [showInform, setShowInform] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<any>();

  const handleEditBudget = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('budgets')
        .doc(data.id)
        .update({
          budget: budget,
          isReceiveAlert: isReceiveAlert,
          ...(isReceiveAlert && {limit: limit}),
          category: category,
        });
      setStatusInfo({
        status: 'success',
        title: 'Edit budget successfully!',
      });
      setShowInform(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setStatusInfo({
        status: 'error',
        title: 'Failed to edit budget!',
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
        }}>
        <ClickOutsideProvider>
          <View style={styles.balanceContainer}>
            <Text style={styles.title}>How much do yo want to spend?</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.amount}>$</Text>
              <TextInput
                value={JSON.stringify(budget)}
                style={styles.amount}
                keyboardType="numeric"
                onChangeText={val =>
                  val ? setBudget(parseInt(val)) : setBudget(null)
                }
              />
            </View>
          </View>
          <View style={styles.setupContainer}>
            <Dropdown
              options={expenseCategoryOptions}
              placeholder="Category"
              zIndex={50}
              select={category}
              setSelect={setCatogory}
            />
            <View style={styles.alertSetting}>
              <View>
                <Text style={styles.alertTitle}>Receive Alert</Text>
                <Text style={styles.alertText}>
                  Receive alert when it reaches{`\n`}some point.
                </Text>
              </View>
              <View>
                <Toggle
                  on={isReceiveAlert}
                  setOn={() => setIsReceiveAlert(!isReceiveAlert)}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  display: isReceiveAlert ? 'flex' : 'none',
                }}>
                {isReceiveAlert && (
                  <ProgressBar limit={limit} setLimit={setLimit} />
                )}
              </View>
            </View>
            <AppButton
              loading={loading}
              title="Continue"
              backgroundColor={AppColors.primaryColor}
              onPress={handleEditBudget}
            />
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
            statusInfo.status === 'success' && navigation.navigate('Budget')
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
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  alertSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 32,
    marginTop: 16,
    gap: 32,
    flexWrap: 'wrap',
  },
  alertTitle: {
    color: AppColors.primaryTextColor,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 4,
  },
  alertText: {
    color: AppColors.secondaryTextColor,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
  },
});

export default EditBudgetScreen;
