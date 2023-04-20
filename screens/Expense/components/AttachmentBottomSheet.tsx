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
}

type AttachmentItemType = {
  id: number;
  icon: ReactNode;
  title: string;
};

const options: AttachmentItemType[] = [
  {
    id: 0,
    icon: <CameraIcon size={32} color={AppColors.primaryColor} />,
    title: 'Camera',
  },
  {
    id: 1,
    icon: <PhotoIcon size={32} color={AppColors.primaryColor} />,
    title: 'Image',
  },
  {
    id: 2,
    icon: <DocumentIcon size={32} color={AppColors.primaryColor} />,
    title: 'Document',
  },
];

const AttachmentBottomSheet: React.FunctionComponent<
  IAttachmentBottomSheetProps
> = ({setShow, bottomSheetRef}) => {
  const snapPoints = useMemo(() => [210], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => setShow(false)}>
      <BottomSheetView style={styles.container}>
        {options.map(item => (
          <AttachmentItem key={item.id} icon={item.icon} title={item.title} />
        ))}
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
