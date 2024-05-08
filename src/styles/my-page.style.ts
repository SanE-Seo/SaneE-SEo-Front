import styled from 'styled-components';

export const MyPageBackground = styled.div`
  background: ${(props) => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MyPageWrapper = styled.div`
  width: 1150px;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
`;

export const UserInfoLayout = styled.div`
  width: 250px;
  height: 280px;
  // margin: auto;

  background: #ffffff;
  // box-shadow:
  //   -2.17893px -2.17893px 6.5368px #ffffff,
  //   2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .user-info-container {
    margin-top: 39px;
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
  padding: 5px 10px;
  margin: 10px
  display: flex;
  flex-direction: column;
  align-items: start;
  // justify-content: space-around;

  background: #ffffff;
  // box-shadow:
  //   -2.17893px -2.17893px 6.5368px #ffffff,
  //   2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4);
  border-radius: 20px;

  .slide-item-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    overflow: hidden;
    justify-content: space-around;
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
  active?: boolean;
};

export const SlideItem = styled.li<LiProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 90px;
  height: 40px;
  margin: 0 14px;
  list-style: none;

  button {
    padding: 5px;
    min-width: 200px;
    border: none;
    width: 100%;
    height: 100%;
    ${(props) => props.theme.fonts.title_sm};
    color: ${(props) =>
      props.active
        ? props.theme.colors.mainAccentColor
        : props.theme.colors.gray600};
    border-bottom: ${(props) => (props.active ? '3px solid #94C020' : 'none')};
    background-color: transparent;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.colors.mainAccentColor};
      font-weight: 600;
    }
  }
`;

export const CardItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 88%; // Set a fixed maximum height
  overflow-y: auto; // Enable vertical scrolling
  overflow-x: hidden; // Hide horizontal scrollbar
  margin: 10px 0; // Optional: adds some vertical space around the box

  &::-webkit-scrollbar {
    width: 6px; // Thinner scrollbar
    border-radius: 2px; // Rounder corners
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; // Light grey track
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888; // Dark grey drag handle
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; // Darker grey drag handle on hover
  }

  .no-content {
    margin: auto;
    width: 100%; // Full width inside the container
    height: 250px; // Fixed height for the no content message
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .text-md {
      ${(props) => props.theme.fonts.text_lg};
      color: ${(props) => props.theme.colors.gray600};
    }
  }
`;
