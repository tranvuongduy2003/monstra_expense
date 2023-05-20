export interface IAccount {
  userId: string;
  balance: number;
  name: string;
  type: 'Bank' | 'Wallet';
}
