import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const UserIcon = (props: SvgProps) => (
  <Svg
    {...props}
    width={24}
    height={24}
    fill="none"
    //xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M10 12.07a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM13 14H7a7 7 0 0 0-7 7 3 3 0 0 0 3 3h14a3 3 0 0 0 3-3 7 7 0 0 0-7-7Z"
      fill="#7F3DFF"
    />
  </Svg>
);

export default UserIcon;
