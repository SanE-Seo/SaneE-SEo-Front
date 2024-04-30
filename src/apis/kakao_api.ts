// 자치구 정보를 얻는 함수 정의
export const getDistrict = (lat: number, lng: number) => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();

    const callback = function (
      result: { address: any }[],
      status: kakao.maps.services.Status,
    ) {
      if (status === kakao.maps.services.Status.OK) {
        // console.log(result);
        const address = result[0].address;
        const district = address.region_2depth_name; // 자치구 정보
        // console.log(district);
        resolve(district);
      } else {
        reject(new Error('Geocoding failed.'));
      }
    };

    geocoder.coord2Address(lng, lat, callback);
  });
};
