import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
  ViewabilityConfig,
} from 'react-native';
import Pagination from './Pagination';
import SliderItem from './SliderItem';

interface ISliderProps {
  data: any;
}

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

type OnViewableItemsChangedEventHandler = (info: {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}) => void;

const Slider: React.FunctionComponent<ISliderProps> = ({data}) => {
  const [index, setIndex] = useState(0);

  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;

  const handleOnScroll: OnScrollEventHandler = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged =
    useRef<OnViewableItemsChangedEventHandler>(({viewableItems}) => {
      setIndex(viewableItems[0].index as number);
    }).current;

  const viewabilityConfig = useRef<ViewabilityConfig>({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <SliderItem
              imageSource={item.imageSource}
              title={item.title}
              desc={item.desc}
            />
          );
        }}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={data} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;
