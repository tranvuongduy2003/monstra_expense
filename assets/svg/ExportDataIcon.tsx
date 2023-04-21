import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const ExportDataIcon = (props: SvgProps) => {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23.5 16a1 1 0 00-1 1v4a1 1 0 01-1 1h-18a1 1 0 01-1-1v-4a1 1 0 10-2 0v4a3 3 0 003 3h18a3 3 0 003-3v-4a1 1 0 00-1-1z"
        fill="#fff"
      />
      <Path
        d="M10.38 17.12a3 3 0 004.24 0l5.66-5.66a1 1 0 10-1.42-1.41l-5.36 5.36V1a1 1 0 00-2 0v14.41l-5.36-5.36a1 1 0 10-1.42 1.41l5.66 5.66z"
        fill="#fff"
      />
    </Svg>
  )
}

export default ExportDataIcon;
