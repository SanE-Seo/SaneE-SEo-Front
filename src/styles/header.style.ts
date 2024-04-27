import styled from 'styled-components';

// HeaderLayout 컴포넌트의 Props 타입 정의
type SpanProps = {
  color?: string; // logo-text의 색상을 설정할 수 있는 선택적 프로퍼티
};

export const HeaderWrapper = styled.nav`
  width: 100%;
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
`;

export const LogoText = styled.span<SpanProps>`
  font-family: 'Poor Story';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  color: ${(props) => props.color || '#94C020'};
`;
