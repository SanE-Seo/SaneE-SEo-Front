import styled from 'styled-components';

export const PlaceForm = styled.div`
  width: 274px;
  height: 38px;
  background: ${(props) => props.theme.colors.background};
  border-radius: 6px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .select-label {
    ${(props) => props.theme.fonts.text_lg};
    color: ${(props) => props.theme.colors.gray600};
    margin: 0 13px;
  }

  .select-place {
    width: 86px;
    height: 25px;
    background: #ffffff;
    border-radius: 5px;
    border: 0px;
    ${(props) => props.theme.fonts.text_sm};
  }

  .my-place-wrapper {
    margin: 0 13px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    .my-place-label {
      ${(props) => props.theme.fonts.text_sm};
      color: ${(props) => props.theme.colors.gray600};
      margin: 0 5px;
    }
  }
`;

export const WeatherLayout = styled.div`
  width: 273px;
  height: 681px;
  background: ${(props) => props.theme.colors.background};
  border-radius: 7px;
  margin-top: 7px;
  display: flex;
  flex-direction: column;
  //   align-items: center;

  .weather-label {
    ${(props) => props.theme.fonts.text_lg};
    color: ${(props) => props.theme.colors.gray600};
    margin: 10px 13px;
  }
`;

export const InfoBox = styled.div`
  width: 239px;
  height: 75px;
  background: #ffffff;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px auto;
  justify-content: space-between;
  .row-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .icon-style {
    margin-left: 12px;
  }
  .label-text {
    margin-left: 8px;
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) => props.theme.colors.gray600};
  }
  .temp-column-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-right: 15px;
  }
  .value-caption {
    ${(props) => props.theme.fonts.caption};
    color: ${(props) => props.theme.colors.green700};
  }
  .value-md {
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) => props.theme.colors.green700};
    margin-right: 15px;
  }
`;
