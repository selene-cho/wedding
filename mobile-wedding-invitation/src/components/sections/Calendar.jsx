import classNames from 'classnames/bind';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { parseISO, format } from 'date-fns';

import Section from '@shared/Section';
import 'react-day-picker/style.css';
import styles from './Calendar.module.scss';

const cx = classNames.bind(styles);

export default function Calendar({ date }) {
  const weddingDay = parseISO(date);

  return (
    <Section>
      <div className={cx('txt-month')}>{format(weddingDay, 'MM월')}</div>
      <DayPicker
        mode="single"
        locale={ko}
        hideNavigation
        month={weddingDay}
        selected={weddingDay}
      />
      <div className={cx('txt-wedding_day')}>
        {format(weddingDay, 'yyyy년 MM월 d일. eeee aaa h시', { locale: ko })}
      </div>
    </Section>
  );
}
