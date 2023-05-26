import {AppColors} from 'constants/AppColors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ITagProps {
  title: string;
  desc: string;
}

const Tag: React.FunctionComponent<ITagProps> = ({title, desc}) => {
  return (
    <View style={styles.tagTextContainer}>
      <Text style={styles.tagTitle}>{title}</Text>
      <Text style={styles.tagDesc}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tagTextContainer: {
    gap: 4,
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagTitle: {
    color: AppColors.primaryTextColor,
    lineHeight: 19,
    fontSize: 16,
    fontWeight: '500',
  },
  tagDesc: {
    color: AppColors.secondaryTextColor,
    lineHeight: 16,
    fontSize: 13,
    fontWeight: '500',
  },
});

export default Tag;
