import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

import Section from '@shared/Section';
import Toast from '@shared/Toast';
import generateAssetsUrl from '@utils/generateAssetsUrl';
import styles from './Share.module.scss';

const cx = classNames.bind(styles);

export default function Share({ groomName, brideName, date, location }) {
  const [toasts, setToasts] = useState([]);

  function handleCopy() {
    setToasts((prev) => [
      ...prev,
      {
        id: Date.now(),
        toasted: true,
        type: 'success',
        message: '복사가 완료되었습니다 🥳',
      },
    ]);
  }

  function handleCloseToast(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  function handleShareKakao() {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${groomName} ❤️ ${brideName} 결혼합니다.`,
        description: `${format(parseISO(date), 'M월 d일 eeee aaa h시', { locale: ko })} / ${location}`,
        imageUrl: `${generateAssetsUrl({
          small: true,
          format: 'jpg',
          filename: 'wedding_11',
        })}`,
        link: {
          mobileWebUrl: window.location.origin,
          webUrl: window.location.origin,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: window.location.origin,
            webUrl: window.location.origin,
          },
        },
      ],
    });
  }

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
      }
    };
  }, []);

  return (
    <Section className={cx('container')}>
      <div className={cx('wrap-share')}>
        <div className={cx('wrap-btn')}>
          <button
            className={cx('icon-btn', 'btn-kakao')}
            onClick={handleShareKakao}
          >
            <IconKakao className={cx('icon-kakao')} />
          </button>
          <div>카카오톡 공유</div>
        </div>
        <div className={cx('wrap-btn')}>
          <CopyToClipboard
            text={window.location.origin}
            onCopy={() => handleCopy()}
          >
            <button className={cx('icon-btn', 'btn-link')}>
              <IconLink className={cx('icon-link')} />
            </button>
          </CopyToClipboard>
          <div>링크 복사</div>
        </div>
      </div>
      <Toast toasts={toasts} handleClose={handleCloseToast} />
    </Section>
  );
}

function IconKakao({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" version="1.1">
      <g id="Layer_1" />
      <g id="Layer_2">
        <g>
          <g>
            <path
              fill="#3D1D1C"
              d="M50.208,7.556C6.123,7.324-14.318,53.867,25.774,74.543c-0.705,2.429-4.527,15.63-4.68,16.667     c-0.109,0.811,0.509,1.491,1.511,1.143C24.053,92.15,39.385,81.38,42.039,79.51C105.612,87.119,118.13,10.476,50.208,7.556z"
            />
            <path
              fill="#FFE812"
              d="M27.433,53.943c-0.086,3.333-5.216,3.346-5.307,0c0,0,0-15.763,0-15.763h-4.14     c-3.429-0.087-3.436-5.107,0-5.196c0,0,13.587,0,13.587,0c3.431,0.091,3.435,5.105,0,5.196c0,0-4.14,0-4.14,0V53.943z"
            />
            <path
              fill="#FFE812"
              d="M49.733,56.076c-1.191,0.628-3.495,0.475-3.895-0.806c0,0-1.314-3.44-1.314-3.44l-8.091,0l-1.315,3.442     c-0.398,1.279-2.703,1.433-3.893,0.804c-0.732-0.337-1.435-1.265-0.629-3.768l6.347-16.705c1.299-3.426,5.766-3.441,7.073,0.003     c0,0,6.344,16.698,6.344,16.698C51.167,54.812,50.464,55.74,49.733,56.076z"
            />
            <path
              fill="#FFE812"
              d="M63.143,56.09H54.63c-1.402,0-2.543-1.091-2.543-2.432V35.637c0.091-3.492,5.324-3.503,5.417,0     c0,0,0,15.588,0,15.588h5.639C66.492,51.308,66.499,56.005,63.143,56.09z"
            />
            <path
              fill="#FFE812"
              d="M83.914,54.092c-0.236,2.275-3.433,3.113-4.745,1.231c0,0-6.222-8.245-6.222-8.245l-0.921,0.921v5.789     c-0.087,3.492-5.216,3.505-5.308,0.001c0,0,0-18.152,0-18.152c0.092-3.495,5.213-3.502,5.307,0c0,0,0,5.703,0,5.703l7.403-7.403     c0.888-0.901,2.432-0.707,3.298,0.193c0.901,0.856,1.096,2.418,0.195,3.298l-6.047,6.046l6.531,8.653     C83.83,52.687,84.013,53.395,83.914,54.092z"
            />
            <polygon
              fill="#3D1D1C"
              points="37.829,47.131 43.129,47.131 40.479,39.602    "
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

function IconLink({ className }) {
  return (
    <svg className={className} viewBox="0 0 640 512">
      <path d="M598.6 41.41C570.1 13.8 534.8 0 498.6 0s-72.36 13.8-99.96 41.41l-43.36 43.36c15.11 8.012 29.47 17.58 41.91 30.02c3.146 3.146 5.898 6.518 8.742 9.838l37.96-37.96C458.5 72.05 477.1 64 498.6 64c20.67 0 40.1 8.047 54.71 22.66c14.61 14.61 22.66 34.04 22.66 54.71s-8.049 40.1-22.66 54.71l-133.3 133.3C405.5 343.1 386 352 365.4 352s-40.1-8.048-54.71-22.66C296 314.7 287.1 295.3 287.1 274.6s8.047-40.1 22.66-54.71L314.2 216.4C312.1 212.5 309.9 208.5 306.7 205.3C298.1 196.7 286.8 192 274.6 192c-11.93 0-23.1 4.664-31.61 12.97c-30.71 53.96-23.63 123.6 22.39 169.6C293 402.2 329.2 416 365.4 416c36.18 0 72.36-13.8 99.96-41.41L598.6 241.3c28.45-28.45 42.24-66.01 41.37-103.3C639.1 102.1 625.4 68.16 598.6 41.41zM234 387.4L196.1 425.3C181.5 439.1 162 448 141.4 448c-20.67 0-40.1-8.047-54.71-22.66c-14.61-14.61-22.66-34.04-22.66-54.71s8.049-40.1 22.66-54.71l133.3-133.3C234.5 168 253.1 160 274.6 160s40.1 8.048 54.71 22.66c14.62 14.61 22.66 34.04 22.66 54.71s-8.047 40.1-22.66 54.71L325.8 295.6c2.094 3.939 4.219 7.895 7.465 11.15C341.9 315.3 353.3 320 365.4 320c11.93 0 23.1-4.664 31.61-12.97c30.71-53.96 23.63-123.6-22.39-169.6C346.1 109.8 310.8 96 274.6 96C238.4 96 202.3 109.8 174.7 137.4L41.41 270.7c-27.6 27.6-41.41 63.78-41.41 99.96c-.0001 36.18 13.8 72.36 41.41 99.97C69.01 498.2 105.2 512 141.4 512c36.18 0 72.36-13.8 99.96-41.41l43.36-43.36c-15.11-8.012-29.47-17.58-41.91-30.02C239.6 394.1 236.9 390.7 234 387.4z" />
    </svg>
  );
}
