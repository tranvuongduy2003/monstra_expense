import React from 'react';
import {LanguageDATA} from './indexLanguage';
import SelectData from './SelectData';

interface ILanguageScreenProps {}
const LanguageScreen: React.FunctionComponent<ILanguageScreenProps> = ({}) => {
  return (
    <SelectData data={LanguageDATA} objKey="id" objValue="title"></SelectData>
  );
};

export default LanguageScreen;
