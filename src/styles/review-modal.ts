import styled from 'styled-components';
type styleProps = {
  isOpen: boolean;
};
export const ModalBackdrop = styled.div<styleProps>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: absolute;
  top: -140px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
export const ModalLayout = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  margin: auto;

  background: #ffffff;

  border: 1px solid #b8b8b8;
  border-radius: 20px;

  .close-button {
    margin-left: 355px;
    margin-top: 25px;
  }
`;
export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 50px;

  .trail-name {
    ${(props) => props.theme.fonts.title_md};
    color: ${(props) => props.theme.colors.deepBrown};
  }
  .text-sm {
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) => props.theme.colors.gray700};
  }
  .caption {
    margin-top: 10px;
    ${(props) => props.theme.fonts.text_sm};
    color: ${(props) => props.theme.colors.gray500};
  }
`;

export const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  margin-top: 20px;
  width: 300px;
  height: 140px;

  background: #ffffff;

  border: 1px solid #b8b8b8;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.gray700};
  ${(props) => props.theme.fonts.text_sm};
  padding: 5px;
`;
type colorProps = {
  button_color: string;
};
export const SubmitButton = styled.button<colorProps>`
  width: 300px;
  height: 40px;
  margin-top: 20px;
  background: ${(props) => props.button_color};
  color: #ffffff;
  border-radius: 10px;
  ${(props) => props.theme.fonts.text_md};
`;
