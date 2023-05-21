import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const ChangeIcon = (props: SvgProps) => {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.19 8.46l-12 12a2.06 2.06 0 01-1 .54l-3.54.71a2 2 0 01-2.35-2.35l.7-3.51a2.06 2.06 0 01.54-1L14.38 3a4.15 4.15 0 015.94 0 4 4 0 01-.13 5.51v-.05z"
        stroke="#212325"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ChangeIcon;
