import {ICategory} from './ICategory';

export interface IBudget {
  expenses: ExpenseItem[];
  budget: number;
  category: ICategory;
  createdAt: any;
  id: string;
  isReceiveAlert: boolean;
  limit: number;
  userId: string;
}

export interface ExpenseItem {
  id: string;
  balance: number;
}
