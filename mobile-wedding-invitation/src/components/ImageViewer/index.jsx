import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

import Dimmed from '@shared/Dimmed';
import IconClose from '@icons/IconClose';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-fade';
import './swiper.scss';

export default function ImageViewer({
  images,
  selectedIdx,
  open = false,
  handleClose,
}) {
  if (!open) return;

  return (
    <Dimmed>
      <IconClose handleClose={handleClose} />
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
