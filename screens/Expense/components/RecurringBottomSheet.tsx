import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import Dropdown, {OptionType} from 'components/Dropdown';
import AppButton from 'components/AppButton';
import RecurringInfo from './RecurringInfo';

interface IRecurringBottomSheetProps {
  setShow: any;
  bottomSheetRef: any;
}

const frequencyOptions: OptionType[] = [
  {
    title: 'Yearly',
    value: 'yearly',
  },
  {
    title: 'Monthly',
    value: 'monthly',
  },
  {
    title: 'Weekly',
    value: 'weekly',
  },
];

const RecurringBottomSheet: React.FunctionComponent<
  IRecurringBottomSheetProps
> = ({setShow, bottomSheetRef}) => {
  const snapPoints = useMemo(() => ['65%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => setShow(false)}>
      <ClickOutsideProvider>
        <BottomSheetView
          style={{
            justifyContent: 'space-between',
            height: '100%',
            flexDirection: 'column',
          }}>
          <View style={styles.container}>
            <Dropdown
              options={frequencyOptions}
              placeholder="Frequency"
              zIndex={50}
            />
            <Dropdown
              options={frequencyOptions}
              placeholder="End After"
              zIndex={40}
            />
            <View style={{paddingHorizontal: 16, paddingVertical: 16}}>
              <RecurringInfo editable={false} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Next"
              backgroundColor={AppColors.primaryColor}
              onPress={() => {}}
            />
          </View>
        </BottomSheetView>
      </ClickOutsideProvider>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});

export default RecurringBottomSheet;
