import React from 'react';

type IconProps = {
  width?: number;
  height?: number;
};

const TimeIcon = ({ width, height }: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 6.66667V10L12.5 12.5"
      stroke="#949494"
      strokeWidth="1.66667"
      strokeLinecap="round"
    />
    <path
      d="M10 2.5C5.86064 2.5 2.5 5.86064 2.5 10C2.5 14.1394 5.86064 17.5 10 17.5C14.1394 17.5 17.5 14.1394 17.5 10C17.5 5.86064 14.1394 2.5 10 2.5"
      stroke="#949494"
      strokeWidth="1.66667"
    />
  </svg>
);

export default TimeIcon;
