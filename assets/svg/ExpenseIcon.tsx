import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const ExpenseIcon = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={29}
    fill="none"
    {...props}>
    <Path
      fill="#FCFCFC"
      d="M19 13H5a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-6a5 5 0 0 0-5-5Zm-7 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
    />
    <Path
      fill="#FCFCFC"
      d="M12 23a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12.71 1.29a.999.999 0 0 0-1.42 0L7.05 5.54A1.015 1.015 0 0 0 8.46 7L11 4.41V10a1 1 0 0 0 2 0V4.41L15.54 7a1 1 0 0 0 .7.29A1 1 0 0 0 17 7a1 1 0 0 0 0-1.41l-4.29-4.3Z"
    />
  </Svg>
);

export default ExpenseIcon;
