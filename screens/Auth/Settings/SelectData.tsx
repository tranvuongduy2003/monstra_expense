import React, {ReactElement} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import CheckedIcon from 'assets/svg/CheckedIcon';

interface ICurrencyScreenProps {
  optionComponent?: any;
  onPress?: () => void;
  children?: ReactElement;
  objKey?: string; //id
  objValue?: string; //title = name
  data?: any;
}

const Option = (
  item: any,
  value: any,
  selected: any,
  objKey: any,
  onPress: any,
) => {
  const OptionComponent = () => {
    return (
      <TouchableOpacity style={styles.settingButton} onPress={onPress}>
        <View style={styles.content}>
          {}
          <Text style={styles.title}>{item?.[value]}</Text>
          {selected?.[objKey] === item?.[objKey] ? (
            <View style={styles.icon}>
              <CheckedIcon></CheckedIcon>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };
  return {OptionComponent};
};

const SelectData: React.FunctionComponent<ICurrencyScreenProps> = ({
  optionComponent = Option,
  objValue = 'title',
  objKey = 'id',
  data = [],
}) => {
  //const optionComponent = Option;
  const [selected, setSelected] = useState(null);

  function renderOption(item: {id: string; title: string; currency: string}) {
    const {OptionComponent} = optionComponent(
      item,
      selected,
      objValue,
      objKey,
      () => toggleSelect(item),
    );
    //return {OptionComponent};
    return <OptionComponent />;
  }

  function toggleSelect(item: any) {
    if (item?.[objKey] === selected?.[objKey]) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.settingButton}
              onPress={() => toggleSelect(item)}>
              <View style={styles.content}>
                {}
                <Text
                  style={[
                    styles.title,
                    {
                      fontWeight:
                        selected?.[objKey] === item?.[objKey]
                          ? 'bold'
                          : 'normal',
                    },
                  ]}>
                  {item?.[objValue]}
                </Text>
                {selected?.[objKey] === item?.[objKey] ? (
                  <View style={styles.icon}>
                    <CheckedIcon></CheckedIcon>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        }}
        extraData={selected}></FlatList>
      {/* <View style={styles.blankSpace}></View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  //   settingContainer: {
  //     flex: 312,
  //     backgroundColor: AppColors.white,
  //   },
  settingButton: {
    width: scale(375),
    height: scale(52), //
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: scale(343),
    //flex: 52,
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scale(16),
    color: AppColors.titleColor,
  },
  icon: {
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  // blankSpace: {
  //   flex: 395,
  // },
});

export default SelectData;
