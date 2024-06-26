import React, { useState } from 'react';
import * as M from '../../styles/my-page.style';
import Spinner from '../Spinner';
import { useQuery } from '@tanstack/react-query';
import { getUserActivities } from '../../apis/user';
import CardItem from '../SeoulTrails.tsx/CardItem';
import UserTrailCardItem from './UserTrailCardItem';

function UserActivity() {
  const [selectedActivity, setSelectedActivity] =
    useState<string>('나의 산책로');

  const activities: string[] = [
    '나의 산책로',
    '좋아한 두드림길',
    '좋아한 걸음나눔터',
  ];

  const { isLoading, data } = useQuery({
    queryKey: ['getUserActivities', selectedActivity],
    queryFn: () => getUserActivities(activities.indexOf(selectedActivity)),
    enabled: true,
  });

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
            <M.CardItemBox>
              {data.data.map((item, index) =>
                selectedActivity === '나의 산책로' ||
                selectedActivity === '좋아한 걸음나눔터' ? (
                  <UserTrailCardItem key={index} data={item} />
                ) : (
                  <CardItem key={index} data={item} />
                ),
              )}
            </M.CardItemBox>
          ) : (
            <M.CardItemBox>
              <div className="no-content">
                <span className="text-md">해당하는 활동이 없습니다.</span>
              </div>
            </M.CardItemBox>
          )
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '50px',
            }}
          >
            <Spinner />
          </div>
        )}
      </M.UserActivityLayout>
    </>
  );
}

export default UserActivity;
