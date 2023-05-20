import {AppColors} from 'constants/AppColors';
import {useClickOutside} from 'hooks/useClickOutside';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/outline';

export type OptionType = {
  title: string;
  value: string;
};

interface IDropdownProps {
  options: OptionType[];
  placeholder?: string;
  zIndex: number;
  select?: OptionType;
  setSelect?: Function;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = ({
  options,
  placeholder,
  zIndex,
  select,
  setSelect,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const dropdownRef = useClickOutside<Text>(() => setShow(false));

  return (
    <View ref={dropdownRef} style={{position: 'relative', zIndex: zIndex}}>
      <TouchableOpacity style={styles.container} onPress={() => setShow(!show)}>
        <TextInput
          editable={false}
          style={styles.text}
          placeholder={placeholder}
          value={select?.title}
        />
        {show ? (
          <ChevronUpIcon style={styles.icon} />
        ) : (
          <ChevronDownIcon style={styles.icon} />
        )}
      </TouchableOpacity>
      {show && (
        <ScrollView style={styles.optionList}>
          {options.map((item, index) => (
            <Option
              key={index}
              title={item.title}
              value={item.value}
              onPress={() => {
                setSelect && setSelect(item);
                setShow(false);
              }}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const Option: React.FunctionComponent<OptionType & {onPress: () => void}> = ({
  title,
  value,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.optionContainer}>
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#F1F1FA',
    borderRadius: 16,
    color: AppColors.primaryTextColor,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
    paddingRight: 50,
  },
  icon: {
    position: 'absolute',
    color: AppColors.secondaryTextColor,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionList: {
    position: 'absolute',
    width: '100%',
    top: '100%',
    backgroundColor: AppColors.screenColor,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    marginTop: 5,
    zIndex: 100,
  },
  optionContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  optionText: {
    color: AppColors.secondaryTextColor,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
  },
});

export default Dropdown;
