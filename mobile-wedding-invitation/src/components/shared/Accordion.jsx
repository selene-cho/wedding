import { useState } from 'react';
import classNames from 'classnames/bind';

import IconViewMore from '@icons/IconViewMore';
import styles from './Accordion.module.scss';

const cx = classNames.bind(styles);

export default function Accordion({ label, children }) {
  const [isToggled, setIsToggled] = useState(false);

  function handleClickAccordion() {
    setIsToggled((prev) => !prev);
  }
  return (
    <div className={cx('container', { isToggled })}>
      <div className={cx('wrap-label')}>
        <div className={cx('txt-label')}>{label}</div>
        <button className={cx('btn-view-more')} onClick={handleClickAccordion}>
          <IconViewMore isOpenedViewMore={isToggled} />
        </button>
      </div>
      <div className={cx('wrap-content', { isToggled })}>{children}</div>
    </div>
  );
}
