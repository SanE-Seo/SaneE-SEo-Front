import styled from 'styled-components';

export const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginLayout = styled.div`
  width: 404px;
  height: 663px;
  margin: auto;

  background: #ffffff;
  box-shadow:
    -2.17893px -2.17893px 6.5368px #ffffff,
    2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header-container {
    margin-top: 68px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo-container {
      margin: 7px;
      display: flex;
      flex-direction: row;
      cursor: pointer;
    }

    .header-text {
      ${(props) => props.theme.fonts.text_sm};
      color: ${(props) => props.theme.colors.gray400};
      align-items: center;
      cursor: default;
    }
  }

  .login-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .input-container {
      width: 290px;
      height: 40px;
      border: 1px solid #d4e6a6;
      background: #ffffff;
      color: ${(props) => props.theme.colors.gray300};
      margin-top: 13px;
      padding-left: 5px;
      ${(props) => props.theme.fonts.text_sm};
    }

    .submit-button {
      width: 290px;
      height: 40px;
      border: 1px solid ${(props) => props.theme.colors.mainAccentColor};
      background: ${(props) => props.theme.colors.mainAccentColor};
      color: #fff;
      ${(props) => props.theme.fonts.text_md};
      margin-top: 13px;
      padding-left: 5px;
      cursor: pointer;
    }
    .error {
      width: 290px;
      margin-top: 5px;
      color: ${(props) => props.theme.colors.red500};
      ${(props) => props.theme.fonts.text_sm};
    }
  }
  .bottom-text {
    color: ${(props) => props.theme.colors.gray600};
    ${(props) => props.theme.fonts.text_md};
    margin-top: 25px;
    cursor: default;

    a {
      color: ${(props) => props.theme.colors.mainAccentColor};
    }
  }
`;
// HeaderLayout 컴포넌트의 Props 타입 정의
type SpanProps = {
  logotextcolor?: string; // logo-text의 색상을 설정할 수 있는 선택적 프로퍼티
};

export const LogoText = styled.span<SpanProps>`
  font-family: 'Poor Story';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  color: ${(props) => props.logotextcolor || '#94C020'};
`;

export const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px 0;

  hr {
    width: 140px;
    height: 1px;
    background: ${(props) => props.theme.colors.gray500};
  }
  span {
    color: ${(props) => props.theme.colors.gray500};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    margin: 0 16px;
  }
`;
