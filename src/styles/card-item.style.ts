import styled from 'styled-components';

export const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 266px;
  height: 270px;
  border-radius: 7px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.1);
  border-radius: 7px;
  border: 1px solid #dbdbdb;
  margin: 10px;

  filter: drop-shadow(0px 3px 8px rgba(99, 99, 99, 0.25));

  .card-image {
    margin-top: 14px;
    width: 240px;
    height: 160px;
    border-radius: 7px;
    cursor: pointer;
  }
`;
export const Data = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  width: 240px;

  .profile-icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }

  .data-container {
    display: flex;
    flex-direction: column;
    margin-left: 5px;

    .title-md {
      ${(props) => props.theme.fonts.text_md};
      font-weight: 600;
      font-size: 16px;
      color: ${(props) => props.theme.colors.gray600};
    }
    .category-sm {
      ${(props) => props.theme.fonts.text_sm};
      color: ${(props) => props.theme.colors.gray400};
    }
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: row;
  width: 240px;
  margin-top: 10px;
  align-items: center;

  .description-text {
    ${(props) => props.theme.fonts.caption};
    color: ${(props) => props.theme.colors.gray300};
    margin: 0 10px 0 1px;
  }
`;
