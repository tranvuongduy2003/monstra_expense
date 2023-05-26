import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import ErrorMessage from './ErrorMessage';

interface IInputProps {
  name?: string;
  defaultValue?: string;
  onChangeText?: any;
  placeholder: string;
  isPassword?: boolean;
  required?: boolean;
  isEmail?: boolean;
  setValid?: Function;
}

const Input: React.FunctionComponent<IInputProps> = ({
  name,
  defaultValue,
  onChangeText,
  placeholder,
  isPassword = false,
  isEmail = false,
  required = false,
  setValid,
}) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [isRequiredError, setIsRequiredError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);

  const onTextInputChange = (value: string) => {
    onChangeText(value);
    if (required) {
      if (value && value !== '') {
        setIsRequiredError(false);
      } else {
        setIsRequiredError(true);
      }
    }
    if (isEmail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        setIsEmailError(false);
      } else {
        setIsEmailError(true);
      }
    }
  };

  useEffect(() => {
    if (isEmailError || isRequiredError) {
      setValid && setValid(false);
    } else {
      setValid && setValid(true);
    }
  }, [isEmailError, isRequiredError]);

  return (
    <View>
      {isPassword ? (
        <View style={styles.passwordContainer}>
          <TextInput
            defaultValue={defaultValue}
            onChangeText={text => onTextInputChange(text)}
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
          defaultValue={defaultValue}
          onChangeText={text => onTextInputChange(text)}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={AppColors.secondaryTextColor}
        />
      )}
      {isRequiredError && <ErrorMessage title={`${name} is required`} />}
      {isEmailError && <ErrorMessage title="Invalid email address" />}
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
