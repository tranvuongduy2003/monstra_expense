import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const PickIcon = (props: SvgProps) => {
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
        d="M9.425.5L9.43 0l.006.5a4.5 4.5 0 013.183 1.266l5.631 5.691a.5.5 0 01-.702.704l-5.644-5.644h0l-.01-.01a3.58 3.58 0 00-4.928 0h0l-.01.01L1.314 8.16a.5.5 0 01-.702-.704l5.631-5.691A4.5 4.5 0 019.425.5z"
        fill="#161719"
        stroke="#91919F"
      />
    </Svg>
  )
}

export default PickIcon;
