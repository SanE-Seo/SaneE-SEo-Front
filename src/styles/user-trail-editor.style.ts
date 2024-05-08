import styled from 'styled-components';

export const HeaderLayout = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  justify-content: space-between;
  padding: 15px;
`;

export const AddButton = styled.button`
  width: 150px;
  height: 40px;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.green300} 0%,
    ${(props) => props.theme.colors.green500} 100%
  );
  backdrop-filter: blur(2px);
  border-radius: 20px;
  line-height: 1;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: #fff;
  ${(props) => props.theme.fonts.text_md};
  padding: 0.75rem 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.colors.green500} 0%,
      ${(props) => props.theme.colors.green700} 100%
    );
  }

  .button_icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
  }
`;
