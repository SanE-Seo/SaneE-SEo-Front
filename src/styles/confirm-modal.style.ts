import styled from 'styled-components';

export const ConfirmModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  margin: auto;
  background: #ffffff;
  z-index: 3;

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .header-wrapper {
    ${(props) => props.theme.fonts.text_lg};
    background: ${(props) => props.theme.colors.green500};
    margin: 0 0 10px 0;
    padding: 10px 10px 15px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid #dbdbdb;
    border-radius: 20px 20px 0 0;
  }

  .main-wrapper {
    margin: 10px;
    padding: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid #dbdbdb;
    align-items: center;
  }

  .confirm-button {
    ${(props) => props.theme.colors.gray600};
    ${(props) => props.theme.fonts.text_lg};
    pointer: cursor;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
  }

  .cancel-button {
    ${(props) => props.theme.colors.gray600};
    ${(props) => props.theme.fonts.text_lg};
    pointer: cursor;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
  }

  .vertical-line {
    width: 1px;
    height: 100%;
    background-color: #dbdbdb;
  }
`;

export const ModalBackground = styled.div`
  z-index: 2;
  display: block;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
`;
