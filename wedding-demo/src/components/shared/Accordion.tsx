import { PropsWithChildren, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Accordion.module.scss';

const cx = classNames.bind(styles);

interface AccordionProps {
  label: string;
}

export default function Accordion({
  label,
  children,
}: PropsWithChildren<AccordionProps>) {
  const [expended, setExpended] = useState(false);

  const handleToggle = () => {
    setExpended((prev) => !prev);
  };

  return (
    <div className={cx('wrap-accordion', expended ? 'open' : '')}>
      <div className={cx('wrap-header')} onClick={handleToggle}>
        <span>{label}</span>
        <IconArrowDown className={cx('icon-arrow-down')} />
      </div>
      <div className={cx('wrap-content')}>{children}</div>
    </div>
  );
}

function IconArrowDown({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96">
      <path d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z" />
    </svg>
  );
}
