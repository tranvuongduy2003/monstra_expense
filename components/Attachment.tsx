import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {PaperClipIcon} from 'react-native-heroicons/outline';

interface IAttachmentProps {
  onPress: () => void;
}

const Attachment: React.FunctionComponent<IAttachmentProps> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <PaperClipIcon color={AppColors.secondaryTextColor} />
      <Text style={styles.text}>Add attachment</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: AppColors.secondaryTextColor,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  text: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: AppColors.secondaryTextColor,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
  },
});

export default Attachment;
