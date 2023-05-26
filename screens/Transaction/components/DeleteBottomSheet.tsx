import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppColors} from 'constants/AppColors';
import AppButton from 'components/AppButton';

interface IDeleteBottomSheetProps {
  setShow: any;
  bottomSheetRef: any;
  handleDelete: any;
}

const DeleteBottomSheet: React.FunctionComponent<IDeleteBottomSheetProps> = ({
  setShow,
  bottomSheetRef,
  handleDelete,
}) => {
  const snapPoints = useMemo(() => ['30%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => setShow(false)}>
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>Remove this transaction?</Text>
        <Text style={styles.question}>
          Are you sure do you wanna remove this transaction?
        </Text>
        <View style={styles.buttonContainer}>
          <View style={{flex: 1}}>
            <AppButton
              title="No"
              color={AppColors.primaryColor}
              backgroundColor={AppColors.primaryColor100}
              onPress={() => {
                setShow(false);
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <AppButton
              title="Yes"
              backgroundColor={AppColors.primaryColor}
              onPress={() => {
                handleDelete();
                setShow(false);
              }}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 26,
    height: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: AppColors.primaryTextColor,
    textAlign: 'center',
  },
  question: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.secondaryTextColor,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingBottom: 40,
    flexDirection: 'row',
    gap: 10,
  },
});

export default DeleteBottomSheet;
