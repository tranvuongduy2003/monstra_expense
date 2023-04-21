import React from "react"
import Svg, { G, Rect, Path, Defs, SvgProps} from "react-native-svg"
import scale from "constants/Responsive"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const RectangleIcon = (props: SvgProps) => {
  return (
    <Svg
      width={scale(295)}
      height={scale(281)}
      viewBox="0 0 295 281"
      fill="none"
      //xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_2036_44)">
        <Rect
          x={26.6124}
          y={56.3536}
          width={214}
          height={200.562}
          rx={23.5}
          transform="rotate(-15 26.612 56.354)"
          fill="#EEE5FF"
          stroke="#B18AFF"
        />
        <Path
          d="M49.57 51.237l22.568-6.047 51.392 191.797-22.568 6.047c-12.003 3.216-24.34-3.907-27.557-15.91L33.66 78.794c-3.216-12.003 3.908-24.34 15.91-27.557z"
          stroke="#B18AFF"
          strokeWidth={3}
        />
        <Path
          d="M37.906 100.433l47.33-12.683 40.376 150.685-24.148 6.47c-12.803 3.431-25.964-4.167-29.394-16.97L37.906 100.433z"
          fill="#D3BDFF"
        />
        <Path
          d="M32.212 79.182c-3.43-12.803 4.167-25.963 16.97-29.394l161.31-43.222c12.803-3.431 25.963 4.167 29.394 16.97l5.694 21.25-207.674 55.647-5.694-21.25z"
          fill="#D3BDFF"
        />
        <Path
          transform="rotate(-15 72.27 45.155)"
          stroke="#B18AFF"
          strokeWidth={3}
          d="M72.2697 45.155H157.2697V243.717H72.2697z"
        />
        <Path
          d="M49.57 51.237L210.88 8.014c12.003-3.216 24.341 3.907 27.557 15.91l5.414 20.208-204.776 54.87-5.415-20.208c-3.216-12.003 3.908-24.34 15.91-27.557z"
          stroke="#B18AFF"
          strokeWidth={3}
        />
        <Path
          transform="rotate(-15 51.648 145.926)"
          stroke="#B18AFF"
          strokeWidth={3}
          d="M51.6485 145.926H263.6485V203.926H51.6485z"
        />
        <Rect
          x={27.8371}
          y={57.0607}
          width={212}
          height={198.562}
          rx={22.5}
          transform="rotate(-15 27.837 57.06)"
          stroke="#B18AFF"
          strokeWidth={3}
        />
      </G>
      <Defs></Defs>
    </Svg>
  )
}

export default RectangleIcon;
