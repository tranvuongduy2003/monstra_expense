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

interface IHomeScreenProps {}

const options: OptionType[] = [
  {
    title: 'Week',
    value: 'week',
  },
  {
    title: 'Month',
    value: 'month',
  },
  {
    title: 'Year',
    value: 'Year',
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
          <LinearGradient
            colors={['red', 'yellow']}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 1,
            }}></LinearGradient>
          <View style={styles.headerContainer}>
            <View style={styles.avatar}></View>
            <Dropdown options={options} zIndex={80} />
            <TouchableOpacity onPress={() => {}}>
              <BellIcon></BellIcon>
            </TouchableOpacity>
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
  },
  overlay: {
    backgroundColor: '#000000',
    opacity: 0.6,
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
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
  reportNavigator: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: AppColors.primaryColor100,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'space-between',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  navigatorText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.primaryColor,
  },
});

export default HomeScreen;
