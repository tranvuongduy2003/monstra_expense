import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const LogoutIcon = (props: SvgProps) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 4V3a2 2 0 00-2-2H3a2 2 0 00-2 2v18a2 2 0 002 2h10a2 2 0 002-2v-1M7 12h15.83M19.59 7.76l2.82 2.83a2 2 0 010 2.82l-2.82 2.83"
        stroke="#FD3C4A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LogoutIcon;
