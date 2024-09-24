import classNames from 'classnames/bind';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './AccountInfo.module.scss';

const cx = classNames.bind(styles);

export default function AccountInfo({ name, account, handleCopy }) {
  const { bank, accountNumber, kakaoPayLink } = account;

  return (
    <div className={cx('container')}>
      <div className={cx('wrap-info')}>
        <div className={cx('txt-name')}>{name}</div>
        <div className={cx('wrap-account')}>
          <span className={cx('txt-bank')}>{bank}</span>
          <span className={cx()}>{accountNumber}</span>
        </div>
      </div>
      <div className={cx('wrap-btn')}>
        {kakaoPayLink && (
          <button className={cx('btn-kakaoPay')}>
            <a href={kakaoPayLink} target="_blank" rel="noreferrer noopener">
              <IconKakaoPay className={cx('icon-kakaoPay')} />
            </a>
          </button>
        )}
        <CopyToClipboard
          text={`${bank} ${accountNumber}`}
          onCopy={() => handleCopy()}
        >
          <button className={cx('btn-clipboard')}>
            <IconClipboard className={cx('icon-clipboard')} />
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

function IconClipboard({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" stroke="#fff">
      <path
        d="M15.5 4H18C19.1046 4 20 4.89543 20 6V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V6C4 4.89543 4.89543 4 6 4H8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M8.62127 3.51493C8.84385 2.62459 9.64382 2 10.5616 2H13.4384C14.3562 2 15.1561 2.62459 15.3787 3.51493L16 6H8L8.62127 3.51493Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M9 12L15 12" strokeLinecap="round" strokeWidth="2" />
      <path d="M9 16H15" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function IconKakaoPay({ className }) {
  return (
    <svg
      className={className}
      version="1.1"
      id="레이어_1"
      viewBox="0 0 192.9 80.4"
    >
      <g>
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#FFEB00"
            d="M152.7,80.4H40.2C18,80.4,0,62.4,0,40.2S18,0,40.2,0h112.6c22.2,0,40.2,18,40.2,40.2S174.9,80.4,152.7,80.4"
          />
        </g>
        <g>
          <g>
            <g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M45.1,19.3C33,19.3,23.2,27,23.2,36.6c0,6.1,4.1,11.5,10.2,14.6L31.3,59c-0.1,0.2,0,0.5,0.2,0.7
              c0.1,0.1,0.3,0.2,0.4,0.2c0.1,0,0.3-0.1,0.4-0.1l8.9-6c1.3,0.2,2.6,0.3,4,0.3c12.1,0,21.9-7.8,21.9-17.3
              C67.1,27,57.3,19.3,45.1,19.3z"
              />
            </g>
          </g>
          <path
            d="M85.6,51v11.2h-8V20.9h5.6l1,2.6c1.7-1.7,4.3-3.5,8.4-3.5c7.8,0,11.5,5.8,11.5,15.3c0,9.9-5.7,16.2-13.9,16.2
          C88.6,51.6,87.4,51.5,85.6,51z M85.6,27.6v17.8c0.4,0.1,1.5,0.2,2.6,0.2c5.7,0,7.9-4,7.9-10.3c0-5.5-1.5-8.8-6-8.8
          C88.5,26.5,86.9,26.9,85.6,27.6z"
          />
          <path
            d="M121.4,32.6h4.5v-1c0-3.3-1.9-4.8-5.1-4.8c-2.5,0-5.6,0.7-8.2,2l-2.2-5.3c2.8-2,7.2-3.3,11.1-3.3c7.6,0,11.8,4,11.8,11.7
          v18.9h-5.6l-0.8-2.5c-3.2,2.3-6.2,3.3-8.8,3.3c-5.8,0-9.1-3.5-9.1-9.4C109,35.9,113.3,32.6,121.4,32.6z M126,43.1v-5.5h-3.7
          c-4.1,0-6.2,1.5-6.2,4.4c0,2.2,1.1,3.3,3.5,3.3C121.8,45.4,124.6,44.3,126,43.1z"
          />
          <path
            d="M157.5,47.7c-2.8,7.4-6.1,12.8-11,15.8l-4.9-4.5c2.8-2.5,4.9-4.9,6.6-8.1L137.6,22l7.9-2.1l6.8,23.4l6.7-23.5l7.8,2.2
          L157.5,47.7z"
          />
        </g>
      </g>
    </svg>
  );
}
