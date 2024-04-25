import React from 'react';

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const RightArrowIcon = ({ width, height, color }: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_276_31)">
      <path
        d="M8.67035 12.76L13.7984 7.36592L8.65825 1.98393L7.52139 3.14499L11.0529 6.62817L1.52259 6.62817L1.52259 8.12787H11.0287L7.52139 11.5869L8.67035 12.76"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_276_31">
        <rect
          width="10"
          height="10.69"
          fill="white"
          transform="translate(7.74316 0.189987) rotate(45)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default RightArrowIcon;
