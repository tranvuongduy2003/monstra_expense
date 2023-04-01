import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {ArrowLeftIcon as ArrowLeftIconOutline} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

interface IHeaderBarProps {
  name: string;
  backgroundColor?: string;
  color?: string;
}

const HeaderBar: React.FunctionComponent<IHeaderBarProps> = ({
  name,
  backgroundColor,
  color,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : AppColors.screenColor,
        },
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeftIconOutline
          color={color ? color : AppColors.primaryTextColor}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          {color: color ? color : AppColors.primaryTextColor},
        ]}>
        {name}
      </Text>
      <ArrowLeftIconOutline style={styles.psuedoBackIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  psuedoBackIcon: {
    opacity: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
  },
});

export default HeaderBar;
