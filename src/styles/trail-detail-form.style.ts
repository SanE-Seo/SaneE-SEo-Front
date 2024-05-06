import styled from 'styled-components';

type InputProps = {
  hasError?: boolean;
};

type TextareaProps = {
  hasError?: boolean;
};

export const ScreenWrapper = styled.div`
  width: 1125px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const Label1 = styled.label`
  ${(props) => props.theme.fonts.title_sm};
  color: ${(props) => props.theme.colors.gray800};
  margin-bottom: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label2 = styled.label`
  ${(props) => props.theme.fonts.text_lg};
  color: ${(props) => props.theme.colors.gray800};
  margin: 10px 0;
`;

export const InputTitle = styled.input<InputProps>`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  ${(props) => props.theme.fonts.text_sm};
  color: ${({ theme }) => theme.colors.gray800};
  &::placeholder {
    color: ${({ theme }) =>
      theme.colors.gray400}; /* 테마 placeholder 색상 적용 */
  }
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  ${(props) => props.theme.fonts.text_sm};
  color: ${({ theme }) => theme.colors.gray800};

  &::placeholder {
    color: ${(props) => (props.hasError ? 'red' : 'default')};
  }

  &:invalid {
    border-color: ${(props) => (props.hasError ? 'red' : 'default')};
  }
`;

export const Textarea = styled.textarea<TextareaProps>`
  width: 100%;
  height: 100px; // 높이를 150px로 조정
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;

  ${(props) => props.theme.fonts.text_sm};
  color: ${({ theme }) => theme.colors.gray800}; /* 테마 폰트 색상 적용 */

  &::placeholder {
    color: ${({ theme }) =>
      theme.colors.gray400}; /* 테마 placeholder 색상 적용 */
  }
`;

export const CourseInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 5px;
`;

export const ImageAddButton = styled.button`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  type: button;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.red500};
  font-size: 0.8rem;
  margin-top: 3px;
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
  margin-right: 5px;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  border: none;
  cursor: pointer;
`;
