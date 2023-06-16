import {AppColors} from 'constants/AppColors';
import {useClickOutside} from 'hooks/useClickOutside';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/outline';
import {OptionType} from 'types/option.type';

interface ICategorySelectorProps {
  options: OptionType[];
  placeholder?: string;
  zIndex: number;
  select?: OptionType;
  setSelect?: Function;
}

const CategorySelector: React.FunctionComponent<ICategorySelectorProps> = ({
  options,
  placeholder,
  zIndex,
  select,
  setSelect,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const categorySelectorRef = useClickOutside<Text>(() => setShow(false));

  return (
    <View
      ref={categorySelectorRef}
      style={{position: 'relative', zIndex: zIndex}}>
      <TouchableOpacity style={styles.container} onPress={() => setShow(!show)}>
        {show ? (
          <ChevronUpIcon style={styles.icon} />
        ) : (
          <ChevronDownIcon style={styles.icon} />
        )}
        <TextInput
          editable={false}
          style={styles.text}
          placeholder={placeholder}
          value={select?.title}
        />
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
    paddingLeft: 46,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    borderRadius: 16,
    color: AppColors.primaryTextColor,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
  },
  icon: {
    position: 'absolute',
    color: AppColors.primaryColor,
    left: 16,
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

export default CategorySelector;
