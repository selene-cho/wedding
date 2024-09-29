import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import IconViewMore from '@icons/IconViewMore';
import styles from './Accordion.module.scss';

const cx = classNames.bind(styles);

export default function Accordion({
  label,
  children,
  groom = false,
  bride = false,
}) {
  const [isToggled, setIsToggled] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const contentRef = useRef(null);

  function handleClickAccordion() {
    setIsToggled((prev) => !prev);
  }

  useEffect(() => {
    if (!contentRef.current || !isToggled) {
      return setContentHeight(0);
    }

    setContentHeight(contentRef.current.scrollHeight);
  }, [contentRef, isToggled]);

  return (
    <div className={cx('container', { isToggled, groom, bride })}>
      <div className={cx('wrap-label')}>
        <div className={cx('txt-label')}>{label}</div>
        <button className={cx('btn-view-more')} onClick={handleClickAccordion}>
          <IconViewMore isOpenedViewMore={isToggled} />
        </button>
      </div>
      <div
        className={cx('wrap-content', { isToggled })}
        ref={contentRef}
        style={{ maxHeight: isToggled ? `${contentHeight}px` : '0px' }}
      >
        {children}
      </div>
    </div>
  );
}
