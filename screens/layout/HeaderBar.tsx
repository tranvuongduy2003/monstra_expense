import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'constants/AppColors';
import React, {ReactElement} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon as ArrowLeftIconOutline} from 'react-native-heroicons/outline';

interface IHeaderBarProps {
  name: string;
  backgroundColor?: string;
  color?: string;
  icon?: ReactElement;
  onBack?: any;
}

const HeaderBar: React.FunctionComponent<IHeaderBarProps> = ({
  name,
  backgroundColor,
  color,
  icon,
  onBack,
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
      <TouchableOpacity onPress={onBack ? onBack : () => navigation.goBack()}>
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
      {icon ? icon : <ArrowLeftIconOutline style={styles.psuedoBackIcon} />}
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
