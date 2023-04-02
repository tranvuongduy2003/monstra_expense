import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const ExportIcon = (props: SvgProps) => {
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
        d="M12 17V1.24M4.93 7.24l5.66-5.65a2 2 0 012.82 0l5.66 5.65M23 17v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4"
        stroke="#7F3DFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    
    </Svg>
  )
}

export default ExportIcon;
