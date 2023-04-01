import React, {ReactElement} from 'react';
import { useState } from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity, FlatList, ListRenderItem} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import CheckedIcon from 'assets/svg/CheckedIcon';
import { Currency, CurrencyDATA } from './indexCurrency';

interface ICurrencyScreenProps {
    item: Currency;
    onPress?: () => void;
    children?: ReactElement;
}

const CurrencyScreen: React.FunctionComponent<ICurrencyScreenProps> = ({
}) => {
    const [selectedId, setSelectedId] = useState<string>();

    const renderItem = ({item}: {item: Currency}) => {
        return (
            <TouchableOpacity 
            style={styles.settingButton} 
            onPress={() => {}}>
            <View style={styles.content}>
                <Text style={styles.title}>{item?.title}</Text>
                {selectedId === item.id ? 
                <View style={styles.icon}>
                    <CheckedIcon></CheckedIcon>
                </View> : null}
          </View>
        </TouchableOpacity>
        );
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.settingContainer}>
            <FlatList
                data={CurrencyDATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
            ></FlatList>
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
