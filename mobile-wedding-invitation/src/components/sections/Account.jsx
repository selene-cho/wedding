import { useState } from 'react';
import classNames from 'classnames/bind';

import Section from '@shared/Section';
import Accordion from '@shared/Accordion';
import AccountInfo from '@components/AccountInfo';
import Toast from '@shared/Toast';
import styles from './Account.module.scss';

const cx = classNames.bind(styles);

export default function Contact({ groom, bride }) {
  const [toasts, setToasts] = useState([]);

  function handleCopy() {
    const id = Date.now();

    setToasts((prev) => [
      ...prev,
      { id, toasted: true, message: '복사가 완료 되었습니다 😉' },
    ]);
  }

  function handleClose(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <Section title="마음 전하실 곳" subtitle="account">
      <div className={cx('wrap-info')}>
        <div>참석이 어려우신 분들을 위해</div>
        <div>계좌번호를 기재하였습니다.</div>
        <div>너그러운 마음으로 양해 부탁드립니다.</div>
      </div>
      <Accordion label="신랑측 계좌번호">
        <AccountInfo
          name={groom.name}
          bank={groom.account.bank}
          accountNumber={groom.account.accountNumber}
          handleCopy={handleCopy}
        />
        {groom.parents.map((parents, idx) => (
          <AccountInfo
            key={idx}
            name={parents.name}
            bank={parents.account.bank}
            accountNumber={parents.account.accountNumber}
            handleCopy={handleCopy}
          />
        ))}
      </Accordion>
      <Accordion label="신부측 계좌번호">
        <AccountInfo
          name={bride.name}
          bank={bride.account.bank}
          accountNumber={bride.account.accountNumber}
          handleCopy={handleCopy}
        />
        {bride.parents.map((parents, idx) => (
          <AccountInfo
            key={idx}
            name={parents.name}
            bank={parents.account.bank}
            accountNumber={parents.account.accountNumber}
            handleCopy={handleCopy}
          />
        ))}
      </Accordion>
      <Toast toasts={toasts} handleClose={handleClose} success />
    </Section>
  );
}
