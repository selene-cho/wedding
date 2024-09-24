import classNames from 'classnames/bind';
import styles from './Dimmed.module.scss';

const cx = classNames.bind(styles);

export default function Dimmed({ children, light = false }) {
  return <div className={cx('container', { light })}>{children}</div>;
}
