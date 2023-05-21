import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface ISecureCodeInputProps {
  pin: string;
}

const SecureCodeInput: React.FunctionComponent<ISecureCodeInputProps> = ({
  pin,
}) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4].map(value => (
        <View key={value} style={{justifyContent: 'center'}}>
          <View
            style={[
              styles.cell,
              value <= pin.length && styles.markSymbol,
            ]}></View>
        </View>
      ))}
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
