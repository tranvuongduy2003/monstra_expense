import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropIcon from 'assets/svg/DropIcon';
import PickIcon from 'assets/svg/PickIcon';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';

interface ICustomDropDownProps {
  text?: String;
  data?: any;
  onPress?: () => void;
}

const CustomDropDown: React.FunctionComponent<ICustomDropDownProps> = ({
  text,
  data = [],
}) => {
  const [clicked, setClicked] = useState(false);
  const [selectedData, setSelectedData] = useState('');

  return (
    <View style={styles.block}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <View style={styles.select}>
          <Text style={{fontWeight: '600'}}>
            {selectedData == '' ? 'Select Data' : selectedData}
          </Text>
          {clicked ? <PickIcon></PickIcon> : <DropIcon></DropIcon>}
        </View>
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            width: scale(343),
            height: scale(300),
            elevation: 10,
            zIndex: 999,
            marginTop: scale(90),
            position: 'absolute',
            alignSelf: 'center',
            backgroundColor: AppColors.white,
            borderWidth: 0.25,
            borderRadius: 10,
          }}>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: scale(343),
                    alignSelf: 'center',
                    height: scale(56),
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setSelectedData(item.value);
                    setClicked(!clicked);
                  }}>
                  <Text style={{fontWeight: '600'}}>{item.value}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: AppColors.white,
    marginBottom: scale(24),
    position: 'absolute',
    zIndex: 0,
  },
  selectBox: {
    width: scale(343),
    height: scale(56),
    borderRadius: 16,
    borderWidth: 0.75,
    borderColor: AppColors.lavender,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: AppColors.white,
  },
  select: {
    width: scale(311),
    height: scale(32),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: AppColors.white,
  },
  text: {
    fontSize: scale(16),
    marginBottom: 12,
    color: AppColors.textColor,
    fontWeight: '500',
  },
});

export default CustomDropDown;
