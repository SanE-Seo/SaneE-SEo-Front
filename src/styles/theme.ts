import { DefaultTheme } from 'styled-components';

// 폰트 스타일과 컬러를 정의하는 함수들
const createFontStyle = (
  family: string,
  weight: number,
  size: number,
  lineHeight: number,
) => `
  font-family: "${family}";
  font-weight: ${weight};
  font-size: ${size}px;
  line-height: ${lineHeight}%;
`;

const createColor = (color: string) => color;

// 폰트 정의
const fonts = {
  title_lg: createFontStyle('Pretendard', 600, 32, 120),
  title_md: createFontStyle('Pretendard', 600, 24, 120),
  title_sm: createFontStyle('Pretendard', 600, 20, 130),
  text_lg: createFontStyle('Pretendard', 600, 18, 140),
  text_md: createFontStyle('Pretendard', 400, 16, 140),
  text_sm: createFontStyle('Pretendard', 400, 14, 140),
  caption: createFontStyle('Pretendard', 400, 12, 140),
};

// 컬러 정의
const colors = {
  mainAccentColor: createColor('#94C020'),
  paleAccentColor: createColor('#D4E6A6'),
  subAccentColor: createColor('#F9C758'),
  paleSubAccentColor: createColor('#FBDD9B'),
  deepBrown: createColor('#645023'),
  paleBrown: createColor('#DFDAD0'),
  red500: createColor('#FF6450'),
  green700: createColor('#597313'),
  green600: createColor('#769A1A'),
  green500: createColor('#94C020'),
  green400: createColor('#A9CD4D'),
  green300: createColor('#BFD979'),
  green200: createColor('#D4E6A6'),
  green100: createColor('#EAF2D2'),
  gray800: createColor('#1F1F1F'),
  gray700: createColor('#2E2E2E'),
  gray600: createColor('#3E3E3E'),
  gray500: createColor('#4D4D4D'),
  gray400: createColor('#717171'),
  gray300: createColor('#949494'),
  gray200: createColor('#B8B8B8'),
  gray100: createColor('#DBDBDB'),
  background: createColor('rgba(234, 242, 210, 0.62)'),
};

export type FontsTypes = typeof fonts;
export type ColorsTypes = typeof colors;

const theme: DefaultTheme = {
  colors,
  fonts,
};

export default theme;
