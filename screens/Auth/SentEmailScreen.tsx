import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {ImagesAssets} from 'assets/images/ImagesAssets';
import AppButton from 'components/AppButton';
import {useNavigation, useRoute} from '@react-navigation/native';

interface ISentEmailScreenProps {}

const SentEmailScreen: React.FunctionComponent<ISentEmailScreenProps> = () => {
  const navigation = useNavigation();
  const route: any = useRoute();

  const {email} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={styles.imageContainer}>
            <Image source={ImagesAssets.SentEmail} resizeMode="contain" />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Your email is on the way</Text>
            <Text style={styles.description}>
              {`Check your email ${email} and follow the instructions to reset your password`}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Back to Login"
            backgroundColor={AppColors.primaryColor}
            onPress={() => navigation.navigate('Login' as never)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 24,
    gap: 24,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
    color: AppColors.primaryTextColor,
    textAlign: 'center',
  },
  description: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.primaryTextColor,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 50,
    paddingHorizontal: 20,
  },
});

export default SentEmailScreen;
