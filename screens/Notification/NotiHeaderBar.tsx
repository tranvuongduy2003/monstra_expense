import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {ArrowLeftIcon as ArrowLeftIconOutline} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import MoreIcon from 'assets/svg/MoreIcon';

interface INotiHeaderBarProps {
  name: string;
  backgroundColor?: string;
  color?: string;
}

const NotiHeaderBar: React.FunctionComponent<INotiHeaderBarProps> = ({
  name,
  backgroundColor,
  color,
}) => {
  const navigation = useNavigation();
  const [showOption, setShowOption] = useState<boolean>();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : AppColors.white,
        },
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeftIconOutline
          color={color ? color : AppColors.headerTitle}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          {color: color ? color : AppColors.headerTitle},
        ]}>
        {name}
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <MoreIcon
          color={color ? color : AppColors.headerTitle}
        />
      </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
  },
});

export default NotiHeaderBar;
