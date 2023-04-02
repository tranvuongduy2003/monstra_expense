import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const TransactionIcon = (props: SvgProps) => (
  <Svg
    {...props}
    width={24}
    height={24}
    fill="none"
    //xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M18.13 12.93v1a5 5 0 0 1-5 5H9.87a3 3 0 0 1-1.68 2.61 2.94 2.94 0 0 1-1.32.31A3 3 0 0 1 5 21.21L1.29 18.3a3 3 0 0 1 0-4.74L5 10.65a3 3 0 0 1 3.21-.34 2.86 2.86 0 0 1 1.46 1.62h7.43a1.001 1.001 0 0 1 1.03 1ZM27.87 6.07a2.999 2.999 0 0 1-1.16 2.37L23 11.35a3.09 3.09 0 0 1-1.89.65 2.94 2.94 0 0 1-1.32-.31 2.86 2.86 0 0 1-1.46-1.62h-7.46a1 1 0 0 1-1-1v-1a5 5 0 0 1 5-5h3.26A3 3 0 0 1 23 .79l3.71 2.91a3 3 0 0 1 1.16 2.37Z"
      fill="#C6C6C6"
    />
  </Svg>
)

export default TransactionIcon;
