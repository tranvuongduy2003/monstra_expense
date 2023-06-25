import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {AppColors} from 'constants/AppColors';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {CameraIcon, PhotoIcon} from 'react-native-heroicons/solid';
import AttachmentItem from './AttachmentItem';

interface IAttachmentBottomSheetProps {
  setShow: any;
  bottomSheetRef: any;
  handleTakePhoto: any;
  handleChoosePhoto: any;
}

const AttachmentBottomSheet: React.FunctionComponent<
  IAttachmentBottomSheetProps
> = ({setShow, bottomSheetRef, handleTakePhoto, handleChoosePhoto}) => {
  const snapPoints = useMemo(() => [210], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => setShow(false)}>
      <BottomSheetView style={styles.container}>
        <AttachmentItem
          icon={<CameraIcon size={32} color={AppColors.primaryColor} />}
          title="Camera"
          onPress={handleTakePhoto}
        />
        <AttachmentItem
          icon={<PhotoIcon size={32} color={AppColors.primaryColor} />}
          title="Image"
          onPress={handleChoosePhoto}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    height: '100%',
    justifyContent: 'space-evenly',
  },
});

export default AttachmentBottomSheet;
