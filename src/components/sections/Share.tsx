import classNames from 'classnames/bind';
import styles from './Share.module.scss';
import Section from '@shared/Section';
import { useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const cx = classNames.bind(styles);

declare global {
  interface Window {
    Kakao: any;
  }
}

interface ShareProps {
  groomName: string;
  brideName: string;
  date: string;
}

export default function Share({ groomName, brideName, date }: ShareProps) {
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

  const handleShareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${groomName} ❤️ ${brideName} 결혼합니다.`,
        description: `${format(parseISO(date), 'M월 d일 eeee aaa h시', { locale: ko })}`,
        imageUrl:
          'https://d2v80xjmx68n4w.cloudfront.net/gigs/rate/AwJVF1609941206.jpg',
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
  };

  return (
    <Section title="공유하기">
      <div className={cx('wrap-share')}>
        <button onClick={handleShareKakao}>
          <IconKakao />
        </button>
        <CopyToClipboard
          text={window.location.origin}
          onCopy={() => {
            window.alert('복사가 완료 되었습니다.');
          }}
        >
          <button>
            <IconClipboard />
          </button>
        </CopyToClipboard>
      </div>
    </Section>
  );
}

function IconKakao() {
  return (
    <svg version="1.1" viewBox="0 0 100 100">
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

function IconClipboard() {
  return (
    <svg fill="none" viewBox="0 0 24 24">
      <path
        d="M8 9C7.58579 9 7.25 9.33579 7.25 9.75C7.25 10.1642 7.58579 10.5 8 10.5H16C16.4142 10.5 16.75 10.1642 16.75 9.75C16.75 9.33579 16.4142 9 16 9H8ZM11.25 13.75C11.25 13.3358 11.5858 13 12 13H16C16.4142 13 16.75 13.3358 16.75 13.75C16.75 14.1642 16.4142 14.5 16 14.5H12C11.5858 14.5 11.25 14.1642 11.25 13.75ZM10 17C9.58579 17 9.25 17.3358 9.25 17.75C9.25 18.1642 9.58579 18.5 10 18.5H16C16.4142 18.5 16.75 18.1642 16.75 17.75C16.75 17.3358 16.4142 17 16 17H10ZM15.9862 3.99944C15.8616 2.87472 14.9079 2 13.75 2H10.25C9.09205 2 8.13841 2.87472 8.01379 3.99944L6.25 4C5.00736 4 4 5.00736 4 6.25V19.75C4 20.9926 5.00736 22 6.25 22H17.75C18.9926 22 20 20.9926 20 19.75V6.25C20 5.00736 18.9926 4 17.75 4L15.9862 3.99944ZM15.9948 4.09595L16 4.25C16 4.19822 15.9983 4.14685 15.9948 4.09595ZM10.25 6.5H13.75C14.53 6.5 15.2174 6.10307 15.621 5.50016L17.75 5.5C18.1642 5.5 18.5 5.83579 18.5 6.25V19.75C18.5 20.1642 18.1642 20.5 17.75 20.5H6.25C5.83579 20.5 5.5 20.1642 5.5 19.75V6.25C5.5 5.83579 5.83579 5.5 6.25 5.5L8.37902 5.5002C8.78267 6.1031 9.46997 6.5 10.25 6.5ZM10.25 3.5H13.75C14.1642 3.5 14.5 3.83579 14.5 4.25C14.5 4.66421 14.1642 5 13.75 5H10.25C9.83579 5 9.5 4.66421 9.5 4.25C9.5 3.83579 9.83579 3.5 10.25 3.5Z"
        fill="#212121"
      />
    </svg>
  );
}
