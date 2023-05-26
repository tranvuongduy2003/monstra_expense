import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Tag from './Tag';
import {AppColors} from 'constants/AppColors';

interface IRecurringInfoProps {
  editable: boolean;
  onEdit?: any;
}

const RecurringInfo: React.FunctionComponent<IRecurringInfoProps> = ({
  editable,
  onEdit,
}) => {
  return (
    <View style={styles.serviceContainer}>
      <Tag title="Frequency" desc="Yearly - December 29" />
      <Tag title="End After" desc="29 December 2025" />
      {editable && (
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: AppColors.violet,
    borderRadius: 99,
  },
  editButtonText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: AppColors.primaryColor,
  },
});

export default RecurringInfo;
