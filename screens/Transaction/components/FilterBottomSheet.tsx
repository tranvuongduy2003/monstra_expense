import React, {useMemo} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppButton from 'components/AppButton';
import {AppColors} from 'constants/AppColors';
import {useNavigation} from '@react-navigation/native';
import {OptionType} from '@components/Dropdown';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

interface IFilterBottomSheetProps {
  setShow: any;
  bottomSheetRef: any;
}

const filterOptions: OptionType[] = [
  {title: 'Income', value: 'income'},
  {title: 'Expense', value: 'expense'},
  {title: 'Transfer', value: 'transfer'},
];

const sortOptions: OptionType[] = [
  {title: 'Highest', value: 'highest'},
  {title: 'Lowest', value: 'lowest'},
  {title: 'Newest', value: 'newest'},
  {title: 'Oldest', value: 'oldest'},
];

const FilterBottomSheet: React.FunctionComponent<IFilterBottomSheetProps> = ({
  setShow,
  bottomSheetRef,
}) => {
  const navigation = useNavigation();
  const snapPoints = useMemo(() => ['65%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => {
        setShow(false);
        navigation.setOptions({tabBarStyle: styles.tabBarStyle});
      }}
      style={{zIndex: 50}}>
      <ClickOutsideProvider>
        <BottomSheetView
          style={{
            height: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={styles.container}>
            {/* RESET */}
            <View style={styles.filterHeader}>
              <Text style={styles.title}>Filter transaction</Text>
              <TouchableOpacity style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
            {/* FILTER BY */}
            <View style={styles.filterOptions}>
              <Text style={styles.title}>Filter By</Text>
              <View style={styles.optionContainer}>
                {filterOptions.map((option, index) => (
                  <View key={index} style={styles.optionItem}>
                    <Text style={styles.optionText}>{option.title}</Text>
                  </View>
                ))}
              </View>
            </View>
            {/* SORT BY */}
            <View style={styles.filterOptions}>
              <Text style={styles.title}>Sort By</Text>
              <View style={styles.optionContainer}>
                {sortOptions.map((option, index) => (
                  <View key={index} style={styles.optionItem}>
                    <Text style={styles.optionText}>{option.title}</Text>
                  </View>
                ))}
              </View>
            </View>
            {/* CATEGORY */}
            <View style={styles.filterOptions}>
              <Text style={styles.title}>Category</Text>
              <TouchableOpacity
                style={styles.categorySelector}
                onPress={() => {}}>
                <Text style={[styles.title, {fontWeight: '500'}]}>
                  Choose Category
                </Text>
                <View style={styles.selectorRight}>
                  <Text style={styles.selectorRightText}>0 Selected</Text>
                  <ChevronRightIcon color={AppColors.primaryColor} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Apply"
              backgroundColor={AppColors.primaryColor}
              onPress={() => {}}
            />
          </View>
        </BottomSheetView>
      </ClickOutsideProvider>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  filterHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  filterOptions: {
    gap: 16,
  },
  optionContainer: {
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionItem: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    borderRadius: 100,
  },
  optionText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: AppColors.primaryTextColor,
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: AppColors.primaryColor100,
    borderRadius: 100,
  },
  resetButtonText: {
    color: AppColors.primaryColor,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  tabBarStyle: {
    display: 'flex',
    backgroundColor: 'transparent',
    zIndex: 0,
    elevation: 0,
    height: 70,
    borderTopWidth: 0,
    position: 'absolute',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.primaryTextColor,
  },
  categorySelector: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorRightText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: AppColors.secondaryTextColor,
  },
});

export default FilterBottomSheet;
