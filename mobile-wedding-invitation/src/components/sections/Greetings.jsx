import { useState } from 'react';
import classNames from 'classnames/bind';

import Section from '@shared/Section';
import Contact from '@components/Contact';
import styles from './Greetings.module.scss';

const cx = classNames.bind(styles);

export default function Greetings({
  message,
  groomName,
  groomPhoneNumber,
  groomParents,
  brideName,
  bridePhoneNumber,
  brideParents,
  subImg,
}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
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

        <button className={cx('btn-contact')} onClick={() => setIsOpened(true)}>
          연락하러가기
        </button>
      </Section>
      <Contact
        groomName={groomName}
        groomPhoneNumber={groomPhoneNumber}
        groomParents={groomParents}
        brideName={brideName}
        bridePhoneNumber={bridePhoneNumber}
        brideParents={brideParents}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      />
    </>
  );
}
