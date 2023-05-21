import {AppColors} from 'constants/AppColors';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import AppButton from 'components/AppButton';
import Dropdown, {OptionType} from 'components/Dropdown';
import Toggle from 'components/Toggle';
import ProgressBar from './components/ProgressBar';

interface ICreateBudgetScreenProps {}

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

const CreateBudgetScreen: React.FunctionComponent<
  ICreateBudgetScreenProps
> = props => {
  const [showProgressBar, setShowProgressBar] = useState<boolean>(false);

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
            <Text style={styles.amount}>$0</Text>
          </View>
          <View style={styles.setupContainer}>
            <Dropdown
              options={categoryOptions}
              placeholder="Category"
              zIndex={50}
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
                  on={showProgressBar}
                  setOn={() => setShowProgressBar(!showProgressBar)}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  display: showProgressBar ? 'flex' : 'none',
                }}>
                {showProgressBar && <ProgressBar />}
              </View>
            </View>
            <AppButton
              title="Continue"
              backgroundColor={AppColors.primaryColor}
              onPress={() => {}}
            />
          </View>
        </ClickOutsideProvider>
      </ScrollView>
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

export default CreateBudgetScreen;
