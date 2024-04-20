import React from 'react';

type IconProps = {
  color?: string;
};

const NextIcon = ({ color }: IconProps) => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.7998 9.96469L14.9719 13.8375L10.7998 17.7103L12.0842 18.9L17.5498 13.8375L12.0842 8.775L10.7998 9.96469Z"
      fill={color}
    />
    <circle
      cx="13.5"
      cy="13.5"
      r="12.5"
      transform="rotate(180 13.5 13.5)"
      stroke={color}
      strokeWidth="2"
    />
  </svg>
);

export default NextIcon;
