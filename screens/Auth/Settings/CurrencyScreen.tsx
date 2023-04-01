import React, {ReactElement} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import CheckedIcon from 'assets/svg/CheckedIcon';

interface ICurrencyScreenProps {
    onPress?: () => void;
    children?: ReactElement;
}

const CurrencyScreen: React.FunctionComponent<ICurrencyScreenProps> = ({
    onPress = () => {},
    children,
}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.settingContainer}></View>
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
        flex: 312,
        backgroundColor: AppColors.white,
    },
    settingButton: {
        width: scale(375),
        flex: 70,
        backgroundColor: AppColors.mistyRose,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: scale(343),
        height: scale(24),
        backgroundColor: AppColors.lavender,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: scale(16),
        color: AppColors.titleColor,
    },
    icon: {
        width: scale(24),
        height: scale(24),
        justifyContent: 'center',
        alignItems: 'center',
    },
    blankSpace: {
        flex: 395,
    }
});

export default CurrencyScreen;
