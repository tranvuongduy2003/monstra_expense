import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import RectangleIcon from 'assets/svg/RectangleIcon';

interface IExportNotiScreenProps {
  onPress?: () => void;
}
const ExporNotitScreen: React.FunctionComponent<IExportNotiScreenProps> = ({
  onPress = () => {},
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.picture}>
          <RectangleIcon></RectangleIcon>
        </View>
        <View>
          <Text style={styles.content}>
            Check your email, we send you the financial {'\n'}report. In certain cases, it might take a little {'\n'}longer, depending on the time period and {'\n'}the volume of activity.
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Back To Home</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  topContainer: {
    flex: 446,
    marginTop: scale(32),
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  picture: {
    marginTop: scale(32),
    width: scale(312),
    height: scale(290),
  },
  content: {
    fontSize: scale(16),
    textAlign: 'center',
    color: AppColors.primaryTextColor,
  },
  bottomContainer: {
    flex: 355,
    flexDirection: 'column-reverse',
    marginBottom: scale(50),
  },
  button: {
    width: scale(343),
    height: scale(56),
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: AppColors.primaryColor,
  },
  titleContainer: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: scale(16),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: AppColors.white,
    marginLeft: scale(10),
  },
});

export default ExporNotitScreen;
