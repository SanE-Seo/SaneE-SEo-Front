// src\components\UserTrailEditor\DetailsForm.tsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DropDownRegion from './DropDownRegion';
import DropDownTime from './DropDownTime';
import { MdOutlineCancel } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';

interface IFormData {
  title: string;
  subTitle: string;
  description: string;
  level: string;
  time: string;
  distance: string;
  courseDetail: string;
  transportation: string;
  images: File[];
  districtId: string;
}

interface IFormDataProps {
  onSubmit: (data: IFormData) => void; // Type definition for onSubmit prop
}

interface InputProps {
  hasError?: boolean;
}

interface TextareaProps {
  hasError?: boolean;
}

const ScreenWrapper = styled.div`
  width: 1125px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label1 = styled.label`
  display: block;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const Label2 = styled.label`
  display: block;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 8px;
`;

const InputTitle = styled.input<InputProps>`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 4px;
  width: 100%;
  &::placeholder {
    color: ${({ theme }) =>
      theme.colors.gray400}; /* 테마 placeholder 색상 적용 */
  }
`;

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  &::placeholder {
    color: ${(props) => (props.hasError ? 'red' : 'default')};
  }

  &:invalid {
    border-color: ${(props) => (props.hasError ? 'red' : 'default')};
  }
`;

const Textarea = styled.textarea<TextareaProps>`
  width: 100%;
  height: 100px; // 높이를 150px로 조정
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;

  font-family: ${({ theme }) =>
    theme.fonts.text_sm}; !important; /* 테마 폰트 스타일 적용 */
  color: ${({ theme }) => theme.colors.gray800}; /* 테마 폰트 색상 적용 */

  &::placeholder {
    color: ${({ theme }) =>
      theme.colors.gray400}; /* 테마 placeholder 색상 적용 */
  }
`;

const CourseInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 5px;
`;

const ImageAddButton = styled.button`
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

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem; /* 에러 메시지의 글자 크기를 조정합니다 */
  margin-top: 3px; /* InputTitle과 ErrorMessage 사이의 간격을 줄입니다 */
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  margin-right: 5px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  border: none;
  cursor: pointer;
`;

const validateInput = (value: string): boolean => {
  return value.length >= 4 && value.length <= 20;
};

const validateDescription = (value: string): boolean => {
  const isValid = value.length >= 10 && value.length <= 100;
  console.log('Description Validation:', isValid);
  return isValid;
};

const triggerFileInputClick = () => {
  const fileInput = document.getElementById('photos');
  if (fileInput) {
    fileInput.click();
  }
};

