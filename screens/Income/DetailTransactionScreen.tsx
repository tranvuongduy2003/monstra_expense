import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {AppColors} from 'constants/AppColors';
import AppButton from 'components/AppButton';

interface IDetailTransactionScreenProps {}

const {width, height} = Dimensions.get('window');

const DetailTransactionScreen: React.FunctionComponent<
  IDetailTransactionScreenProps
> = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.infoContainer}>
          <Text style={styles.mainPrice}>$120</Text>
          <Text style={styles.mainDesc}>Buy some grocery</Text>
          <View style={styles.mainTimeContainer}>
            <Text style={styles.mainTime}>Saturday 4 June 2021</Text>
            <Text style={styles.mainTime}>16:20</Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryChildContainer}>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryTitle}>Type</Text>
                <Text style={styles.categoryText}>Expense</Text>
              </View>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryTitle}>Category</Text>
                <Text style={styles.categoryText}>Shopping</Text>
              </View>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryTitle}>Wallet</Text>
                <Text style={styles.categoryText}>Wallet</Text>
              </View>
            </View>
          </View>
          <ScrollView style={styles.descContainer}>
            <View style={styles.descItem}>
              <Text style={styles.descTitle}>Description</Text>
              <Text style={styles.descContent}>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </Text>
            </View>
            <View>
              <Text style={styles.descTitle}>Attachment</Text>
              <Image
                style={styles.descImage}
                source={{uri: 'https://picsum.photos/200'}}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Edit"
            backgroundColor={AppColors.primaryColor}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    backgroundColor: AppColors.red,
    paddingBottom: 50,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  mainPrice: {
    fontWeight: '700',
    fontSize: 48,
    lineHeight: 80,
    color: AppColors.screenColor,
  },
  mainDesc: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.screenColor,
    marginBottom: 8,
  },
  mainTimeContainer: {
    gap: 12,
    flexDirection: 'row',
  },
  mainTime: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
    color: AppColors.screenColor,
  },
  detailContainer: {
    backgroundColor: AppColors.screenColor,
    // paddingBottom: 50,
    flex: 1,
    paddingHorizontal: 16,
  },
  descContainer: {
    marginBottom: 40,
    height: 0.4 * height,
  },
  descItem: {
    marginBottom: 15,
  },
  descTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    color: AppColors.secondaryTextColor,
    marginBottom: 15,
  },
  descContent: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.primaryTextColor,
  },
  descImage: {
    borderRadius: 8,
    width: width - 30,
    height: 116,
  },
  categoryContainer: {
    paddingBottom: 17,
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    borderColor: AppColors.borderColor,
    marginBottom: 15,
    marginTop: -35,
  },
  categoryChildContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: AppColors.screenColor,
    borderColor: AppColors.borderColor,
    borderWidth: 1,
  },
  categoryItem: {
    flexDirection: 'column',
    gap: 9,
    alignItems: 'center',
  },
  categoryTitle: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: AppColors.secondaryTextColor,
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.primaryTextColor,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});

export default DetailTransactionScreen;
