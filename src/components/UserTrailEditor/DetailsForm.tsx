// src\components\UserTrailEditor\DetailsForm.tsx
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as D from '../../styles/trail-detail-form.style';
import DropDownRegion from './DropDownRegion';
import DropDownTime from './DropDownTime';
import { MdOutlineCancel } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import * as E from '../../styles/user-trail-editor.style';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ProgressStepper from './ProgressStepper';
import { PolylineData } from '../../@types/custom';
import { useNavigate } from 'react-router-dom';
import { addImages, addPosts } from '../../apis/community';
import SeoulCoordinates from '../../seoul_districts_coordinates.json';

type IFormData = {
  title: string;
  description: string;
  level: string;
  distance: string;
  images: File[];
  districtId: string;
};

type FormProps = {
  handlePrevStep: () => void;
  currentStep: number;
  isAnimatingForward: boolean;
  handleNextStep: () => void;
  trailData: PolylineData;
  distance: string;
};

function DetailsForm({
  handlePrevStep,
  currentStep,
  isAnimatingForward,
  handleNextStep,
  trailData,
  distance,
}: FormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      images: [],
      title: '',
      level: '초급',
      districtId: '',
      distance,
    },
  });

  console.log(trailData);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [timeHours, setTimeHours] = useState<string>('0');
  const [timeMinutes, setTimeMinutes] = useState<string>('0');

  const navigate = useNavigate();

  const triggerFileInputClick = () => {
    const fileInput = document.getElementById('photos');
    if (fileInput) {
      fileInput.click();
    }
  };

  const photos = watch('images');

  const removeImage = (index: number) => {
    const updatedFilesArray = [...getValues('images')];
    updatedFilesArray.splice(index, 1);
    setValue('images', updatedFilesArray);
  };

  const onFormSubmit = async () => {
    const { title, description, level, distance, districtId } = getValues();

    const time =
      timeHours == '0'
        ? `${timeMinutes}분`
        : `${timeHours}시간 ${timeMinutes}분`; // time 설정

    console.log(
      title,
      description,
      level,
      distance,
      districtId,
      timeMinutes,
      timeHours,
    );

    const convertedCoordinates = trailData?.coordinates.map(({ lat, lng }) => [
      lat,
      lng,
    ]);

    const res = await addPosts(
      title,
      districtId,
      description,
      level,
      time,
      distance,
      Object.keys(SeoulCoordinates).indexOf(districtId) + 26,
      {
        name: trailData?.name,
        type: trailData?.type,
        coordinates: convertedCoordinates,
      },
    );

    if (res?.success) {
      const { images } = getValues();
      if (images.length > 0) {
        sendImages(res.data);
      } else {
        alert('게시물 등록 성공!');
        navigate('/community');
      }
    }
  };

  const sendImages = async (postId: number) => {
    const { images } = getValues();
    // FormData 객체 생성
    const formData = new FormData();

    // images 배열에 들어있는 이미지 파일들을 FormData에 추가
    images.forEach((file) => {
      formData.append('file', file);
    });

    formData.append('postId', `${postId}`);

    const res = await addImages(formData);

    if (res?.success) {
      alert('게시물 등록 성공!');
      navigate('/community');
    }
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

  return (
    <>
      <E.HeaderLayout>
        <E.AddButton onClick={handlePrevStep}>
          <span className="button_icon-wrapper">
            <IoIosArrowBack width={15} height={15} />
          </span>
          <span style={{ flex: 1, textAlign: 'center' }}>이전 단계</span>
          <span style={{ width: 25 }}></span>
        </E.AddButton>

        <ProgressStepper
          currentStep={currentStep}
          isAnimatingForward={isAnimatingForward}
        />

        <E.AddButton type="submit" onClick={handleSubmit(onFormSubmit)}>
          <span style={{ width: 25 }}></span>
          <span style={{ flex: 1, textAlign: 'center' }}>작성완료</span>
          <span className="button_icon-wrapper">
            <IoIosArrowForward width={15} height={15} />
          </span>
        </E.AddButton>
      </E.HeaderLayout>
      <D.ScreenWrapper>
        <D.Form id="detailsForm">
          <D.InputContainer>
            <D.Label1 htmlFor="title">제목</D.Label1>
            <D.InputTitle
              id="title"
              type="text"
              placeholder="제목을 입력하세요 (4자 이상, 20자 이하)"
              {...register('title', {
                required: '제목은 필수 항목입니다.',
                minLength: {
                  value: 4,
                  message: '제목은 4자 이상이어야 합니다.', // 4자 미만일 때 표시될 메시지
                },
                maxLength: {
                  value: 20,
                  message: '제목은 20자 이하이어야 합니다.', // 20자 초과일 때 표시될 메시지
                },
              })}
            />
            {errors.title && (
              <D.ErrorMessage>{errors.title.message}</D.ErrorMessage>
            )}
          </D.InputContainer>

          <D.Label1>코스 정보</D.Label1>
          <D.CourseInfoContainer>
            <D.InputContainer>
              <D.Label2 htmlFor="region">지역</D.Label2>
              <Controller
                name="districtId"
                control={control}
                rules={{ required: '지역을 선택해주세요.' }}
                render={({ field }) => (
                  <DropDownRegion
                    {...field}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {errors.districtId && (
                <D.ErrorMessage>{errors.districtId.message}</D.ErrorMessage>
              )}
            </D.InputContainer>

            <D.InputContainer>
              <D.Label2 htmlFor="timeHours" style={{ marginBottom: '5px' }}>
                소요 시간
              </D.Label2>
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
            </D.InputContainer>

            <D.InputContainer>
              <D.Label2 htmlFor="level">난이도</D.Label2>

              <Controller
                name="level"
                control={control}
                rules={{ required: '난이도를 선택해주세요.' }}
                render={({ field }) => (
                  <DropDownTime
                    {...field}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    options={['초급', '중급', '고급']} // 초급, 중급, 고급을 옵션으로 전달
                  />
                )}
              />
              {/* <DropDownTime
                value={getValues('level')}
                onChange={(value) => setValue('level', value)}
                options={['초급', '중급', '고급']} // 초급, 중급, 고급을 옵션으로 전달
                {...register('level', {
                  required: '난이도는 필수 입력값입니다.',
                })}
              /> */}
              {errors.level && (
                <D.ErrorMessage>{errors.level.message}</D.ErrorMessage>
              )}
            </D.InputContainer>
            <D.InputContainer>
              <D.Label2>거리</D.Label2>
              <D.Input
                placeholder="예: Km, m"
                type="text"
                readOnly // 입력 필드를 읽기 전용으로 설정
                {...register('distance', {
                  required: '거리는 필수 입력값입니다.',
                })}
              />
              {errors.distance && (
                <D.ErrorMessage>{errors.distance.message}</D.ErrorMessage>
              )}
            </D.InputContainer>
          </D.CourseInfoContainer>

          <br />
          <D.Label1>사진</D.Label1>
          <D.ImageUploadContainer>
            {imagePreviews.map((src, index) => (
              <D.ImagePreviewContainer key={index}>
                <D.ImagePreview src={src} alt={`Preview ${index}`} />
                <D.RemoveButton onClick={() => removeImage(index)}>
                  <MdOutlineCancel />
                </D.RemoveButton>
              </D.ImagePreviewContainer>
            ))}
            {imagePreviews.length < 5 && (
              <D.ImageAddButton type="button" onClick={triggerFileInputClick}>
                <IoAdd />
              </D.ImageAddButton>
            )}
            <D.Input
              id="photos"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </D.ImageUploadContainer>
          <br />
          <D.InputContainer>
            <D.Label1 htmlFor="description">코스 소개</D.Label1>
            <D.Textarea
              id="description"
              placeholder="코스에 대한 소개를 작성하세요 (10자 이상, 100자 이하)"
              {...register('description', {
                minLength: {
                  value: 10,
                  message: '10자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 100,
                  message: '100자 이하여야 합니다.',
                },
              })}
            />
            {errors.description && (
              <D.ErrorMessage>
                코스 소개는 10자 이상, 100자 이하여야 합니다.
              </D.ErrorMessage>
            )}
          </D.InputContainer>
        </D.Form>
      </D.ScreenWrapper>
    </>
  );
}

export default DetailsForm;
