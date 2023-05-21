import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import AppButton from 'components/AppButton';

interface IRemoveConfirmationBottomSheetProps {
  setShow: any;
  bottomSheetRef: any;
}

const RemoveConfirmationBottomSheet: React.FunctionComponent<
  IRemoveConfirmationBottomSheetProps
> = ({setShow, bottomSheetRef}) => {
  const snapPoints = useMemo(() => ['30%'], []);

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
            <Text style={styles.title}>Remove this budget?</Text>
            <Text style={styles.message}>
              Are you sure do you wanna remove this budget?
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={{flex: 1}}>
              <AppButton
                title="No"
                backgroundColor={AppColors.primaryColor100}
                color={AppColors.primaryColor}
                onPress={() => {}}
              />
            </View>
            <View style={{flex: 1}}>
              <AppButton
                title="Yes"
                backgroundColor={AppColors.primaryColor}
                onPress={() => {}}
              />
            </View>
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
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: AppColors.primaryTextColor,
    textAlign: 'center',
  },
  message: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.secondaryTextColor,
    textAlign: 'center',
  },
});

export default RemoveConfirmationBottomSheet;
