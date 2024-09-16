import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import Section from '@shared/Section';

const cx = classNames.bind(styles);

export default function Video() {
  return (
    <Section className={cx('container')}>
      <video autoPlay muted loop poster="/assets/images/poster.jpg">
        <source src="/assets/videos/main.webm" type="video/webm" />
        <source src="/assets/videos/main.mp4" type="video/mp4" />
      </video>
    </Section>
  );
}
