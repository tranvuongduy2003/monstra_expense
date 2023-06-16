import {ReactElement} from 'react';
import {ICategory} from './ICategory';

export interface IIncome {
  userId: string;
  value: number;
  category: 'Salary' | 'Passive income';
  desc: string;
  wallet: string;
  attachment: string;
  repeat: boolean;
  frequency: string;
}

export interface IExpense {
  userId: string;
  value: number;
  category: 'Transportation' | 'Subscription' | 'Shopping' | 'Food';
  desc: string;
  wallet: string;
  attachment: string;
  repeat: boolean;
  frequency: string;
}

export interface ITransfer {
  userId: string;
  from: string; // account
  to: string; //account
  desc: string;
  attachment: string;
}

export interface ITransaction {
  desc: string;
  icon: ReactElement;
  balance: number;
  category: ICategory;
  iconBgColor: string;
  id: string;
  price: number;
  time: string;
  title: string;
  type: string;
  userId: string;
}
