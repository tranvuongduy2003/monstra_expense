import React, {ReactElement} from 'react';
import {TouchableOpacity, Text, Dimensions, StyleSheet, View} from 'react-native';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import ArrowRIcon from 'assets/svg/ArrowRightIcon';

interface ISettingButtonProps {
//backgroundColor?: string;
  title?: string;
  detailTitle? :string;
  //color?: string;
  //onPress?: () => void;
  //children?: ReactElement;
}

const SettingButton: React.FunctionComponent<ISettingButtonProps> = ({
  title,
  detailTitle,
  //onPress = () => {},
  //children,
}) => {
  return (
    <TouchableOpacity style={styles.settingButton}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.detailContainer}>
                        <View style={styles.icon}>
                            <ArrowRIcon></ArrowRIcon>
                        </View>
                        <Text style={styles.detailTitle}>{detailTitle}</Text>
                    </View>
                </View>
    </TouchableOpacity>
//<TouchableOpacity
        //    style={[
        //styles.container,
        //backgroundColor
       //   ? {backgroundColor: backgroundColor}
        //  : styles.whiteButton,
     // ]}
     // onPress={onPress}>
     // {title ? <Text style={[styles.title, {color}]}>{title}</Text> : children}
    //</TouchableOpacity> */}
  );
};

const styles = StyleSheet.create({
settingContainer: {
    flex: 280,
    backgroundColor: AppColors.white,
},
settingButton: {
    width: scale(375),
    flex: 70,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
},
content: {
    width: scale(343),
    height: scale(24),
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
},
title: {
    fontSize: scale(16),
    color: AppColors.titleColor,
},
detailContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
},
detailTitle: {
    fontSize: scale(14),
    color: AppColors.secondaryTextColor,
},
icon: {
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
},
});

export default SettingButton;
