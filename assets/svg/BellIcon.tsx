import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const BellIcon = (props: SvgProps) => {
  return (
    <Svg
      width={22}
      height={25}
      viewBox="0 0 22 25"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21 18.5a3.09 3.09 0 01-3.11 2.5H4.11A3.09 3.09 0 011 18.5a3 3 0 011.52-3.13.93.93 0 00.48-.83V11a8 8 0 015-7.43 3 3 0 016 .03 8.36 8.36 0 015 7.69v3.25a.93.93 0 00.44.83A3 3 0 0121 18.5zM11 25a3.999 3.999 0 003.44-2H7.56A4 4 0 0011 25z"
        fill="#7F3DFF"
      />
    </Svg>
  )
}

export default BellIcon;
