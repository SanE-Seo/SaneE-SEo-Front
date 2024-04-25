// components/ProgressStepper.tsx
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface StepProps {
  isActive: boolean;
  isCompleted: boolean;
  isAnimating: boolean;
  isAnimatingForward: boolean;
}

// 애니메이션 정의
const fill = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

const empty = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Step = styled.div<StepProps>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isCompleted
      ? props.theme.colors.green500
      : props.isActive
        ? props.theme.colors.deepBrown
        : props.theme.colors.gray100};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 16px;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%); // vertically center
    left: 100%; // start from the right edge of the circle
    width: 40px; // static width
    height: 2px;
    background-color: #ccc; // default gray color
    z-index: -1;

    ${(props) =>
      props.isCompleted &&
      css`
        background-color: #94c020;
        animation: ${props.isAnimatingForward ? fill : empty} 0.2s linear
          forwards; // 속도 조정
      `}
  }
`;

interface ProgressStepperProps {
  currentStep: number;
  isAnimatingForward: boolean; // 애니메이션 방향 상태
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  currentStep,
  isAnimatingForward,
}) => {
  const steps = ['Course Edit', 'Content Write', 'Complete'];
  return (
    <StepsContainer>
      {steps.map((step, index) => (
        <Step
          key={step}
          isActive={index === currentStep}
          isCompleted={index < currentStep}
          isAnimating={index === currentStep - 1}
          isAnimatingForward={isAnimatingForward} // Pass isAnimatingForward prop here
        >
          {index + 1}
        </Step>
      ))}
    </StepsContainer>
  );
};

export default ProgressStepper;
