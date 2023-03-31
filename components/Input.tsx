import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';

interface IInputProps {
  placeholder: string;
  isPassword?: boolean;
}

const Input: React.FunctionComponent<IInputProps> = ({
  placeholder,
  isPassword = false,
}) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  return (
    <View>
      {isPassword ? (
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, {paddingRight: 50}]}
            placeholder={placeholder}
            placeholderTextColor={AppColors.secondaryTextColor}
            secureTextEntry={hidePassword}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            style={styles.passwordIcon}
            onPress={() => setHidePassword(!hidePassword)}>
            {hidePassword ? (
              <EyeIcon color={AppColors.secondaryTextColor} />
            ) : (
              <EyeSlashIcon color={AppColors.secondaryTextColor} />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={AppColors.secondaryTextColor}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    justifyContent: 'center',
  },
  passwordIcon: {
    position: 'absolute',
    right: 20,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: AppColors.primaryTextColor,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
    borderWidth: 1,
    borderColor: '#F1F1FA',
    borderRadius: 16,
  },
});

export default Input;
