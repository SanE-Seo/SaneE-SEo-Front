import { atom } from 'recoil';

export const isLoggedInState = atom<boolean>({
  key: 'isLoggedIn',
  default: false, // 기본값은 로그인하지 않은 상태(false)
});

export const memberIdState = atom<number | null>({
  key: 'memberId',
  default: null, // 기본값은 null
});
