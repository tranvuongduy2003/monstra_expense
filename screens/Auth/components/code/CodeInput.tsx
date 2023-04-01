import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {AppColors} from 'constants/AppColors';

interface ICodeInputProps {}

const CELL_COUNT = 6;

const CodeInput: React.FunctionComponent<ICodeInputProps> = () => {
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
            {symbol ? (
              <Text style={styles.inputText}>{symbol}</Text>
            ) : (
              <View style={styles.cell}></View>
            )}
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
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: '#E0E2E9',
    marginRight: 16,
  },
  inputText: {
    color: AppColors.primaryTextColor,
    fontWeight: '700',
    fontSize: 32,
    marginRight: 16,
  },
});

export default CodeInput;
