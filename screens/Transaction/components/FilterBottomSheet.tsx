import React, {useCallback, useMemo, useRef, useState} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppButton from 'components/AppButton';
import {AppColors} from 'constants/AppColors';
import {useNavigation} from '@react-navigation/native';
import {ChevronRightIcon} from 'react-native-heroicons/outline';
import CategoryBottomSheet from './CategoryBottomSheet';
import {OptionType} from 'types/option.type';
import {
  expenseCategoryOptions,
  incomeCategoryOptions,
} from 'constants/Category';

interface IFilterBottomSheetProps {
  setShow: any;
  bottomSheetRef: any;
  handleApply: any;
  orderBy: any;
  setOrderBy: any;
  filterBy: any;
  setFilterBy: any;
  categories: any;
  setCategories: any;
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
  handleApply,
  orderBy,
  setOrderBy,
  filterBy,
  setFilterBy,
  categories,
  setCategories,
}) => {
  const navigation = useNavigation();
  const [showCategory, setShowCategory] = useState<boolean>(false);

  const snapPoints = useMemo(() => ['65%'], []);

  const categoryRef = useRef<BottomSheet>(null);

  const handleCategorySheetChanges = useCallback((index: number) => {
    categoryRef.current?.snapToIndex(index);
    setShowCategory(true);
  }, []);

  const handleReset = () => {
    setFilterBy(null);
    setOrderBy(null);
    setCategories(
      [...incomeCategoryOptions, ...expenseCategoryOptions].map(option => ({
        checked: false,
        ...option,
      })),
    );
  };

  return (
    <>
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
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleReset}>
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
              </View>
              {/* FILTER BY */}
              <View style={styles.filterOptions}>
                <Text style={styles.title}>Filter By</Text>
                <View style={styles.optionContainer}>
                  {filterOptions.map((option, index) => (
                    <TouchableOpacity
                      onPress={() => setFilterBy(option)}
                      key={index}
                      style={[
                        styles.optionItem,
                        filterBy?.value === option.value &&
                          styles.seletedOptionItem,
                      ]}>
                      <Text
                        style={[
                          styles.optionText,
                          filterBy?.value === option.value &&
                            styles.seletedOptionText,
                        ]}>
                        {option.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              {/* SORT BY */}
              <View style={styles.filterOptions}>
                <Text style={styles.title}>Sort By</Text>
                <View style={styles.optionContainer}>
                  {sortOptions.map((option, index) => (
                    <TouchableOpacity
                      onPress={() => setOrderBy(option)}
                      key={index}
                      style={[
                        styles.optionItem,
                        orderBy?.value === option.value &&
                          styles.seletedOptionItem,
                      ]}>
                      <Text
                        style={[
                          styles.optionText,
                          orderBy?.value === option.value &&
                            styles.seletedOptionText,
                        ]}>
                        {option.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              {/* CATEGORY */}
              <View style={styles.filterOptions}>
                <Text style={styles.title}>Category</Text>
                <TouchableOpacity
                  style={styles.categorySelector}
                  onPress={() => setShowCategory(true)}>
                  <Text style={[styles.title, {fontWeight: '500'}]}>
                    Choose Category
                  </Text>
                  <View style={styles.selectorRight}>
                    <Text style={styles.selectorRightText}>{`${
                      categories.filter(item => item.checked).length
                    } Selected`}</Text>
                    <ChevronRightIcon color={AppColors.primaryColor} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <AppButton
                title="Apply"
                backgroundColor={AppColors.primaryColor}
                onPress={() => {
                  const filteredCategories = categories
                    .filter(item => item.checked)
                    .map(item => {
                      const {checked, ...rest} = item;
                      return {...rest};
                    });
                  handleApply(
                    filterBy?.value,
                    orderBy?.value,
                    filteredCategories,
                  );
                  setShow(false);
                  navigation.setOptions({tabBarStyle: styles.tabBarStyle});
                }}
              />
            </View>
          </BottomSheetView>
        </ClickOutsideProvider>
      </BottomSheet>
      {showCategory && (
        <CategoryBottomSheet
          bottomSheetRef={categoryRef}
          setShow={setShowCategory}
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </>
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
  seletedOptionItem: {
    borderColor: 'none',
    backgroundColor: AppColors.primaryColor100,
  },
  optionText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: AppColors.primaryTextColor,
  },
  seletedOptionText: {
    color: AppColors.primaryColor,
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
