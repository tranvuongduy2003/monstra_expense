import {ReactElement} from 'react';
import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  TruckIcon,
} from 'react-native-heroicons/solid';
import {AppColors} from './AppColors';

type IconType = {
  bgColor: string;
  color: string;
  child: ReactElement;
};

export const icons = new Map<string, IconType>([
  [
    'salary',
    {
      color: AppColors.primaryGreen,
      bgColor: AppColors.primaryGreen100,
      child: <BanknotesIcon color={AppColors.primaryGreen} fontSize={30} />,
    },
  ],
  [
    'passive-income',
    {
      color: AppColors.black,
      bgColor: AppColors.black100,
      child: <ShoppingBagIcon color={AppColors.black} fontSize={30} />,
    },
  ],
  [
    'shopping',
    {
      color: AppColors.yellow,
      bgColor: AppColors.yellow100,
      child: <ShoppingBagIcon color={AppColors.yellow} fontSize={30} />,
    },
  ],
  [
    'subscription',
    {
      color: AppColors.primaryColor,
      bgColor: AppColors.primaryColor100,
      child: (
        <ClipboardDocumentListIcon
          color={AppColors.primaryColor}
          fontSize={30}
        />
      ),
    },
  ],
  [
    'food',
    {
      color: AppColors.red,
      bgColor: AppColors.red100,
      child: <BuildingStorefrontIcon color={AppColors.red} fontSize={30} />,
    },
  ],
  [
    'transportation',
    {
      color: AppColors.primaryBlue,
      bgColor: AppColors.primaryBlue100,
      child: <TruckIcon color={AppColors.primaryBlue} fontSize={30} />,
    },
  ],
]);
