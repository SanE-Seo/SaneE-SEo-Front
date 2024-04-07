// import original module declarations
import 'styled-components';
import { FontsTypes, ColorsTypes } from './theme';
//타입선언
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fonts: FontsTypes;
  }
}
