export interface IAccount {
  id: string;
  balance: number;
  name: string;
  type: string;
  type_item: TypeItem;
  userId: string;
}

export interface TypeItem {
  id: string;
  image: number;
  name: string;
}
