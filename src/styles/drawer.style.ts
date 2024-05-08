import styled from 'styled-components';

export const DrawerLayout = styled.div`
  position: absolute;
  width: 340px;
  height: calc(100vh - 140px);
  background: #ffffff;
  z-index: 2;
  transition: 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  transform: translateX(0);
  .custom-line {
    width: 100%;
    height: 0px;
    border: 1px solid #dbdbdb;
  }
`;

export const PostInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 19px;

  .title-sm {
    ${(props) => props.theme.fonts.title_sm};
    color: ${(props) => props.theme.colors.gray600};
  }
  .address-info {
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) => props.theme.colors.gray400};
    margin-top: 8px;
  }
  .description-box {
    display: flex;
    flex-direction: row;
    width: 240px;
    margin-top: 10px;
    align-items: center;

    .description-text {
      ${(props) => props.theme.fonts.caption};
      color: ${(props) => props.theme.colors.gray300};
      margin: 0 10px 0 3px;
    }
  }
  .profile-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    .profile-img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
    }
    .name {
      ${(props) => props.theme.fonts.text_sm};
      color: ${(props) => props.theme.colors.gray600};
      margin-left: 6px;
    }
  }
`;

export const MenuBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // padding: 0 40px;
`;
type LiProps = {
  active: boolean;
};
export const MenuItem = styled.li<LiProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 170px;
  height: 40px;
  // margin: 0 14px;
  list-style: none;

  button {
    border: none;
    width: 100%;
    height: 100%;
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) =>
      props.active
        ? props.theme.colors.subAccentColor
        : props.theme.colors.gray600};
    border-bottom: ${(props) => (props.active ? '2px solid #F9C758' : 'none')};
    background-color: transparent;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.colors.subAccentColor};
      font-weight: 600;
    }
  }
`;

export const CloseButton = styled.button`
  position: fixed;
  width: 25px;
  height: 66px;
  left: 340px;
  top: 260px;
  z-index: 2;
  background: #ffffff;
  border-radius: 0px 10px 10px 0px;
`;
