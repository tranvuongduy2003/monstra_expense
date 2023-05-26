import {AppColors} from 'constants/AppColors';
import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from 'react-native-heroicons/solid';

interface IStatusModalProps {
  status: 'success' | 'error';
  title: string;
  show?: boolean;
  setShow: (props: any) => void;
  onClose?: any;
}

const StatusModal: React.FunctionComponent<IStatusModalProps> = ({
  status,
  title,
  show,
  setShow,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(!show);
      onClose && onClose();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {status === 'error' && (
            <ExclamationCircleIcon size={48} color={AppColors.red} />
          )}
          {status === 'success' && (
            <CheckCircleIcon size={48} color={AppColors.primaryColor} />
          )}
          <Text style={styles.modalTitle}>{title}</Text>
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

export default StatusModal;
