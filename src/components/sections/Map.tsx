import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Map.module.scss';

import Section from '@shared/Section';
import { Location } from '@models/wedding';

const cx = classNames.bind(styles);

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map({ location }: { location: Location }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_APP_KEY}&autoload=false`;
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

        const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);

        const marker = new window.kakao.maps.Marker({
          position,
        });

        marker.setMap(map);
      });
    };
  }, [location]);

  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-title')}>오시는길</span>
          <span className={cx('txt-subtitle')}>{location.name}</span>
          <span className={cx('txt-subtitle')}>{location.address}</span>
        </div>
      }
    >
      <div className={cx('wrap-map')}>
        <div className={cx('map')} ref={mapContainer}></div>

        <a
          className={cx('btn-find-way')}
          href={location.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          길찾기
        </a>
      </div>

      <div>
        <WayToCome label="버스" list={location.waytocome.bus} />
        <WayToCome label="지하철" list={location.waytocome.metro} />
      </div>
    </Section>
  );
}

function WayToCome({
  label,
  list,
}: {
  label: React.ReactNode;
  list: string[];
}) {
  return (
    <div className={cx('wrap-waytocome')}>
      <div className={cx('txt-label')}>{label}</div>
      <ul>
        {list.map((waytocome) => (
          <li>{waytocome}</li>
        ))}
      </ul>
    </div>
  );
}
