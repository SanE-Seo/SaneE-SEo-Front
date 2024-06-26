import React from 'react';
type IconProps = {
  width?: number;
  height?: number;
};
const HeartFilledIcon = ({ width, height }: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_184_292)">
      <path
        d="M18.4941 3.80103C20.5891 5.02203 22.0631 7.50103 21.9981 10.393C21.8601 16.5 13.5001 21 12.0001 21C10.5001 21 2.13907 16.5 2.00207 10.393C1.93707 7.50103 3.41107 5.02303 5.50607 3.80103C7.46607 2.66003 9.92807 2.65303 12.0001 4.33803C14.0721 2.65303 16.5341 2.65903 18.4941 3.80103Z"
        fill="#FF6450"
      />
    </g>
    <defs>
      <clipPath id="clip0_184_292">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default HeartFilledIcon;
