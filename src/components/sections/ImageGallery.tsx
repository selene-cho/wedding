import classNames from 'classnames/bind';
import styles from './ImageGallery.module.scss';

import Section from '@shared/Section';

const cx = classNames.bind(styles);

export default function ImageGallery({ images }: { images: string[] }) {
  return (
    <Section title="갤러리">
      <ul className={cx('wrap-images')}>
        {images.map((src, idx) => (
          <li key={idx} className={cx('wrap-image')}>
            <img src={src} alt="사진첩 이미지" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
