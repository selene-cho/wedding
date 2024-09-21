import { useState } from 'react';
import classNames from 'classnames/bind';

import Section from '@shared/Section';
import styles from './Gallery.module.scss';

const cx = classNames.bind(styles);

export default function Gallery({ images }) {
  const [isOpened, setIsOpened] = useState(false);

  function handleClickPicture() {
    return;
  }

  function handleClickViewMore() {
    setIsOpened((prev) => !prev);
  }

  return (
    <Section title="갤러리" subtitle="gallery">
      <ul className={cx('wrap-images', { viewAll: isOpened })}>
        {images.slice(0, images.length - 1).map((image, idx) => (
          <li
            key={idx}
            className={cx(
              'wrap-image',
              { foldedView: idx < 9 },
              idx >= 9 && (isOpened ? 'fadeIn' : 'fadeOut'),
            )}
            onClick={handleClickPicture}
          >
            <picture>
              <source
                srcSet={`/images/w360/${image}_w360.webp`}
                type="image/webp"
              />
              <img
                src={`/images/w360/${image}_w360.jpg`}
                alt={`웨딩사진${idx + 1}`}
              />
            </picture>
          </li>
        ))}
      </ul>
      <div className={cx('wrap-view-more')}>
        <div
          className={cx('gradientBar', isOpened ? 'fadeIn' : 'fadeOut')}
        ></div>
        <button className={cx('wrap-icon')} onClick={handleClickViewMore}>
          <IconViewMore
            className={cx('icon-view-more', { isOpened: isOpened })}
          />
        </button>
      </div>
    </Section>
  );
}

function IconViewMore({ className }) {
  return (
    <svg className={className} viewBox="0 0 96 96">
      <title />
      <path d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z" />
    </svg>
  );
}
