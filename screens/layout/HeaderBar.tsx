import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {ArrowLeftIcon as ArrowLeftIconOutline} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

interface IHeaderBarProps {
  name: string;
}

const HeaderBar: React.FunctionComponent<IHeaderBarProps> = ({name}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeftIconOutline color={AppColors.headerTitle} />
      </TouchableOpacity>
      <Text style={styles.title}>{name}</Text>
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
    backgroundColor: AppColors.screenColor,
  },
  psuedoBackIcon: {
    opacity: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.headerTitle,
    lineHeight: 22,
  },
});

export default HeaderBar;
