import styled from 'styled-components';

export const Background = styled.div`
  position: relative;
  .yellow-image {
    position: fixed;
    left: -1.46%;
    right: 65.89%;
    top: 25.84%;
    bottom: 30.57%;
    z-index: -1;
  }
  .brown-image {
    position: fixed;
    right: -2.35%;
    top: 30.52%;
    bottom: 24.6%;
    z-index: -1;
  }
  .green-image {
    position: fixed;
    left: 30.95%;
    top: 50.71%;
    z-index: -1;
  }
`;
export const ScreenWrapper = styled.div`
  width: 1150px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
export const HeaderLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 35px;

  .content-layout {
    display: flex;
    flex-direction: column;
    margin-left: 5px;

    .text-md {
      ${(props) => props.theme.fonts.text_md};
      color: ${(props) => props.theme.colors.gray300};
      margin-top: 10px;
    }
  }
`;

// HeaderLayout 컴포넌트의 Props 타입 정의
type SpanProps = {
  title_color?: string; // logo-text의 색상을 설정할 수 있는 선택적 프로퍼티
};

export const Title = styled.span<SpanProps>`
  ${(props) => props.theme.fonts.title_lg};
  color: ${(props) => props.title_color};
`;

export const SubTitle = styled.span`
  ${(props) => props.theme.fonts.text_lg};
  color: ${(props) => props.theme.colors.gray600};
`;

export const DistrictBox = styled.div`
  width: 1125px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  .slide-button {
    width: 30px;
    height: 40px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .slide-item-wrapper {
    width: 1100px;
    display: flex;
    align-items: center;
    padding: 0;
    overflow: hidden;
  }
  
  }
`;
// HeaderLayout 컴포넌트의 Props 타입 정의
type LiProps = {
  offset?: number; // logo-text의 색상을 설정할 수 있는 선택적 프로퍼티
  active?: string;
};

export const SlideItem = styled.li<LiProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 90px;
  height: 40px;
  margin: 0 14px;
  list-style: none;
  transform: ${(props) => `translateX(${props.offset}px)`};
  transition: 0.8s ease;

  button {
    border: none;
    width: 100%;
    height: 100%;
    ${(props) => props.theme.fonts.title_sm};
    color: ${(props) =>
      props.active == 'true'
        ? props.theme.colors.mainAccentColor
        : props.theme.colors.gray600};
    border-bottom: ${(props) =>
      props.active == 'true' ? '2px solid #94C020' : 'none'};
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

  .no-content {
    margin: auto;
    width: 995px;
    height: 250px;
    // background: #ffffff;
    border-radius: 20px;
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
