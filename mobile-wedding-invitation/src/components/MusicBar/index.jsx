import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import generateAssetsUrl from '@utils/generateAssetsUrl';
import styles from './MusicBar.module.scss';

const cx = classNames.bind(styles);

export default function MusicBar() {
  const [musicOn, setMusicOn] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const audioRef = useRef(null);

  function handleMusic() {
    setMusicOn((prev) => !prev);

    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cx('container')}>
      {showInfo && (
        <div className={cx('txt-info')}>배경음악이 준비 되어있습니다.</div>
      )}
      <button className={cx('btn')} onClick={handleMusic}>
        {musicOn ? (
          <IconMusicOn className={cx('icon-speaker')} />
        ) : (
          <IconMusicOff className={cx('icon-speaker')} />
        )}
      </button>
      <audio ref={audioRef} volume="0.3" loop>
        <source
          src={generateAssetsUrl({
            filename: 'bg-softly-gently',
            format: 'mp3',
            music: true,
          })}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

function IconMusicOn({ className }) {
  return (
    <svg className={className} viewBox="0 0 256 256">
      <rect fill="none" />
      <path
        d="M218.9,77.1a71.9,71.9,0,0,1,0,101.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <path
        d="M80,168H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H80l72-56V224Z"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
        x1="80"
        x2="80"
        y1="88"
        y2="168"
      />
      <path
        d="M190.6,105.4a31.9,31.9,0,0,1,0,45.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
    </svg>
  );
}

function IconMusicOff({ className }) {
  return (
    <svg className={className} viewBox="0 0 256 256">
      <rect fill="none" />
      <path
        d="M80,168H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H80l72-56V224Z"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
        x1="240"
        x2="192"
        y1="104"
        y2="152"
      />
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
        x1="240"
        x2="192"
        y1="152"
        y2="104"
      />
      <line
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
        x1="80"
        x2="80"
        y1="88"
        y2="168"
      />
    </svg>
  );
}
