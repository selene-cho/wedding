import { useState } from 'react';
import classNames from 'classnames/bind';

import Section from '@shared/Section';
import ImageViewer from '@components/ImageViewer';
import IconViewMore from '@icons/IconViewMore';
import generateAssetsUrl from '@utils/generateAssetsUrl';
import styles from './Gallery.module.scss';

const cx = classNames.bind(styles);

export default function Gallery({ images }) {
  const [isOpenedViewMore, setIsOpenedViewMore] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);

  const open = selectedIdx > -1;

  function handleClickViewMore() {
    setIsOpenedViewMore((prev) => !prev);
  }

  return (
    <>
      <Section title="갤러리" subtitle="gallery">
        <ul className={cx('wrap-images', { viewAll: isOpenedViewMore })}>
          {images.slice(0, images.length - 1).map((image, idx) => (
            <li
              key={idx}
              className={cx('wrap-image', {
                fadeOutUp: idx >= 9 && !isOpenedViewMore,
              })}
              onClick={() => setSelectedIdx(idx)}
            >
              <picture>
                <source
                  srcSet={generateAssetsUrl({
                    small: true,
                    format: 'webp',
                    filename: image,
                  })}
                  type="image/webp"
                />
                <img
                  src={generateAssetsUrl({
                    small: true,
                    format: 'jpg',
                    filename: image,
                  })}
                  alt={`웨딩사진${idx + 1}`}
                />
              </picture>
            </li>
          ))}
        </ul>
        <div className={cx('wrap-view-more')}>
          <div className={cx('gradientBar', { show: !isOpenedViewMore })}></div>
          <button className={cx('wrap-icon')} onClick={handleClickViewMore}>
            <IconViewMore isOpenedViewMore={isOpenedViewMore} />
          </button>
        </div>
      </Section>
      <ImageViewer
        images={images}
        selectedIdx={selectedIdx}
        open={open}
        handleClose={() => setSelectedIdx(-1)}
      />
    </>
  );
}
