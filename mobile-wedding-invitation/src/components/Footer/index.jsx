import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <div className={cx('container')}>
      <div className={cx('txt-comment')}>
        친구야 결혼 축하해 ♥︎ 행복하게 잘 살자!!
      </div>
      <div>
        Copyright <span>2024</span> 이슬이 친구 다희. All Rights Reserved.
      </div>
    </div>
  );
}
