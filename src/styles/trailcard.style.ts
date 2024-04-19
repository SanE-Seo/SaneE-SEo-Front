import styled from 'styled-components';

export const Card = styled.img`
  width: 240px;
  height: 160px;
  border-radius: 7px;
  cursor: pointer;
`;

export const Data = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  .profile-icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }

  .data-container {
    display: flex;
    flex-direction: column;
    margin-left: 5px;

    .title-md {
      ${(props) => props.theme.fonts.text_md};
      font-weight: 600;
      font-size: 16px;
      color: ${(props) => props.theme.colors.gray600};
    }
    .category-sm {
      ${(props) => props.theme.fonts.text_sm};
      color: ${(props) => props.theme.colors.gray400};
    }
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-top: 210px;
  align-items: center;

  opacity: 0; // 기본 상태에서는 투명하게
  visibility: hidden; // 기본 상태에서는 보이지 않게

  .icon-container {
    margin: 0 5px;
  }

  .description-text {
    ${(props) => props.theme.fonts.caption};
    color: ${(props) => props.theme.colors.gray300};
    margin-right: 5px;
  }
`;

export const CardBack = styled.div`
  position: absolute;
  width: 240px;
  height: 205px;
  border-radius: 7px;
  margin-top: -195px;
  margin-left: 0.7em;
  transition: 0.2s ease-in-out;
  z-index: -1;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.1);
  border-radius: 7px;
  border: 1px solid #dbdbdb;
`;

export const Main = styled.div`
  margin: 14px;
  &:hover ${CardBack} {
    margin-top: -210px;
    margin-left: 0em;
    scale: 1.1;
    height: 245px;
    cursor: pointer;
  }

  &:hover ${Description} {
    opacity: 1; // hover 시에는 불투명하게
    visibility: visible; // hover 시에는 보이게
    transition: 0.2s ease-in-out;
  }
`;

export const Img = styled.div`
  width: 2.25em;
  height: 2.25em;
  background-color: #252525;
  border-radius: 5px;
  overflow: hidden;
`;

export const Text = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 0.5em;
  font-family: 'Montserrat', sans-serif;
  color: white;
`;

export const TextM = styled.div`
  font-weight: bold;
  font-size: 0.9em;
`;

export const TextS = styled.div`
  font-size: 0.7em;
`;

// 여기까지는 기본적인 스타일 컴포넌트 변환 예시입니다.
// 나머지 부분도 비슷한 방식으로 변환할 수 있습니다.
// 예를 들어, .btns, .likes, .comments, .views 등의 클래스도
// 위의 예시를 참고하여 스타일드 컴포넌트로 변환할 수 있습니다.

// 아래에는 스위치 관련 코드를 스타일드 컴포넌트로 변환한 예시를 계속해서 추가하겠습니다.
// 스위치 컴포넌트는 좀 더 복잡한 스타일과 동작을 포함하고 있으므로, 상세한 구현이 필요합니다.

// 예를 들어, Switch_738, Chk_738, Slider_738 등의 클래스를
