import {AppColors} from 'constants/AppColors';
import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {CheckCircleIcon} from 'react-native-heroicons/solid';

interface IAddSuccessModalProps {
  show?: boolean;
  setShow: (props: any) => void;
}

const AddSuccessModal: React.FunctionComponent<IAddSuccessModalProps> = ({
  show,
  setShow,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(!show);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CheckCircleIcon size={48} color={AppColors.primaryColor} />
          <Text style={styles.modalTitle}>
            Transaction has been successfully added
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: AppColors.screenColor,
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: AppColors.primaryTextColor,
  },
});

export default AddSuccessModal;
