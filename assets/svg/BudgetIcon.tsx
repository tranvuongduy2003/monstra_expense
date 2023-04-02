import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const BudgetIcon = (props: SvgProps) => (
  <Svg
    {...props}
    width={24}
    height={24}
    fill="none"
    //xmlns="http://www.w3.org/2000/svg"
  >
    <Path d="M24 11H13V0a12 12 0 0 1 11 11Z" fill="#C6C6C6" />
    <Path d="M24 13A12 12 0 1 1 11 0v12a1 1 0 0 0 1 1h12Z" fill="#C6C6C6" />
  </Svg>
)

export default BudgetIcon;
