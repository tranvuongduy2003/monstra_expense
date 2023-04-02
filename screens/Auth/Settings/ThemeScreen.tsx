import React from 'react';
import {ThemeDATA} from './indexTheme';
import SelectData from './SelectData';

interface IThemeScreenProps {}
const ThemeScreen: React.FunctionComponent<IThemeScreenProps> = ({}) => {
  return (
    <SelectData data={ThemeDATA} objKey="id" objValue="title"></SelectData>
  );
};

export default ThemeScreen;
