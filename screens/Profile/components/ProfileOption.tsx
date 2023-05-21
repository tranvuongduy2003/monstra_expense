import React, {ReactElement} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';

interface IProfileOptionProps {
  icon: ReactElement;
  title: string;
  onPress?: Function;
}

const ProfileOption: React.FunctionComponent<IProfileOptionProps> = ({
  icon,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.contentButton,
        title !== 'Logout' && {
          borderBottomWidth: 1,
          borderColor: AppColors.borderColor,
        },
      ]}
      onPress={() => onPress && onPress()}>
      <View style={styles.content}>
        <View style={styles.icons}>{icon}</View>
        <Text style={styles.contentTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentButton: {
    backgroundColor: AppColors.white,
  },
  content: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 18,
  },
  icons: {
    width: scale(52),
    height: scale(52),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: AppColors.lavender,
    padding: scale(10),
  },
  contentTitle: {
    marginLeft: scale(9),
    fontSize: scale(16),
    textAlignVertical: 'center',
  },
});

export default ProfileOption;
