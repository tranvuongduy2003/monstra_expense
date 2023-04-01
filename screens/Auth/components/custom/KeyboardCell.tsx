import React, {ReactElement} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

interface IKeyboardCellProps {
  value?: number;
  onPress?: () => void;
  children?: ReactElement;
}

const KeyboardCell: React.FunctionComponent<IKeyboardCellProps> = ({
  value,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {children ? (
        children
      ) : (
        <Text style={styles.cellText}>{value && value.toString()}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cellText: {
    color: '#FCFCFC',
    fontWeight: '500',
    fontSize: 48,
    lineHeight: 58,
  },
});

export default KeyboardCell;
