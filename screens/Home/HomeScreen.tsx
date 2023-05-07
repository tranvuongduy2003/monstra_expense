import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppColors} from 'constants/AppColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import Dropdown, {OptionType} from 'components/Dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AdjustmentsHorizontalIcon} from 'react-native-heroicons/outline';
import BottomSheet from '@gorhom/bottom-sheet';
import FilterBottomSheet from 'screens/Transaction/components/FilterBottomSheet';
import {useNavigation} from '@react-navigation/native';
import scale from 'constants/Responsive';
import BellIcon from 'assets/svg/BellIcon';
import {LinearGradient} from 'expo-linear-gradient';
import CustomDropDown from 'components/CustomDropList';

interface IHomeScreenProps {}

const options: OptionType[] = [
  {
    title: 'January',
    value: 'jan',
  },
  {
    title: 'February',
    value: 'feb',
  },
  {
    title: 'March',
    value: 'mar',
  },
  {
    title: 'April',
    value: 'apr',
  },
  {
    title: 'May',
    value: 'may',
  },
  {
    title: 'June',
    value: 'jun',
  },
  {
    title: 'July',
    value: 'jul',
  },
  {
    title: 'August',
    value: 'aug',
  },
  {
    title: 'September',
    value: 'sep',
  },
  {
    title: 'October',
    value: 'oct',
  },
  {
    title: 'November',
    value: 'nov',
  },
  {
    title: 'December',
    value: 'dec',
  },
];
const HomeScreen: React.FunctionComponent<IHomeScreenProps> = props => {
  const navigation = useNavigation();

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const filterRef = useRef<BottomSheet>(null);

  const handleFilterSheetChanges = useCallback((index: number) => {
    filterRef.current?.snapToIndex(index);
    setShowFilter(true);
    navigation.setOptions({tabBarStyle: {display: 'none'}});
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        {/* Header */}
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.avatar}></View>
            <CustomDropDown options={options} zIndex={80} />
            <TouchableOpacity onPress={() => {}}>
              <BellIcon></BellIcon>
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Account Balance</Text>
            <Text style={styles.number}>$9400</Text>
          </View>
        </View>
      </ScrollView>
      {showFilter && (
        <FilterBottomSheet bottomSheetRef={filterRef} setShow={setShowFilter} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    width: scale(375),
    height: scale(312),
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: '#FFF6E5',
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: 40,
    backgroundColor: AppColors.mistyRose,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  titleContainer: {
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: scale(14),
    color: AppColors.secondaryTextColor,
  },
  number: {
    fontSize: scale(40),
    fontFamily: 'Inter-SemiBold',
    color: AppColors.textColor,
  },
});

export default HomeScreen;
