import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {AppColors} from 'constants/AppColors';
import AppButton from 'components/AppButton';
import HeaderBar from 'screens/layout/HeaderBar';
import {TrashIcon} from 'react-native-heroicons/solid';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import BottomSheet from '@gorhom/bottom-sheet';
import DeleteBottomSheet from './components/DeleteBottomSheet';
import StatusModal from 'components/StatusModal';

interface IDetailTransactionScreenProps {}

const {width, height} = Dimensions.get('window');

const DetailTransactionScreen: React.FunctionComponent<
  IDetailTransactionScreenProps
> = props => {
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {transactionId}: any = route.params;

  const [transaction, setTransaction] = useState<any>();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<any>();

  const filterRef = useRef<BottomSheet>(null);
  const fetchTransactionData = useRef<any>();

  useEffect(() => {
    fetchTransactionData.current = async () => {
      try {
        await firestore()
          .collection('transactions')
          .doc(transactionId)
          .get()
          .then(documentSnapshot => {
            const {createdAt, type, ...rest}: any = documentSnapshot.data();
            const date = createdAt.toDate().toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
            const time = createdAt.toDate().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            });

            let color = '';
            switch (type) {
              case 'income':
                color = AppColors.primaryGreen;
                break;
              case 'expense':
                color = AppColors.red;
                break;
              case 'transfer':
                color = AppColors.primaryBlue;
                break;

              default:
                break;
            }

            setTransaction({
              id: documentSnapshot.id,
              date: date,
              time: time,
              color: color,
              ...documentSnapshot.data(),
            });
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactionData.current();
    return fetchTransactionData.current;
  }, [isFocused]);

  const handleDeleteTransaction = async () => {
    try {
      await firestore().collection('transactions').doc(transactionId).delete();
      setStatusInfo({
        status: 'success',
        title: 'Delete transaction successfully!',
      });
      setShowStatus(true);
    } catch (error) {
      console.log(error);
      setStatusInfo({
        status: 'error',
        title: 'Failed to delete transaction!',
      });
      setShowStatus(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <HeaderBar
          name="Detail Transaction"
          backgroundColor={transaction?.color}
          color={AppColors.screenColor}
          icon={
            <TouchableOpacity onPress={() => setShowDelete(true)}>
              <TrashIcon color={AppColors.screenColor} />
            </TouchableOpacity>
          }
        />
        {showDelete && <View style={styles.overlay}></View>}
        <View
          style={[styles.infoContainer, {backgroundColor: transaction?.color}]}>
          <Text style={styles.mainPrice}>{`$${transaction?.balance}`}</Text>
          <Text style={styles.mainDesc}>{transaction?.title}</Text>
          <View style={styles.mainTimeContainer}>
            <Text style={styles.mainTime}>{transaction?.date}</Text>
            <Text style={styles.mainTime}>{transaction?.time}</Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryChildContainer}>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryTitle}>Type</Text>
                <Text style={styles.categoryText}>{transaction?.type}</Text>
              </View>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryTitle}>
                  {transaction?.type !== 'transfer' ? 'Category' : 'From'}
                </Text>
                <Text style={styles.categoryText}>
                  {transaction?.type !== 'transfer'
                    ? transaction?.category?.title
                    : transaction?.from?.title}
                </Text>
              </View>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryTitle}>
                  {transaction?.type !== 'transfer' ? 'Wallet' : 'To'}
                </Text>
                <Text style={styles.categoryText}>
                  {transaction?.type !== 'transfer'
                    ? transaction?.wallet?.title
                    : transaction?.to?.title}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView style={styles.descContainer}>
            <View style={styles.descItem}>
              <Text style={styles.descTitle}>Description</Text>
              <Text style={styles.descContent}>{transaction?.desc}</Text>
            </View>
            <View>
              <Text style={styles.descTitle}>Attachment</Text>
              <Image
                style={styles.descImage}
                source={{
                  uri: transaction?.attachment || 'https://picsum.photos/200',
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Edit"
            backgroundColor={AppColors.primaryColor}
            onPress={() => {
              switch (transaction?.type) {
                case 'expense':
                  navigation.navigate('EditExpense', {
                    transaction: transaction,
                  });
                  break;
                case 'income':
                  navigation.navigate('EditIncome', {
                    transaction: transaction,
                  });
                  break;
                case 'transfer':
                  navigation.navigate('EditTransfer', {
                    transaction: transaction,
                  });
                  break;

                default:
                  break;
              }
            }}
          />
        </View>
      </ScrollView>
      {showDelete && (
        <DeleteBottomSheet
          bottomSheetRef={filterRef}
          setShow={setShowDelete}
          handleDelete={handleDeleteTransaction}
        />
      )}
      {showStatus && (
        <StatusModal
          status={statusInfo.status}
          show={showStatus}
          setShow={setShowStatus}
          title={statusInfo.title}
          onClose={() => navigation.navigate('Transaction')}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  infoContainer: {
    alignItems: 'center',
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
    textTransform: 'capitalize',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});

export default DetailTransactionScreen;
