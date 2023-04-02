import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const CheckedIcon = (props: SvgProps) => {
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
        d="M12 0a12 12 0 100 24 12 12 0 000-24zm5.66 9.59L12 15.24a3 3 0 01-4.24 0l-1.42-1.41a1.003 1.003 0 111.42-1.42l1.41 1.42a1 1 0 001.42 0l5.65-5.66a1.003 1.003 0 111.42 1.42z"
        fill="#5233FF"
      />
    </Svg>
  )
}

export default CheckedIcon;
