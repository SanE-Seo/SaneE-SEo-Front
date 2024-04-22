import React from 'react';

type IconProps = {
  color?: string;
};

const PrevIcon = ({ color }: IconProps) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.7998 18.3662L12.4732 14.35L16.7998 10.3337L15.4678 9.1L9.7998 14.35L15.4678 19.6L16.7998 18.3662Z"
      fill={color}
    />
    <circle cx="14" cy="14" r="13" stroke={color} strokeWidth="2" />
  </svg>
);

export default PrevIcon;
