import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const SettingsIcon = (props: SvgProps) => {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M12 14a2 2 0 100-4 2 2 0 000 4z" fill="#7F3DFF" />
      <Path
        d="M21.79 13l-.38-.23a.94.94 0 010-1.62l.38-.23a3 3 0 001.1-4.09l-1-1.74A3 3 0 0017.79 4l-.32.18A1 1 0 0116 3.36V3a3 3 0 00-3-3h-2a3 3 0 00-3 3v.36a1 1 0 01-1.48.86L6.21 4a3 3 0 00-4.1 1.09l-1 1.74A3 3 0 002.21 11l.38.23a.94.94 0 010 1.62l-.38.15a3 3 0 00-1.1 4.09l1 1.74A2.999 2.999 0 006.21 20l.31-.17a1 1 0 011 0 1 1 0 01.49.84V21a3 3 0 003 3h2a3 3 0 003-3v-.37a1 1 0 011.5-.84l.31.18a3 3 0 004.1-1.09l1-1.74A3.002 3.002 0 0021.79 13zM12 16a4 4 0 110-8 4 4 0 010 8z"
        fill="#7F3DFF"
      />
    </Svg>
  )
}

export default SettingsIcon;
