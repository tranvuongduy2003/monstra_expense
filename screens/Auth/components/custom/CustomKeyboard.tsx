import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import KeyboardCell from './KeyboardCell';
import {AppColors} from 'constants/AppColors';

interface ICustomKeyboardProps {
  onSubmit?: () => void;
}

const CustomKeyboard: React.FunctionComponent<ICustomKeyboardProps> = ({
  onSubmit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <KeyboardCell value={1} />
        <KeyboardCell value={2} />
        <KeyboardCell value={3} />
      </View>
      <View style={styles.row}>
        <KeyboardCell value={4} />
        <KeyboardCell value={5} />
        <KeyboardCell value={6} />
      </View>
      <View style={styles.row}>
        <KeyboardCell value={7} />
        <KeyboardCell value={8} />
        <KeyboardCell value={9} />
      </View>
      <View style={styles.row}>
        <KeyboardCell>
          <ArrowRightIcon
            color={AppColors.screenColor}
            size={48}
            style={{alignItems: 'center', justifyContent: 'center', opacity: 0}}
          />
        </KeyboardCell>
        <KeyboardCell value={0} />
        <KeyboardCell onPress={onSubmit}>
          <ArrowRightIcon
            color={AppColors.screenColor}
            size={48}
            style={{alignItems: 'center', justifyContent: 'center'}}
          />
        </KeyboardCell>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 32,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default CustomKeyboard;
