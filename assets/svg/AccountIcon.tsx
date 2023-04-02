import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const AccountIcon = (props: SvgProps) => {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19.91 4.09A4.6 4.6 0 0019 4H7a1 1 0 010-2h12a5 5 0 00-4-2H5a5 5 0 00-4 2 4.94 4.94 0 00-1 3v14a5 5 0 005 5h14a5 5 0 005-5V9a5 5 0 00-4.09-4.91zM17.24 17c-.08.01-.16.01-.24 0a3 3 0 010-6 2.77 2.77 0 011 .18 3 3 0 01-.76 5.8V17z"
        fill="#7F3DFF"
      />
      <Path d="M17 15a1 1 0 100-2 1 1 0 000 2z" fill="#7F3DFF" />
    
    </Svg>
  )
}

export default AccountIcon;
