import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';
import Checkbox from 'components/Checkbox';
import AppButton from 'components/AppButton';

interface ICategoryBottomSheetProps {
  setShow: any;
  bottomSheetRef: any;
  categories: any;
  setCategories: any;
}

const CategoryBottomSheet: React.FunctionComponent<
  ICategoryBottomSheetProps
> = ({setShow, bottomSheetRef, setCategories, categories}) => {
  const snapPoints = useMemo(() => ['65%'], []);

  const [selectedCategories, setSelectedCategories] = useState(categories);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => setShow(false)}>
      <BottomSheetView
        style={{
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <View style={styles.container}>
          <View style={styles.filterHeader}>
            <Text style={styles.title}>Select category</Text>
          </View>
          <View style={styles.categoryContainer}>
            {selectedCategories.map((option, index) => (
              <View style={styles.itemContainer} key={index}>
                <Checkbox
                  checked={selectedCategories[index].checked as boolean}
                  setChecked={() => {
                    const newCategories = [...selectedCategories];
                    newCategories[index].checked =
                      !selectedCategories[index].checked;
                    setCategories([...newCategories]);
                  }}
                />
                <Text style={styles.itemText}>{option.title}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Select"
            backgroundColor={AppColors.primaryColor}
            onPress={() => {
              setCategories(selectedCategories);
              setShow(false);
            }}
          />
        </View>
      </BottomSheetView>
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
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 19,
    color: AppColors.primaryTextColor,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemText: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 19,
    color: AppColors.primaryTextColor,
  },
  categoryContainer: {
    paddingHorizontal: 10,
    gap: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});

export default CategoryBottomSheet;
