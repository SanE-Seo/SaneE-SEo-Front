import React from 'react';
import styled from 'styled-components';

interface DropDownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;

  span {
    ${(props) => props.theme.fonts.text_sm};
    color: ${({ theme }) => theme.colors.gray800}; /* 테마 폰트 색상 적용 */
  }
`;

const DropDownTime: React.FC<DropDownProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <DropdownContainer>
      <Input value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            <span>{option}</span>
          </option>
        ))}
      </Input>
    </DropdownContainer>
  );
};

export default DropDownTime;
