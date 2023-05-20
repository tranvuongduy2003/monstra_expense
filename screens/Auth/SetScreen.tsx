import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Image, Text, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {ImagesAssets} from 'assets/images/ImagesAssets';
import {AuthContext} from 'providers/AuthProvider';

interface ISetScreenProps {}

const SetScreen: React.FunctionComponent<ISetScreenProps> = props => {
  const {setLoggedIn} = useContext(AuthContext) as any;

  useEffect(() => {
    const timer = setInterval(() => setLoggedIn(true), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={ImagesAssets.Success} resizeMode="contain" />
        <Text style={styles.title}>You are set!</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 29,
    color: AppColors.primaryTextColor,
    marginTop: 32,
    textAlign: 'center',
  },
});

export default SetScreen;
