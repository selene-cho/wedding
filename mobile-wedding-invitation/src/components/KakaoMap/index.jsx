import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './KakaoMap.module.scss';

const cx = classNames.bind(styles);

export default function KakaoMap({ location }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APP_KEY}&autoload=false`;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        );

        const mapOptions = {
          center: position,
          level: 3,
        };

        const map = new window.kakao.maps.Map(
          mapContainerRef.current,
          mapOptions,
        );

        const markerImageSrc = '/icons/weddingLocation.svg';
        const markerImageSize = new window.kakao.maps.Size(48, 48);
        const markerImageOption = {
          offset: new window.kakao.maps.Point(15, 40),
          alt: '마커 이미지 아이콘',
        };

        const markerImage = new window.kakao.maps.MarkerImage(
          markerImageSrc,
          markerImageSize,
          markerImageOption,
        );

        const marker = new window.kakao.maps.Marker({
          position,
          image: markerImage,
        });

        marker.setMap(map);
      });
    };
  }, [location]);

  return (
    <div className={cx('wrap-map')}>
      <div className={cx('map')} ref={mapContainerRef}></div>
    </div>
  );
}
