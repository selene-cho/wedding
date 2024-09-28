import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

import Dimmed from '@shared/Dimmed';
import IconClose from '@icons/IconClose';
import generateAssetsUrl from '@utils/generateAssetsUrl';

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
  if (!open) {
    document.body.style.overflowY = 'auto';
    return;
  }

  document.body.style.overflowY = 'hidden';

  return (
    <Dimmed>
      <IconClose fullscreen={true} handleClose={handleClose} />
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
              <source
                srcSet={generateAssetsUrl({
                  format: 'webp',
                  filename: image,
                })}
                type="image/webp"
              />
              <img
                src={generateAssetsUrl({
                  format: 'jpg',
                  filename: image,
                })}
                alt={`웨딩사진${idx + 1}`}
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </Dimmed>
  );
}
