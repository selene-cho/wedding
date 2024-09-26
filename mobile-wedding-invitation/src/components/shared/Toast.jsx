import { useEffect } from 'react';
import classNames from 'classnames/bind';

import IconClose from '@icons/IconClose';
import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

export default function Toast({ toasts, handleClose }) {
  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.toasted) {
        const timer = setTimeout(() => {
          handleClose(toast.id);
        }, 3000);

        return () => clearTimeout(timer);
      }
    });
  }, [toasts, handleClose]);

  return (
    <ul className={cx('container')}>
      {toasts.map((toast) => (
        <li
          key={toast.id}
          className={cx('wrap-toast', toast.type, {
            toasted: toast.toasted,
          })}
        >
          <div className={cx('txt-notice')}>{toast.message}</div>
          <IconClose
            className={cx('btn-close')}
            handleClose={() => handleClose(toast.id)}
          />
        </li>
      ))}
    </ul>
  );
}
