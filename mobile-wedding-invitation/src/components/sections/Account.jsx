import { useState } from 'react';
import classNames from 'classnames/bind';

import Section from '@shared/Section';
import Accordion from '@shared/Accordion';
import AccountInfo from '@components/AccountInfo';
import Toast from '@shared/Toast';
import generateAssetsUrl from '@utils/generateAssetsUrl';
import styles from './Account.module.scss';

const cx = classNames.bind(styles);

export default function Contact({ groom, bride, image }) {
  const [toasts, setToasts] = useState([]);

  function handleCopy() {
    setToasts((prev) => [
      ...prev,
      {
        id: Date.now(),
        toasted: true,
        type: 'success',
        message: '복사가 완료되었습니다 😉',
      },
    ]);
  }

  function handleClose(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <>
      <Section title="마음 전하실 곳" subtitle="account">
        <div className={cx('wrap-info')}>
          <div>참석이 어려우신 분들을 위해</div>
          <div>계좌번호를 기재하였습니다.</div>
          <div>너그러운 마음으로 양해 부탁드립니다.</div>
        </div>
        <Accordion label="신랑측 계좌번호" groom>
          <AccountInfo
            name={groom.name}
            account={groom.account}
            handleCopy={handleCopy}
          />
          {groom.parents.map((parents, idx) => (
            <AccountInfo
              key={idx}
              name={parents.name}
              account={parents.account}
              handleCopy={handleCopy}
            />
          ))}
        </Accordion>
        <Accordion label="신부측 계좌번호" bride>
          <AccountInfo
            name={bride.name}
            account={bride.account}
            handleCopy={handleCopy}
            bride
          />
          {bride.parents.map((parents, idx) => (
            <AccountInfo
              key={idx}
              name={parents.name}
              account={parents.account}
              handleCopy={handleCopy}
              bride
            />
          ))}
        </Accordion>
        <Toast toasts={toasts} handleClose={handleClose} />
      </Section>
      <picture className={cx('wrap-image')}>
        <source
          srcSet={generateAssetsUrl({ filename: image, format: 'webp' })}
          type="image/webp"
        />
        <img
          src={generateAssetsUrl({ filename: image, format: 'jpg' })}
          alt="웨딩사진"
        />
      </picture>
    </>
  );
}
