import React from 'react';
import {CurrencyDATA} from './data/indexCurrency';
import SelectData from './SelectData';

interface ICurrencyScreenProps {}
const CurrencyScreen: React.FunctionComponent<ICurrencyScreenProps> = ({}) => {
  return (
    <SelectData data={CurrencyDATA} objKey="id" objValue="title"></SelectData>
  );
};

export default CurrencyScreen;
