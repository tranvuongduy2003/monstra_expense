import React, {ReactElement} from 'react';
import { useState } from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity, FlatList, ListRenderItem} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import CheckedIcon from 'assets/svg/CheckedIcon';
import { Currency, CurrencyDATA } from './indexCurrency';

interface ICurrencyScreenProps {
    item?: Currency;
    onPress?: () => void;
    children?: ReactElement;
}

const Option = (item: any, onPress: any, selectedId: any) => {
    const OptionComponent = () => {
        return (
            <TouchableOpacity 
            style={styles.settingButton} 
            onPress={onPress}>
            <View style={styles.content}>
                <Text style={styles.title}>{item?.title}</Text>
                {selectedId === item.id ? 
                <View style={styles.icon}>
                    <CheckedIcon></CheckedIcon>
                </View> : null}
          </View>
        </TouchableOpacity>
        );
    }
    return {OptionComponent};
}

const CurrencyScreen: React.FunctionComponent<ICurrencyScreenProps> = ({

}) => {
    const optionComponent = Option;
    const [selectedId, setSelectedId] = useState(null);

    const renderOption = (item: any) => {
        const {OptionComponent} = optionComponent(item, ()=>toggleSelect(item), selectedId)
        return {OptionComponent};
  };

  function toggleSelect(item: any) {
    if (item?.id === selectedId) {
        setSelectedId(null)
    }
    else {
        setSelectedId(item)
    }
}

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.settingContainer}>
            <FlatList
                data={CurrencyDATA}
                //keyExtractor={item => item.id}
                keyExtractor={(_, index) => String(index)}
                renderItem={({item}) => renderOption(item)}
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
