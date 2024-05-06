import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SeoulCoordinates from '../../seoul_districts_coordinates.json';

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
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

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const DropDownRegion: React.FC<Props> = ({ onChange, value }) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const districtNames = Object.keys(SeoulCoordinates).map((key) => ({
    id: key,
    name: key,
  }));

  const filteredDistricts = districtNames.filter((district) =>
    district.name.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleSelect = (district: { id: string; name: string }) => {
    onChange(district.id);
    setInputValue(district.name);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <DropdownContainer ref={ref}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => setIsOpen(!isOpen)}
        placeholder="지역 검색"
      />
      {isOpen && (
        <ListContainer>
          {filteredDistricts.map((district) => (
            <ListItem key={district.id} onClick={() => handleSelect(district)}>
              {district.name}
            </ListItem>
          ))}
        </ListContainer>
      )}
    </DropdownContainer>
  );
};

export default DropDownRegion;
