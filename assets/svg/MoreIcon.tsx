import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const MoreIcon = (props: SvgProps) => {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.333 16a2.667 2.667 0 115.334 0 2.667 2.667 0 01-5.334 0zM22.667 16A2.667 2.667 0 1128 16a2.667 2.667 0 01-5.333 0zM4 16a2.667 2.667 0 115.333 0A2.667 2.667 0 014 16z"
        fill="#161719"
      />
    </Svg>
  )
}

export default MoreIcon;
