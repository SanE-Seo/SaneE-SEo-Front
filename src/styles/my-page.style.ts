import styled from 'styled-components';

export const MyPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserInfoLayout = styled.div`
  width: 260px;
  height: 300px;
  margin: auto;

  background: #ffffff;
  box-shadow:
    -2.17893px -2.17893px 6.5368px #ffffff,
    2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .user-info-container {
    margin-top: 48px;
    .user-image-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .profile-icon {
        width: 95px;
        height: 95px;
        border-radius: 50%;
        margin: 5px;
      }
    }

    .user-nickname-container {
      ${(props) => props.theme.fonts.title_md};
      color: black;
      margin: 10px;
      align-items: center;
      display: flex;
      flex-direction: column;
    }

    .user-email-container {
      ${(props) => props.theme.fonts.text_lg};
      color: ${(props) => props.theme.colors.gray500};
      align-items: center;
      margin: 10px;
      display: flex;
      flex-direction: column;
    }
  }
`;

export const UserInfoEditButton = styled.button`
  ${(props) => props.theme.fonts.title_sm};
  color: ${(props) => props.theme.colors.green500};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  margin-left: auto;
  padding: 5px;
  svg {
    margin-left: 5px; // Adds space between text and icon
  }
  cursor: pointer;
`;

export const UserActivityLayout = styled.div`
  width: 884px;
  height: 670px;
  padding: 20px;
  magin: auto;
  display: flex;
  flex-direction: row;
  align-items: start;
  // justify-content: space-around;

  background: #ffffff;
  box-shadow:
    -2.17893px -2.17893px 6.5368px #ffffff,
    2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4);
  border-radius: 20px;

  .slide-item-wrapper {
    width: 1100px;
    display: flex;
    align-items: center;
    padding: 0;
    overflow: hidden;
  }
`;

export const TabLayout = styled.div`
  ${(props) => props.theme.fonts.title_sm};
  color: ${(props) => props.theme.colors.gray600};
  display: flex;
  justify-content: space-between;
  margin: 20px;
  border-bottom: 3px solid ${(props) => props.theme.colors.green500};
`;

// HeaderLayout 컴포넌트의 Props 타입 정의
type LiProps = {
  offset?: number; // logo-text의 색상을 설정할 수 있는 선택적 프로퍼티
  active?: boolean;
};

export const SlideItem = styled.li<LiProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 90px;
  height: 40px;
  margin: 0 14px;
  list-style: none;
  transform: ${(props) => `translateX(${props.offset}px)`};
  transition: 0.8s ease;

  button {
    border: none;
    width: 100%;
    height: 100%;
    ${(props) => props.theme.fonts.title_sm};
    color: ${(props) =>
      props.active
        ? props.theme.colors.mainAccentColor
        : props.theme.colors.gray600};
    border-bottom: ${(props) => (props.active ? '2px solid #94C020' : 'none')};
    background-color: transparent;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.colors.mainAccentColor};
      font-weight: 600;
    }
  }
`;
