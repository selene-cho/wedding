import classNames from 'classnames/bind';
import styles from './IconClose.module.scss';

const cx = classNames.bind(styles);

export default function IconClose({ handleClose }) {
  return (
    <div className={cx('icon-close')} onClick={handleClose}>
      <svg version="1.1" viewBox="0 0 32 32">
        <path
          d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"
          id="Close"
        />
      </svg>
    </div>
  );
}
