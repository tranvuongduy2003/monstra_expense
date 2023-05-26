import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {ReactNode, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import AttachmentItem from './AttachmentItem';
import {
  CameraIcon,
  DocumentIcon,
  PhotoIcon,
} from 'react-native-heroicons/solid';
import {AppColors} from 'constants/AppColors';

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
        <AttachmentItem
          icon={<DocumentIcon size={32} color={AppColors.primaryColor} />}
          title="Document"
          onPress={() => {}}
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
