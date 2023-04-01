import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {AppColors} from 'constants/AppColors';

interface ISecureCodeInputProps {}

const CELL_COUNT = 4;

const SecureCodeInput: React.FunctionComponent<ISecureCodeInputProps> = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.container}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol}) => (
          <View
            key={index}
            style={{justifyContent: 'center'}}
            onLayout={getCellOnLayoutHandler(index)}>
            <View
              style={[styles.cell, symbol ? styles.markSymbol : null]}></View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
  },
  cell: {
    width: 32,
    height: 32,
    borderRadius: 999,
    marginRight: 16,
    borderWidth: 4,
    opacity: 0.4,
    borderColor: AppColors.lightPurple,
  },
  markSymbol: {
    backgroundColor: '#FCFCFC',
    borderColor: '#FCFCFC',
    opacity: 1,
  },
});

export default SecureCodeInput;
