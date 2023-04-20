import {AppColors} from 'constants/AppColors';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface IAttachmentItemProps {
  icon: ReactNode;
  title: string;
}

const AttachmentItem: React.FunctionComponent<IAttachmentItemProps> = ({
  icon,
  title,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      {icon}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primaryColor100,
    height: 90,
    width: 110,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    color: AppColors.primaryColor,
  },
});

export default AttachmentItem;
