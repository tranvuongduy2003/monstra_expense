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
  name: string;
  desc: string;
  type: 'Income' | 'Expense' | 'Transfer';
  transactionId: string;
}
