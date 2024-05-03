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
`;

const ListContainer = styled.div`
  position: absolute;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  background-color: white;
  z-index: 1000;
`;

const ListItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
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
            {option}
          </option>
        ))}
      </Input>
    </DropdownContainer>
  );
};

export default DropDownTime;
