import styled from 'styled-components';

export const MainLayout = styled.div`
  max-width: 1125px;
  margin: auto;
  display: grid;
  grid-template-columns: 300px 800px;
  grid-template-rows: 370px 370px;
  column-gap: 34px;
  row-gap: 80px;

  div: first-child {
    grid-row: 1 / span 2;
    grid-column: 1 / 1;
  }

  div: nth-child(2) {
    grid-row: 1 / 1;
    grid-column: 2 / 2;
  }

  div: nth-child(3) {
    grid-row: 2 / 2;
    grid-column: 2 / 2;
  }
`;

export const WeatherWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

export const SeoulWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

export const TownWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
// HeaderLayout 컴포넌트의 Props 타입 정의
type SpanProps = {
  title_color?: string; // logo-text의 색상을 설정할 수 있는 선택적 프로퍼티
};

export const Title = styled.span<SpanProps>`
  ${(props) => props.theme.fonts.title_md};
  color: ${(props) => props.title_color || props.theme.colors.gray600};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .content-span {
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) => props.theme.colors.gray300};
    margin: 15px 0;
  }

  .row-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    .text-md {
      ${(props) => props.theme.fonts.text_md};
      color: ${(props) => props.theme.colors.gray600};
    }
    .icon-wrapper {
      margin-left: 5px;
    }
  }
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: row;
`;
