import React, { useState, useEffect } from 'react';
import * as P from '../../styles/place-search-modal.style';
import SeoulCoordinates from '../../seoul_districts_coordinates.json';
type PlaceProps = {
  placeInput: string;
  setPlaceInput: (value: string) => void;
  setIsOpen: (value: boolean) => void;
  setLat: (value: number) => void;
  setLng: (value: number) => void;
  setSelectedDistrict?: (value: string) => void;
};

type DistrictCoordinates = {
  [key: string]: { lat: number; lng: number };
};
function PlaceSearchModal({
  placeInput,
  setPlaceInput,
  setIsOpen,
  setLat,
  setLng,
  setSelectedDistrict,
}: PlaceProps) {
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const coordinates: DistrictCoordinates = SeoulCoordinates;
  useEffect(() => {
    const results: string[] = [];
    for (const districtName in coordinates) {
      if (districtName.includes(placeInput)) {
        results.push(districtName);
      }
    }
    setSearchResults(results);
  }, [placeInput]);
  return (
    <>
      <P.ModalWrapper>
        <ul>
          {searchResults.length > 0 &&
            searchResults.map((district, index) => (
              <>
                <li
                  key={index}
                  className="text-style"
                  onClick={() => {
                    setPlaceInput(district);
                    setLat(coordinates[district].lat);
                    setLng(coordinates[district].lng);
                    if (setSelectedDistrict) {
                      setSelectedDistrict(district);
                    }
                    setIsOpen(false);
                  }}
                >
                  {district}
                </li>
                <hr className="line" />
              </>
            ))}
        </ul>
      </P.ModalWrapper>
    </>
  );
}

export default PlaceSearchModal;
