import {AppColors} from 'constants/AppColors';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface ITextAreaProps {
  name?: string;
  defaultValue?: string;
  onChangeText?: any;
  placeholder: string;
}

const TextArea: React.FunctionComponent<ITextAreaProps> = ({
  name,
  defaultValue,
  onChangeText,
  placeholder,
}) => {
  const onTextAreaChange = (value: string) => {
    onChangeText(value);
  };

  return (
    <View>
      <TextInput
        numberOfLines={4}
        multiline={true}
        defaultValue={defaultValue}
        onChangeText={text => onTextAreaChange(text)}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={AppColors.secondaryTextColor}
      />
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
    textAlignVertical: 'top',
  },
});

export default TextArea;
