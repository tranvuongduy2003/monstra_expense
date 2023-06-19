import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'constants/AppColors';
import {IAccount} from 'interfaces/IAccount';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IAccountItemProps {
  data: IAccount;
}

const AccountItem: React.FunctionComponent<IAccountItemProps> = ({data}) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('DetailAccount', {
          data: data,
        })
      }>
      <View style={styles.iconContainer}>
        <Image
          source={data.type_item.image}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.text}>{data.name}</Text>
      </View>
      <View>
        <Text style={styles.text}>{`$${data.balance}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: AppColors.borderColor,
  },
  icon: {
    width: 32,
    height: 32,
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: AppColors.primaryTextColor,
  },
});

export default AccountItem;
