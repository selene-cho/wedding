import classNames from 'classnames/bind';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

export default function Section({ children, className, title, subtitle }) {
  return (
    <section className={cx('container', className)}>
      {subtitle && (
        <h3 className={cx('txt-subtitle')}>{subtitle.toUpperCase()}</h3>
      )}
      {title && <h1 className={cx('txt-title')}>{title}</h1>}
      {children}
    </section>
  );
}
