import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Modal} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {useNavigation} from '@react-navigation/native';
import scale from 'constants/Responsive';
import MoreIcon from 'assets/svg/MoreIcon';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IPopUpMenuProps {}

const PopUpMenu: React.FunctionComponent<IPopUpMenuProps> = props => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const options = [
    {
      title: 'Mark already',
      action: () => navigation.navigate('NotiEmpty' as never),
    },
    {
      title: 'Remove all',
      action: () => navigation.navigate('NotiEmpty' as never),
    },
  ];
  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <MoreIcon />
      </TouchableOpacity>
      <Modal transparent visible={visible}>
        <SafeAreaView style={{flex: 1}} onTouchStart={() => setVisible(false)}>
          <View style={styles.popup}>
            {options.map((op, i) => (
              <TouchableOpacity
                style={styles.option}
                key={i}
                onPress={op.action}>
                <Text>{op.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  popup: {
    borderRadius: 5,
    borderColor: AppColors.borderColor,
    borderWidth: 0.75,
    backgroundColor: AppColors.white,
    position: 'absolute',
    alignItems: 'center',
    right: scale(20),
    top: scale(48),
  },
  option: {
    paddingVertical: scale(16),
    paddingHorizontal: scale(24),
  },
  title: {
    fontSize: scale(14),
    fontFamily: 'Inter-Medium',
    color: AppColors.textColor,
  },
});

export default PopUpMenu;
