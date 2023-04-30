import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {ArrowLeftIcon as ArrowLeftIconOutline} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import PopUpMenu from './PopUpMenu';

interface INotiHeaderBarProps {
  name: string;
}

const NotiHeaderBar: React.FunctionComponent<INotiHeaderBarProps> = ({
  name,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeftIconOutline color={AppColors.headerTitle} />
      </TouchableOpacity>
      <Text
        style={[styles.title, {color: AppColors.headerTitle}]}>
        {name}
      </Text>
      <PopUpMenu></PopUpMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
  },
});

export default NotiHeaderBar;
