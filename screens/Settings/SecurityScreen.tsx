import React from 'react';
import {SecurityDATA} from './data/indexSecurity';
import SelectData from './SelectData';

interface ISecurityScreenProps {}
const SecurityScreen: React.FunctionComponent<ISecurityScreenProps> = ({}) => {
  return (
    <SelectData data={SecurityDATA} objKey="id" objValue="title"></SelectData>
  );
};

export default SecurityScreen;
