import React from 'react';

import {
  Canvas,
  Path,
  Skia,
  SkPath,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';

import {AppColors} from 'constants/AppColors';
import {curveBasis, line, scaleLinear, scaleTime} from 'd3';
import {Dimensions, StyleSheet, View} from 'react-native';

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}

export type DataPoint = {
  date: string;
  value: number;
};

interface ILineChartProps {
  data: DataPoint[];
}

const {width} = Dimensions.get('screen');
const GRAPH_HEIGHT = 220;
const GRAPH_WIDTH = width;

const makeGraph = (data: DataPoint[]): GraphData => {
  const max = Math.max(...data.map(val => val.value));
  const min = Math.min(...data.map(val => val.value));
  const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);

  const x = scaleTime()
    .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
    .range([0, GRAPH_WIDTH]);

  const curvedLine = line<DataPoint>()
    .x(d => x(new Date(d.date)))
    .y(d => y(d.value))
    .curve(curveBasis)(data);

  const skPath = Skia.Path.MakeFromSVGString(curvedLine!);

  return {
    max,
    min,
    curve: skPath!,
  };
};

export const LineChart: React.FunctionComponent<ILineChartProps> = ({data}) => {
  const transition = useValue(1);
  const state = useValue({
    current: 0,
    next: 1,
  });

  const graphData = makeGraph(data);

  const path = useComputedValue(() => {
    const start = graphData.curve;
    const end = graphData.curve;
    const result = start.interpolate(end, transition.current);
    return result?.toSVGString() ?? '0';
  }, [state, transition, data]);

  return (
    <View style={styles.container}>
      <Canvas
        style={{
          width: GRAPH_WIDTH,
          height: GRAPH_HEIGHT,
        }}>
        <Path
          style="stroke"
          path={path}
          strokeWidth={4}
          color={AppColors.primaryColor}
        />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    marginRight: 20,
    backgroundColor: '#6231ff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
  },
});
