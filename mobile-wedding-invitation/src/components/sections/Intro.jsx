import classNames from 'classnames/bind';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

import Section from '@shared/Section';
import { changeUpperCase } from '@utils/changeUpperCase';

import styles from './Intro.module.scss';

const cx = classNames.bind(styles);

export default function Intro({
  date,
  mainImg,
  groomName,
  brideName,
  location,
}) {
  const weddingDate = parseISO(date);
  const weddingDay = changeUpperCase(format(weddingDate, 'eeee'));

  return (
    <Section className={cx('container')}>
      <div className={cx('wrap-wedding-day')}>
        <h1 className={cx('txt-day')}>{format(weddingDate, 'yyyy. MM. dd')}</h1>
        <h3 className={cx('txt-date')}>{weddingDay}</h3>
      </div>
      <picture className={cx('wrap-image')}>
        <source srcSet={`images/${mainImg}.webp`} type="image/webp" />
        <img src={`images/${mainImg}.jpg`} alt="메인 웨딩 사진" />
      </picture>
      <div className={cx('wrap-name')}>
        <span>{groomName}</span>
        <span className={cx('divide-dot')}>・</span>
        <span>{brideName}</span>
      </div>
      <div className={cx('wrap-info')}>
        <div className={cx('txt-time')}>
          {format(parseISO(date), 'yyyy년 MM월 d일 eeee bbb h시', {
            locale: ko,
          })}
        </div>
        <div>{location}</div>
      </div>
    </Section>
  );
}
