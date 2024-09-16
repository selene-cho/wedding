import { memo } from 'react';
import classNames from 'classnames/bind';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/style.css';
import styles from './Calendar.module.scss';

import Section from '@shared/Section';

const cx = classNames.bind(styles);

export default memo(function Calendar({ date }: { date: string }) {
  const weddingDate = parseISO(date);

  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yyyy. MM. dd')}
          </span>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <DayPicker
        mode="single"
        hideNavigation
        locale={ko}
        month={weddingDate}
        selected={weddingDate}
        required={false}
        formatters={{
          formatCaption: (weddingDate) => format(weddingDate, 'MM MMMM'),
        }}
      />
    </Section>
  );
});
