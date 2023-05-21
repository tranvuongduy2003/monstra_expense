import React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg"

const IncomeStatus = (props: SvgProps) => {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={48} height={48} rx={16} fill="#FCFCFC" />
      <Path
        d="M31 22H17a5 5 0 00-5 5v6a5 5 0 005 5h14a5 5 0 005-5v-6a5 5 0 00-5-5zm-7 12a4 4 0 110-8 4 4 0 010 8z"
        fill="#00A86B"
      />
      <Path
        d="M24 32a2 2 0 100-4 2 2 0 000 4zM24 10a1 1 0 00-1 1v5.59l-2.54-2.54a1 1 0 00-1.41 1.41l4.24 4.25c.092.09.2.161.32.21a1 1 0 00.78 0 .998.998 0 00.32-.21L29 15.46a1 1 0 00-1.41-1.41L25 16.59V11a1 1 0 00-1-1z"
        fill="#00A86B"
      />
    </Svg>
  )
}

export default IncomeStatus
