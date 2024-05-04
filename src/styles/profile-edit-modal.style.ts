import styled from 'styled-components';

export const ProfileEditModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 365px;
  height: 505px;
  margin: auto;
  background: #ffffff;
  z-index: 3;

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header-container {
    margin: 10px;
    padding: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }

  .user-info-container {
    width: 75%;
    align-items: center;
    display: flex;
    flex-direction: column;

    .edit-image-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;

      width: 100%;
      padding: 10px;
      .profile-icon {
        width: 95px;
        height: 95px;
        border-radius: 50%;
        margin: 5px;
      }
    }

    .edit-nickname-container {
      ${(props) => props.theme.fonts.text_sm};
      color: ${(props) => props.theme.colors.gray800};
      padding: 5px 5px 0 5px;
      margin: 5px auto 0 auto;
      width: 100%;
      text-align: left;

      .input-container {
        align-items: center;
        display: flex;
        flex-direction: row;
        width: 100%;
      }

      .alert-text {
        transition: opacity 0.3s ease-in-out;
        opacity: 0; /* Start as invisible */
        min-height: 20px;
        color: red;
        font-size: 12px;
      }
      .alert-text.show {
        opacity: 1; /* Fade in */
      }
    }

    .edit-email-container {
      ${(props) => props.theme.fonts.text_sm};
      color: ${(props) => props.theme.colors.gray800};
      padding: 5px;
      margin: 5px auto;
      width: 100%;
      text-align: left;

      .input-container {
        align-items: center;
        display: flex;
        flex-direction: row;
        width: 100%;
      }

      .alert-text {
        transition: opacity 0.3s ease-in-out;
        opacity: 0; /* Start as invisible */
        min-height: 20px;
        color: red;
        font-size: 12px;
      }
      .alert-text.show {
        opacity: 1; /* Fade in */
      }
    }
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

export const CloseButton = styled.button`
  color: ${(props) => props.theme.colors.gray600};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 20px 10px auto;
  margin-left: auto;
  cursor: pointer;
`;

export const ImageEditButton = styled.button`
  ${(props) => props.theme.fonts.text_sm};
  color: white;
  background-color: ${(props) => props.theme.colors.green500};
  border-radius: 20px;
  padding: 5px 20px;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
`;

export const EditNicknameInput = styled.input`
  background-color: ${(props) => props.theme.colors.green100};
  border: 0;
  height: 30px;
  padding: 10px;
  margin: 5px 0;
`;

export const EditEmailInput = styled.input`
  background-color: ${(props) => props.theme.colors.green100};
  border: 0;
  height: 30px;
  padding: 10px;
  margin: 5px 5px 5px 0;
  width: 100%;
`;

export const CheckDuplicateButton = styled.button`
  ${(props) => props.theme.fonts.text_sm};
  color: white;
  background-color: ${(props) => props.theme.colors.green600};
  border-radius: 20px;
  padding: 5px 10px;
  margin-left: 5px;
  display: block;
  cursor: pointer;
`;

export const CompleteButton = styled.button`
  ${(props) => props.theme.fonts.text_sm};
  color: white;
  background-color: ${(props) => props.theme.colors.green500};
  border-radius: 20px;
  padding: 5px;
  margin: 15px;
  width: 95%;
  display: block;
  cursor: pointer;
`;
