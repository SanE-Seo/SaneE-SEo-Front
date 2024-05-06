import styled from 'styled-components';

export const ScreenLayout = styled.div`
  display: flex;
  max-width: 1125px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .title-text {
    ${(props) => props.theme.fonts.title_lg};
    color: ${(props) => props.theme.colors.gray600};
    margin-top: 40px;
  }
  .sub-title {
    ${(props) => props.theme.fonts.title_sm};
    color: ${(props) => props.theme.colors.gray400};
    margin-top: 19px;
  }

  .content-title {
    ${(props) => props.theme.fonts.title_sm};
    color: ${(props) => props.theme.colors.gray800};
    margin-top: 30px;
  }
  .content-md {
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) => props.theme.colors.gray700};
    margin-top: 15px;
  }

  .div-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
  margin-right: 10px;
  padding: 10px;
  box-sizing: border-box;

  height: 45px;

  border: 1px solid #b8b8b8;
  border-radius: 10px;

  .description {
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) => props.theme.colors.gray300};
    margin: 0 20px 0 5px;
    cursor: default;
  }
  button {
    align-content: center;
    margin-top: 3px;
  }
`;
