import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

import Dimmed from '@shared/Dimmed';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-fade';
import './swiper.scss';
import styles from './ImageViewer.module.scss';

const cx = classNames.bind(styles);

export default function ImageViewer({
  images,
  selectedIdx,
  open = false,
  handleClose,
}) {
  if (!open) return;

  return (
    <Dimmed>
      <IconClose className={cx('icon-close')} handleClose={handleClose} />
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        slidesPerView={1}
        spaceBetween={50}
        loop={true}
        initialSlide={selectedIdx}
        navigation={{ hideOnClick: true }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
      >
        {images.slice(0, images.length - 1).map((image, idx) => (
          <SwiperSlide key={idx}>
            <picture>
              <source srcSet={`/images/${image}.webp`} type="image/webp" />
              <img src={`/images/${image}.jpg`} alt={`웨딩사진${idx + 1}`} />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </Dimmed>
  );
}

function IconClose({ className, handleClose }) {
  return (
    <div className={className} onClick={handleClose}>
      <svg version="1.1" viewBox="0 0 32 32">
        <path
          d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"
          id="Close"
        />
      </svg>
    </div>
  );
}
