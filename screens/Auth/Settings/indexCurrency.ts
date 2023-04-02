export type Currency = {
  id: string;
  title: string;
  currency: string;
};

export const CurrencyDATA: Currency[] = [
    {
      id: 'US',
      title: 'United States (USD)',
      currency: 'USD',
    },
    {
      id: 'ID',
      title: 'Indonesia (IDR)',
      currency: 'IDR',
    },
    {
      id: 'JP',
      title: 'Japan (JPY)',
      currency: 'JPY',
    },
    {
      id: 'RUS',
      title: 'Russia (RUB)',
      currency: 'RUB',
    },
    {
      id: 'GM',
      title: 'Germany (EUR)',
      currency: 'EUR',
    },
    {
      id: 'KR',
      title: 'Korea (WON)',
      currency: 'WON',
    },
  ];