import BottomSheet from '@gorhom/bottom-sheet';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import StatusModal from 'components/StatusModal';
import TextArea from 'components/TextArea';
import {AppColors} from 'constants/AppColors';
import {AuthContext} from 'providers/AuthProvider';
import React, {useCallback, useContext, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AttachmentBottomSheet from 'screens/Expense/components/AttachmentBottomSheet';
import {OptionType} from 'types/option.type';

interface IEditProfileScreenProps {}

const genderOptions: OptionType[] = [
  {
    value: 'male',
    title: 'Male',
  },
  {
    value: 'female',
    title: 'Female',
  },
  {
    value: 'other',
    title: 'Other',
  },
];

const EditProfileScreen: React.FunctionComponent<
  IEditProfileScreenProps
> = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {user} = useContext(AuthContext) as any;

  const [name, setName] = useState<string>(user.name);
  const [dob, setDob] = useState<Date>(user.dob?.toDate());
  const [gender, setGender] = useState<OptionType>(user.gender || null);
  const [desc, setDesc] = useState<string>(user.desc || '');

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showInform, setShowInform] = useState<boolean>(false);
  const [statusInfo, setStatusInfo] = useState<any>();
  const [avatar, setAvatar] = useState<any>(user.avatar);
  const [showAttachment, setShowAttachment] = useState<boolean>(false);

  const attachmentRef = useRef<BottomSheet>(null);

  const handleAttachmentSheetChanges = useCallback((index: number) => {
    attachmentRef.current?.snapToIndex(index);
    setShowAttachment(true);
  }, []);

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const payload: any = await new Promise(async resolve => {
        if (avatar.uri) {
          const reference = storage().ref('expense/' + avatar.fileName);
          await reference.putFile(avatar.uri);
          const attachmentURL = await reference.getDownloadURL();
          resolve({
            avatar: attachmentURL,
            name: name,
            dob: dob,
            gender: gender,
            desc: desc,
          });
        } else {
          resolve({
            name: name,
            dob: dob,
            gender: gender,
            desc: desc,
          });
        }
      });

      await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .update(payload);
      setStatusInfo({
        status: 'success',
        title: 'Edit profile successfully!',
      });
      setShowInform(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setStatusInfo({
        status: 'error',
        title: 'Failed to edit profile!',
      });
      setLoading(false);
      setShowInform(true);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const {assets}: any = await launchCamera({
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
      });
      setAvatar(assets[0]);
      setShowAttachment(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChoosePhoto = async () => {
    try {
      const {assets}: any = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
      });
      setAvatar(assets[0]);
      setShowAttachment(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        {(showInform || showAttachment) && <View style={styles.overlay}></View>}
        <View>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => handleAttachmentSheetChanges(0)}>
            <View style={styles.avatar}>
              {avatar && (
                <Image
                  source={{
                    uri: avatar.uri || avatar,
                  }}
                  style={{width: '96%', height: '96%', borderRadius: 100}}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.form}>
            <Input
              placeholder="Name"
              name="Name"
              onChangeText={setName}
              defaultValue={name}
            />
            <Pressable style={styles.dob} onPress={() => setOpen(true)}>
              <Text
                style={[
                  styles.input,
                  !dob && {color: AppColors.secondaryTextColor},
                ]}>
                {dob ? dob.toLocaleDateString('vi-VN') : 'Date of birth'}
              </Text>
            </Pressable>
            <Dropdown
              zIndex={50}
              options={genderOptions}
              placeholder="Gender"
              select={gender}
              setSelect={setGender}
            />
            <TextArea
              placeholder="Description"
              name="Description"
              defaultValue={desc}
              onChangeText={setDesc}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            loading={loading}
            title="Save"
            backgroundColor={AppColors.primaryColor}
            onPress={handleEditProfile}
          />
        </View>
      </ScrollView>
      {showInform && (
        <StatusModal
          status={statusInfo.status}
          show={showInform}
          setShow={setShowInform}
          title={statusInfo.title}
          onClose={() => statusInfo.status === 'success' && navigation.goBack()}
        />
      )}
      {showAttachment && (
        <AttachmentBottomSheet
          bottomSheetRef={attachmentRef}
          setShow={setShowAttachment}
          handleChoosePhoto={handleChoosePhoto}
          handleTakePhoto={handleTakePhoto}
        />
      )}
      <DatePicker
        modal
        mode="date"
        open={open}
        date={dob || new Date()}
        onConfirm={date => {
          setOpen(false);
          setDob(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  avatarContainer: {
    margin: 40,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 84,
    borderWidth: 2,
    borderColor: '#AD00FF',
    backgroundColor: AppColors.mistyRose,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingHorizontal: 16,
    gap: 12,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 50,
  },
  dob: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#F1F1FA',
    borderRadius: 16,
  },
  input: {
    color: AppColors.primaryTextColor,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
  },
});

export default EditProfileScreen;
