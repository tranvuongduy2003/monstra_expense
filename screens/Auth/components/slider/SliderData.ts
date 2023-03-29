import {ImagesAssets} from 'assets/images/ImagesAssets';
import {ImageSourcePropType} from 'react-native';

export type SliderItemType = {
  id: number;
  imageSource: ImageSourcePropType;
  title: string;
  desc: string;
};

export const SliderItems: SliderItemType[] = [
  {
    id: 1,
    imageSource: ImagesAssets.illustration1,
    title: 'Gain total control\nof your money',
    desc: 'Become your own money manager\nand make every cent count',
  },
  {
    id: 2,
    imageSource: ImagesAssets.illustration2,
    title: 'Know where your\nmoney goes',
    desc: 'Track your transaction easily,\nwith categories and financial report ',
  },
  {
    id: 3,
    imageSource: ImagesAssets.illustration3,
    title: 'Planning ahead',
    desc: 'Setup your budget for each category\nso you in control',
  },
];
