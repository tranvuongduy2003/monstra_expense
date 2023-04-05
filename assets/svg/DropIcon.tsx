import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const DropIcon = (props: SvgProps) => {
  return (
    <Svg
      width={20}
      height={10}
      viewBox="0 0 20 10"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.006 8.91h0-.012a4.5 4.5 0 01-3.182-1.265L1.18 1.953a.5.5 0 01.702-.703l5.644 5.644h0l.01.009a3.58 3.58 0 004.928 0h0l.01-.01 5.644-5.643a.5.5 0 01.702.703l-5.632 5.692a4.5 4.5 0 01-3.182 1.265z"
        fill="#161719"
        stroke="#91919F"
      />
    </Svg>
  )
}

export default DropIcon;
