import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import Section from '@shared/Section';
import Modal from '@shared/Modal';

import styles from './Location.module.scss';

const cx = classNames.bind(styles);

export default function Location({ location }) {
  const formattedLocationAddress = location.address.replace('(', '\n(');
  const mapContainerRef = useRef(null);

  const linkKakaoMap = `https://map.kakao.com/link/to/${location.transportation.car.searchToNavi},${location.lat},${location.lng}`;
  const linkNaverMap = `https://map.naver.com/p?title=${location.transportation.car.searchToNavi}&lng=${location.lng}&lat=${location.lat}`;
  const linkTMap = `tmap://route?goalname=${encodeURIComponent(location.transportation.car.searchToNavi)}&goalx=${location.lng}&goaly=${location.lat}&style=1`;

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

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  function handleClickMapModal() {
    setIsOpenedModal((prev) => !prev);
  }

  return (
    <>
      <Section title="오시는 길" subtitle="location">
        <div className={cx('wrap-header')}>
          <div className={cx('txt-wedding_hall')}>{location.name}</div>
          <div className={cx('txt-address')}>{formattedLocationAddress}</div>
        </div>
        <div className={cx('wrap-map')}>
          <div className={cx('map')} ref={mapContainerRef}></div>
        </div>
        <button
          className={cx('btn-map-modal')}
          onClick={() => handleClickMapModal()}
        >
          약도 보러가기
        </button>
        <div className={cx('wrap-btns')}>
          <button className={cx('btn')}>
            <a href={linkKakaoMap} target="_blank">
              <img src="/icons/kakaoMap.png" alt="카카오 지도" />
            </a>
            <div className={cx('txt-appName')}>KAKAO 지도</div>
          </button>
          <button className={cx('btn')}>
            <a href={linkNaverMap} target="_blank">
              <img src="/icons/naverMap.png" alt="네이버 지도" />
            </a>
            <div className={cx('txt-appName')}>NAVER 지도</div>
          </button>
          <button className={cx('btn')}>
            <a href={linkTMap} target="_blank">
              <img src="/icons/tmap.png" alt="티맵로고" />
            </a>
            <div className={cx('txt-appName')}>TMAP</div>
          </button>
        </div>
      </Section>
      <Modal isOpened={isOpenedModal} handleClose={() => handleClickMapModal()}>
        <img
          className={cx('wedding_hall_map-img')}
          src="/images/wedding-hall-map.png"
          alt="웨딩홀 약도"
        />
      </Modal>
    </>
  );
}
