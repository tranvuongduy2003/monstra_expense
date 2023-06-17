import React from 'react';
import {LogBox, StyleSheet, View} from 'react-native';
import Pie from 'react-native-pie';

export interface PieSection {
  color: string;
  percentage: number;
}

interface IPieChartProps {
  data: PieSection[];
}

const PieChart: React.FunctionComponent<IPieChartProps> = ({data}) => {
  LogBox.ignoreAllLogs();

  return (
    <View style={styles.container}>
      <Pie
        radius={80}
        innerRadius={60}
        sections={data}
        dividerSize={0}
        strokeCap={'round'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: '100%',
  },
});

export default PieChart;
