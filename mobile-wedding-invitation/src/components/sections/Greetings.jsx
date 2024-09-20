import classNames from 'classnames/bind';
import styles from './Greetings.module.scss';

import Section from '@shared/Section';

const cx = classNames.bind(styles);

export default function Greetings({
  message,
  groomName,
  groomParents,
  brideName,
  brideParents,
  subImg,
}) {
  return (
    <Section subtitle="invitation" title="소중한 분들을 초대합니다">
      <p className={cx('txt-intro')}>{message.intro}</p>
      <span className={cx('divided-bar')}>-</span>
      <p className={cx('txt-invitation')}>{message.invitation}</p>
      <picture className={cx('wrap-image')}>
        <source srcSet={`/images/${subImg}.webp`} type="image/webp" />
        <img src={`/images/${subImg}.jpg`} alt="웨딩사진" />
      </picture>
      <div className={cx('wrap-name')}>
        <div className={cx('wrap-parents')}>
          <div>
            <span className={cx('txt-name')}>{groomParents[0].name}</span>
            <span className={cx('divide-dot')}>・</span>
            <span className={cx('txt-name')}>{groomParents[1].name}</span>
          </div>
          <div>
            <span className={cx('txt-name')}>{brideParents[0].name}</span>
            <span className={cx('divide-dot')}>・</span>
            <span className={cx('txt-name')}>{brideParents[1].name}</span>
          </div>
        </div>
        <div className={cx('wrap-relationship')}>
          <div className={cx('wrap-child')}>
            <span>의</span>
            <span className={cx('txt-child')}>아들</span>
          </div>
          <div className={cx('wrap-child')}>
            <span>의</span>
            <span className={cx('txt-child')}>딸</span>
          </div>
        </div>
        <div className={cx('wrap-groom-bride')}>
          <p className={cx('txt-name', 'txt-groom')}>{groomName}</p>
          <p className={cx('txt-name', 'txt-bride')}>{brideName}</p>
        </div>
      </div>
    </Section>
  );
}