const DetailsForm: React.FC<IFormDataProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: { images: [], districtId: '' } });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [valid, setValid] = useState<boolean | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [timeHours, setTimeHours] = useState<string>('0');
  const [timeMinutes, setTimeMinutes] = useState<string>('0');

  const photos = watch('images');

  const removeImage = (index: number) => {
    const updatedFilesArray = [...getValues('images')];
    updatedFilesArray.splice(index, 1);
    setValue('images', updatedFilesArray);
  };

  const onFormSubmit = (data: IFormData, e: any) => {
    console.log('Form Data:', data);
    if (e) {
      console.error('Form Errors:', e);
    }
    onSubmit(data);
  };

  useEffect(() => {
    if (photos && photos.length) {
      const fileArray = Array.from(photos)
        .slice(0, 5)
        .map((file) => URL.createObjectURL(file));
      setImagePreviews(fileArray);
    } else {
      setImagePreviews([]);
    }
  }, [photos]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const existingFiles = getValues('images');
      const newFilesArray = Array.from(event.target.files);
      const updatedFilesArray = [...existingFiles, ...newFilesArray];
      setValue('images', updatedFilesArray as any);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setValid(validateInput(value));
    setValue('title', value, { shouldValidate: true });
  };

  return (
    <ScreenWrapper>
      <Form onSubmit={handleSubmit(onFormSubmit)} id="detailsForm">
        <>
          <div></div>
          <div style={{ position: 'relative' }}>
            <Label1 htmlFor="title">제목</Label1>
            <InputTitle
              id="title"
              placeholder="제목을 입력하세요 (4자 이상, 20자 이하)"
              value={inputValue}
              onChange={handleChange}
              required
              // {...register('title')}
            />
            {inputValue && !valid && (
              <ErrorMessage
                style={{ position: 'absolute', top: '100%', left: 0 }}
              >
                제목은 4자 이상, 20자 이하여야 합니다.
              </ErrorMessage>
            )}
          </div>
        </>

        <div>
          <Label1>코스 정보</Label1>
          <CourseInfoContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Label2 htmlFor="region">지역</Label2>
                <DropDownRegion
                  value={getValues('districtId')}
                  onChange={(value) => setValue('districtId', value)}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Label2 htmlFor="timeHours" style={{ marginBottom: '5px' }}>
                소요 시간
              </Label2>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <DropDownTime
                    value={timeHours}
                    onChange={(value) => setTimeHours(value)}
                    options={Array.from({ length: 10 }, (_, i) => i.toString())} // 0~9까지 시간을 옵션으로 전달
                  />
                  <span style={{ margin: '0 5px' }}>시</span>
                </div>
                <div style={{ marginLeft: '10px', marginRight: '10px' }}>/</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <DropDownTime
                    value={timeMinutes}
                    onChange={(value) => setTimeMinutes(value)}
                    options={Array.from({ length: 6 }, (_, i) =>
                      (i * 10).toString(),
                    )} // 0, 10, 20, 30, 40, 50을 옵션으로 전달
                  />
                  <span style={{ margin: '0 5px' }}>분</span>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <Label2 htmlFor="level">난이도</Label2>
              <DropDownTime
                value={getValues('level')}
                onChange={(value) => setValue('level', value)}
                options={['초급', '중급', '고급']} // 초급, 중급, 고급을 옵션으로 전달
              />
            </div>
            <div>
              <Label2 htmlFor="distance">거리</Label2>
              <Input id="distance" {...register('distance')} />
            </div>
          </CourseInfoContainer>
        </div>

        <div>
          <Label1>사진</Label1>
          <ImageUploadContainer>
            {imagePreviews.map((src, index) => (
              <ImagePreviewContainer key={index}>
                <ImagePreview src={src} alt={`Preview ${index}`} />
                <RemoveButton onClick={() => removeImage(index)}>
                  <MdOutlineCancel />
                </RemoveButton>
              </ImagePreviewContainer>
            ))}
            {imagePreviews.length < 5 && (
              <ImageAddButton type="button" onClick={triggerFileInputClick}>
                <IoAdd />
              </ImageAddButton>
            )}
            <Input
              id="photos"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </ImageUploadContainer>
        </div>

        <div>
          <div>
            <Label1 htmlFor="description">코스 소개</Label1>
            <Textarea
              id="description"
              placeholder="코스에 대한 소개를 작성하세요 (10자 이상, 100자 이하)"
              {...register('description', {
                validate: validateDescription,
              })}
              hasError={Boolean(errors.description)}
            />
            {errors.description && (
              <ErrorMessage>
                코스 소개는 10자 이상, 100자 이하여야 합니다.
              </ErrorMessage>
            )}
          </div>
        </div>

        {/* <Label htmlFor="subTitle">subTitle</Label>
        <Textarea id="subTitle" {...register('subTitle')} rows={4}></Textarea>
        <Label htmlFor="courseDetail">courseDetail</Label>
        <Textarea
          id="courseDetail"
          {...register('courseDetail')}
          rows={4}
        ></Textarea>
        <Label htmlFor="transportation">transportation</Label>
        <Textarea
          id="transportation"
          {...register('transportation')}
          rows={4}
        ></Textarea> */}
      </Form>
    </ScreenWrapper>
  );
};

export default DetailsForm;
