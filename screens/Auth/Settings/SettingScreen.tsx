import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import SettingButton from 'components/SettingButton';
import {useNavigation} from '@react-navigation/native';

interface ISettingsScreenProps {}

const SettingsScreen: React.FunctionComponent<ISettingsScreenProps> = props => {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.settingContainer}>
            <SettingButton 
                title='Currency'
                detailTitle='USD'
                onPress={() => navigation.navigate('Currency' as never)}
            ></SettingButton>
            <SettingButton 
                title='Language'
                detailTitle='English'
                onPress={() => navigation.navigate('Currency' as never)}
            ></SettingButton>
            <SettingButton 
                title='Theme'
                detailTitle='Dark'
                onPress={() => navigation.navigate('Currency' as never)}
            ></SettingButton>
            <SettingButton 
                title='Security'
                detailTitle='Fingerprint'
                onPress={() => navigation.navigate('Currency' as never)}
            ></SettingButton>
            <SettingButton 
                title='Notification'
                detailTitle=''
                onPress={() => navigation.navigate('Currency' as never)}
            ></SettingButton>
        </View>
        <View style={styles.moreContainer}>
            <View style={{height: scale(32)}}></View>
            <SettingButton 
                title='About'
                detailTitle=''
                onPress={() => navigation.navigate('Currency' as never)}
            ></SettingButton>
            <SettingButton 
                title='Help'
                detailTitle=''
                onPress={() => navigation.navigate('Currency' as never)}
            ></SettingButton>
        </View>
        <View style={styles.blankSpace}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.cultured,
    },
    settingContainer: {
        flex: 280,
        backgroundColor: AppColors.white,
    },
    // settingButton: {
    //     width: scale(375),
    //     flex: 70,
    //     backgroundColor: AppColors.cultured,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // content: {
    //     width: scale(343),
    //     height: scale(24),
    //     backgroundColor: AppColors.mistyRose,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // detailContainer: {
    //     flexDirection: 'row-reverse',
    //     alignItems: 'center',
    // },
    // icon: {
    //     width: scale(24),
    //     height: scale(24),
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    moreContainer: {
        flex: 144,
        backgroundColor: AppColors.white,
    },
    blankSpace: {
        flex: 280,
        backgroundColor: AppColors.white,
    }
});

export default SettingsScreen;
