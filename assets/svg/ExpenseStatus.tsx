import React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg"

const ExpenseStatus = (props: SvgProps) => {
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
        d="M31.198 22h-14a5 5 0 00-5 5v6a5 5 0 005 5h14a5 5 0 005-5v-6a5 5 0 00-5-5zm-7 12a4 4 0 110-8 4 4 0 010 8z"
        fill="#FD3C4A"
      />
      <Path
        d="M24.198 32a2 2 0 100-4 2 2 0 000 4zM24.907 10.29a1 1 0 00-1.42 0l-4.24 4.25a1.015 1.015 0 001.41 1.46l2.54-2.59V19a1 1 0 002 0v-5.59l2.54 2.59a1 1 0 00.7.29 1.002 1.002 0 00.76-.29 1 1 0 000-1.41l-4.29-4.3z"
        fill="#FD3C4A"
      />
    </Svg>
  )
}

export default ExpenseStatus
