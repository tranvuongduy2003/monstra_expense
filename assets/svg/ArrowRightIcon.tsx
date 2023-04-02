import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const ArrowRIcon = (props: SvgProps) => {
  return (
    <Svg
      width={8}
      height={16}
      viewBox="0 0 8 16"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.442 15.117a.75.75 0 01-.532-.225.75.75 0 010-1.057L5.155 9.59a2.25 2.25 0 000-3.18L.91 2.165a.75.75 0 011.058-1.058L6.25 5.346a3.75 3.75 0 010 5.31l-4.245 4.238a.749.749 0 01-.563.224z"
        fill="#7F3DFF"
      />
    </Svg>
  )
}

export default ArrowRIcon;
