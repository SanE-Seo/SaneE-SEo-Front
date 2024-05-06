import React, { useState, useEffect, useCallback } from 'react';
import * as M from '../../styles/my-page.style';
import Spinner from '../Spinner';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getUserActivities } from '../../apis/user';
import CardItem from '../SeoulTrails.tsx/CardItem';

function UserActivity() {
  const [offset, setOffset] = useState<number>(0);
  const [selectedActivity, setSelectedActivity] =
    useState<string>('나의 산책로');

  const activities: string[] = [
    '나의 산책로',
    '좋아한 두드림길',
    '좋아한 걸음나눔터',
  ];

  const { isLoading, data } = useQuery({
    queryKey: ['getUserAtivities', selectedActivity],
    queryFn: () => getUserActivities(activities.indexOf(selectedActivity)),
    enabled: true,
  });

  const handlePrevClick = useCallback(() => {
    if (offset < 0) setOffset(offset + 1000);
  }, [offset]);

  const handleNextClick = useCallback(() => {
    if (offset > -2000) setOffset(offset - 1000);
  }, [offset]);

  const onActivityClick = (activity: string) => {
    setSelectedActivity(activity);
    console.log(activity);
  };

  return (
    <>
      <M.UserActivityLayout>
        <ul className="slide-item-wrapper">
          {[...activities].map((activityName, index) => (
            <M.SlideItem
              key={index}
              className="slide-item"
              offset={offset}
              active={selectedActivity == activityName}
            >
              <button onClick={() => onActivityClick(activityName)}>
                {activityName}
              </button>
            </M.SlideItem>
          ))}
        </ul>
        {!isLoading ? (
          data && data.data.length > 0 ? (
            <M.SlideItem>
              {data.data.map((item, index) => (
                <CardItem key={index} data={item} />
              ))}
            </M.SlideItem>
          ) : (
            <M.SlideItem>
              <div className="no-content">
                <span className="text-md">해당되는 활동이 없습니다.</span>
              </div>
            </M.SlideItem>
          )
        ) : (
          <Spinner />
        )}
      </M.UserActivityLayout>
    </>
  );
}

export default UserActivity;
