import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: absolute;
  width: 324px;
  height: 212px;
  background: #ffffff;
  margin-left: 15px;
  border: 1px solid #949494;
  border-radius: 10px;
  z-index: 5;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin-top: 5px;

    .text-style {
      width: 300px;
      ${(props) => props.theme.fonts.text_md};
      color: ${(props) => props.theme.colors.gray600};
      margin: 5px 10px;
      cursor: default;
    }
    .line {
      width: 300px;
      color: ${(props) => props.theme.colors.gray200};
    }
  }
`;
