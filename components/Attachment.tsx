import React from 'react';
import {StyleSheet, Text, Pressable, Image} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {PaperClipIcon} from 'react-native-heroicons/outline';

interface IAttachmentProps {
  onPress: () => void;
  attachment: any;
}

const Attachment: React.FunctionComponent<IAttachmentProps> = ({
  onPress,
  attachment,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={attachment ? styles.noAttachment : styles.container}>
      {attachment ? (
        <Image
          source={{
            uri: attachment.uri || attachment,
          }}
          style={{
            width: '100%',
            height: 120,
            borderRadius: 10,
            resizeMode: 'cover',
          }}
        />
      ) : (
        <>
          <PaperClipIcon color={AppColors.secondaryTextColor} />
          <Text style={styles.text}>Add attachment</Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  noAttachment: {
    borderRadius: 16,
  },
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
