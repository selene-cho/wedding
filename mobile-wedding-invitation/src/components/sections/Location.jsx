import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Section from '@shared/Section';
import Modal from '@shared/Modal';
import KakaoMap from '@components/KakaoMap';
import generateAssetsUrl from '@utils/generateAssetsUrl';

import styles from './Location.module.scss';

const cx = classNames.bind(styles);

export default function Location({ location }) {
  const { subway, bus, car, parking } = location.transportation;
  const formattedLocationAddress = location.address.replace('(', '\n(');

  const [naverMapLink, setNaverMapLink] = useState('#');

  const linkKakaoMap = `https://map.kakao.com/link/to/${car.searchToNavi},${location.lat},${location.lng}`;
  const linkNaverMapWeb = `https://map.naver.com/p?title=${encodeURIComponent(car.searchToNavi)}&lng=${location.lng}&lat=${location.lat}`;
  const linkNaverMapMobile = `nmap://route/car?dlat=${location.lat}&dlng=${location.lng}&dname=${encodeURIComponent(car.searchToNavi)}&appname=${import.meta.env.VITE_CLOUDFRONT_URL}`;
  const linkTMap = `tmap://route?goalname=${encodeURIComponent(car.searchToNavi)}&goalx=${location.lng}&goaly=${location.lat}&style=1`;

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  function handleClickMapModal() {
    setIsOpenedModal((prev) => !prev);
  }

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isMobile) {
      return setNaverMapLink(linkNaverMapMobile);
    }

    setNaverMapLink(linkNaverMapWeb);
  }, []);

  return (
    <>
      <Section title="오시는 길" subtitle="location">
        <div className={cx('wrap-header')}>
          <div className={cx('txt-wedding_hall')}>{location.name}</div>
          <div className={cx('txt-address')}>{formattedLocationAddress}</div>
        </div>
        <KakaoMap location={location} />
        <button
          className={cx('btn-map-modal')}
          onClick={() => handleClickMapModal()}
        >
          약도 이미지 보기
        </button>
        <div className={cx('wrap-btns')}>
          <button className={cx('btn')}>
            <a href={linkKakaoMap} target="_blank" rel="noreferrer noopener">
              <img src="/icons/kakaoMap.png" alt="카카오 지도" />
            </a>
            <div className={cx('txt-appName')}>KAKAO 지도</div>
          </button>
          <button className={cx('btn')}>
            <a
              id="naverMapLink"
              href={naverMapLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src="/icons/naverMap.png" alt="네이버 지도" />
            </a>
            <div className={cx('txt-appName')}>NAVER 지도</div>
          </button>
          <button className={cx('btn')}>
            <a href={linkTMap} target="_blank" rel="noreferrer noopener">
              <img src="/icons/tmap.png" alt="티맵로고" />
            </a>
            <div className={cx('txt-appName')}>TMAP</div>
          </button>
        </div>
        <div className={cx('wrap-transportation')}>
          <div className={cx('wrap-vehicle')}>
            <div className={cx('txt-vehicle')}>지하철</div>
            <div className={cx('txt-way2come')}>
              {subway.line.map((line, idx) => (
                <span className={cx('subway-line')} key={idx}>
                  {line}
                </span>
              ))}
            </div>
            <div className={cx('txt-way2come')}>- {subway.directions}</div>
            <div className={cx('txt-way2come')}>- {subway.shuttleBus}</div>
          </div>
          <div className={cx('wrap-vehicle')}>
            <div className={cx('txt-vehicle')}>버스</div>
            <div className={cx('txt-way2come')}>
              {bus.map((item, idx) => (
                <div className={cx('wrap-bus')} key={idx}>
                  <span className={cx('txt-bus-direction')}>
                    {item.direction}
                  </span>
                  <ul>
                    {item.stop.map((stop, idx) => (
                      <li className={cx('txt-bus-stop')} key={idx}>
                        - {stop}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className={cx('wrap-vehicle')}>
            <div className={cx('txt-vehicle')}>자동차</div>
            <div className={cx('txt-way2come')}>
              {car.highway.map((way, idx) => (
                <div className={cx('wrap-car')} key={idx}>
                  <span className={cx('txt-way')}>{way.name}</span>
                  <div>- {way.directions}</div>
                </div>
              ))}
            </div>
            <div className={cx('wrap-parking')}>
              <div className={cx('txt-vehicle')}>주차</div>
              <div className={cx('txt-parking')}>{parking}</div>
            </div>
          </div>
        </div>
      </Section>
      <Modal isOpened={isOpenedModal} handleClose={() => handleClickMapModal()}>
        <picture>
          <source
            srcSet={generateAssetsUrl({
              filename: 'wedding-hall-map',
              format: 'webp',
            })}
          />
          <img
            className={cx('wedding_hall_map-img')}
            src={generateAssetsUrl({
              filename: 'wedding-hall-map',
              format: 'png',
            })}
            alt="웨딩홀 약도"
          />
        </picture>
      </Modal>
    </>
  );
}
