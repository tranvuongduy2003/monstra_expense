import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const MoneyExchangeIcon = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#FCFCFC"
      d="M6 24a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM18 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM2.16 10a.791.791 0 0 0 .3.05 1 1 0 0 0 1-.7A9 9 0 0 1 8 4v1a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1H5a1 1 0 0 0 0 2h2.42A11 11 0 0 0 1.5 8.7a1 1 0 0 0 .66 1.3ZM15 18a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 1 0 0-2h-2.43a11.001 11.001 0 0 0 6.21-7.8 1.019 1.019 0 1 0-2-.4A9 9 0 0 1 16 20.05V19a1 1 0 0 0-1-1Z"
    />
  </Svg>
);
export default MoneyExchangeIcon;
