import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const DetailsForm: React.FC<IFormDataProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: { images: [] } });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const photos = watch('images');

  const onFormSubmit = (data: IFormData) => {
    // const {};
    console.log('Form Data:', data); // 폼 데이터 확인
    onSubmit(data); // 상위 컴포넌트로 데이터 전달
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
      const filesArray = Array.from(event.target.files).slice(0, 5);
      setValue('images', filesArray as any);
    }
  };

  return (
    <ScreenWrapper>
      <Form onSubmit={handleSubmit(onFormSubmit)} id="detailsForm">
        <Label htmlFor="title">제목</Label>
        <Input id="title" {...register('title', { required: true })} />
        {errors.title && <span>This field is required</span>}

        <Label htmlFor="region">지역</Label>
        <Input id="region" {...register('districtId', { required: true })} />
        {errors.districtId && <span>This field is required</span>}

        <Label htmlFor="distance">거리</Label>
        <Textarea id="distance" {...register('distance')} />
        <Label htmlFor="duration">시간</Label>
        <Textarea id="duration" {...register('time')} />
        <Label htmlFor="difficulty">난이도</Label>
        <Textarea id="difficulty" {...register('level')} />

        <Label htmlFor="photos">사진</Label>
        <Input
          id="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        {imagePreviews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index}`}
            style={{ width: '100px', height: '100px', margin: '5px' }}
          />
        ))}

        <Label htmlFor="description">산책로 소개</Label>
        <Textarea
          id="description"
          {...register('description')}
          rows={4}
        ></Textarea>

        <Label htmlFor="subTitle">subTitle</Label>
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
        ></Textarea>
        <button type="submit" style={{ display: 'none' }}>
          Submit
        </button>
      </Form>
    </ScreenWrapper>
  );
};

export default DetailsForm;
