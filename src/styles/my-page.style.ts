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
  width: 884;
  height: 670px;
  margin: auto;
`;
