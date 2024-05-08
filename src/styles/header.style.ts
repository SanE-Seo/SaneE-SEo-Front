import styled from 'styled-components';

// HeaderLayout 컴포넌트의 Props 타입 정의
type SpanProps = {
  color?: string; // logo-text의 색상을 설정할 수 있는 선택적 프로퍼티
};

export const HeaderWrapper = styled.nav`
  width: 100vw;
  height: 80px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
`;

export const HeaderLayout = styled.div`
  width: 1125px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;

  .logo-container {
    margin: 11px;
    cursor: pointer;
  }
  .menu-text {
    margin-left: 55px;
    ${(props) => props.theme.fonts.title_sm};
    color: ${(props) => props.theme.colors.gray600};
    cursor: default;

    &:hover {
      color: #597313;
    }
  }
  .login-button {
    width: 125px;
    height: 45px;
    background: ${(props) => props.theme.colors.mainAccentColor};
    border-radius: 10px;
    margin-left: 405px;
    ${(props) => props.theme.fonts.title_sm}
    color: #FFF;

    &:hover {
      background: #2b2a2a;
    }
  }
  .menu-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    .profile-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-left: 500px;
      margin-right: 5px;
    }
  }
`;

export const LogoText = styled.span<SpanProps>`
  font-family: 'Poor Story';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  color: ${(props) => props.color || '#94C020'};
`;

export const MenuBox = styled.div`
  position: absolute;
  width: 165px;
  height: 85px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 3;
  border: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;

  .menu-text {
    margin: 5px;
    color: ${(props) => props.theme.colors.gray800};
    ${(props) => props.theme.fonts.text_md}
    cursor: default;
  }
`;
