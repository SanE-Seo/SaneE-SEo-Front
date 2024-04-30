import React from 'react';
import styled, { css, keyframes } from 'styled-components';
function Spinner2() {
  return (
    <Loader>
      <JimuPrimaryLoading />
    </Loader>
  );
}

export default Spinner2;

// keyframes를 사용한 애니메이션 정의
const loadingAnimation = keyframes`
  0%, 80%, 100% {
    opacity: 0.75;
    box-shadow: 0 0 #645023;
    height: 32px;
  }
  40% {
    opacity: 1;
    box-shadow: 0 -8px #645023;
    height: 40px;
  }
`;

// 로더 스타일 컴포넌트
const Loader = styled.div`
  height: 200px;
  display: flex;
  justify-content: center; // 가로 중앙 정렬
  align-items: flex-end; // 세로 아래쪽 정렬
`;

// 주요 로딩 컴포넌트 스타일
const JimuPrimaryLoading = styled.div`
  background: #645023;
  animation: ${css`
    ${loadingAnimation} 0.8s infinite ease-in-out
  `};
  width: 13.6px;
  height: 32px;
  text-indent: -9999em;
  margin: auto;
  position: absolute;
  // right: calc(50% - 6.8px);
  // top: calc(50% - 16px);
  margin-bottom: 20px; // 화면 아래쪽 여백 조정
  animation-delay: 0.16s !important;

  &:before,
  &:after {
    position: absolute;
    bottom: 0;
    content: '';
    background: #645023;
    animation: ${css`
      ${loadingAnimation} 0.8s infinite ease-in-out
    `};
    width: 13.6px;
    height: 32px;
  }

  &:before {
    left: -19.992px;
  }

  &:after {
    left: 19.992px;
    animation-delay: 0.32s !important;
  }
`;
