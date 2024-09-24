import classNames from 'classnames/bind';

import Dimmed from '@shared/Dimmed';
import IconClose from '@icons/IconClose';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

export default function Modal({ children, isOpened = false, handleClose }) {
  if (!isOpened) return;

  return (
    <Dimmed>
      <IconClose fullscreen={true} handleClose={handleClose} />
      <div className={cx('container')}>{children}</div>
    </Dimmed>
  );
}
