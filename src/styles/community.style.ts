import styled from 'styled-components';

export const HeaderLayout = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  justify-content: space-between;
  padding: 15px;
`;

export const SearchContainer = styled.div`
  width: 324px;
  height: 45px;

  background: #ffffff;
  border: 1px solid #949494;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;

  input {
    margin-left: 3px;
    border: none; //테두리 없애기
    background-color: transparent; //input창 배경 투명하게
    ${(props) => props.theme.fonts.text_md};
    &:focus {
      outline: none;
    }
  }
`;

// Button 컴포넌트
export const AddButton = styled.button`
  line-height: 1;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: ${(props) => props.theme.colors.deepBrown};
  color: #fff;
  width: 180px;
  height: 40px;
  border-radius: 10rem;
  ${(props) => props.theme.fonts.text_md};
  padding: 0.75rem 1.5rem;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s;
  cursor: pointer;

  .button_icon-wrapper {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    position: relative;
    color: #645023;
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;

    & svg {
      &:nth-child(2) {
        position: absolute;
        transform: translate(-290%, 0%);
      }
    }
  }

  &:hover {
    background-color: #000;

    .button_icon-wrapper {
      color: #000;

      & svg {
        transition: transform 0.3s ease-in-out;

        &:first-child {
          transform: translate(290%, 0%);
          color: #ffffff;
        }
        &:nth-child(2) {
          transition-delay: 0.1s;
          transform: translate(0);
          color: #ffffff;
        }
      }
    }

    .button_icon-svg:first-child {
      transition: transform 0.3s ease-in-out;
      transform: translate(150%, -150%);
    }

    .button_icon-svg--copy {
      transition: transform 0.3s ease-in-out 0.1s;
      transform: translate(0);
    }
  }
`;
