import React from 'react';
import styled from 'styled-components';
import { PostData } from '../../@types/post';

type detailProps = {
  detail: PostData;
};
function CourseDetail({ detail }: detailProps) {
  return (
    <DetailLayout>
      <span className="detail-title">코스 소개</span>
      <span className="detail-text">{detail.description}</span>
      <span className="detail-title">사용자 등록 사진</span>
    </DetailLayout>
  );
}

export default CourseDetail;

const DetailLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  cursor: default;

  .detail-title {
    ${(props) => props.theme.fonts.text_md};
    color: ${(props) => props.theme.colors.gray700};
  }
  .detail-text {
    ${(props) => props.theme.fonts.text_sm};
    color: ${(props) => props.theme.colors.gray400};
    margin: 5px 0 15px 0;
  }
`;
