import React from 'react';
import classNames from 'classnames/bind';

import Modal from '@shared/Modal';
import ContactInfo from '@components/ContactInfo';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

export default function Contact({
  groomName,
  groomPhoneNumber,
  groomParents,
  brideName,
  bridePhoneNumber,
  brideParents,
  isOpened,
  setIsOpened,
}) {
  return (
    <Modal isOpened={isOpened} handleClose={() => setIsOpened(false)} light>
      <div className={cx('container')}>
        <div className={cx('wrap-relationship')}>
          <div className={cx('wrap-title')}>
            <span>신랑측</span>
            <span>GROOM</span>
          </div>
          <div className={cx('wrap-contactInfo')}>
            <ContactInfo
              name={groomName}
              phoneNumber={groomPhoneNumber}
              relationship="신랑"
              bride={false}
            />
            <ContactInfo
              name={groomParents[0].name}
              phoneNumber={groomParents[0].phoneNumber}
              relationship="신랑 아버지"
              bride={false}
            />
            <ContactInfo
              name={groomParents[1].name}
              phoneNumber={groomParents[1].phoneNumber}
              relationship="신랑 어머니"
              bride={false}
            />
          </div>
        </div>

        <div className={cx('wrap-relationship')}>
          <div className={cx('wrap-title')}>
            <span>신부측</span>
            <span>BRIDE</span>
          </div>
          <div className={cx('wrap-contactInfo')}>
            <ContactInfo
              name={brideName}
              phoneNumber={bridePhoneNumber}
              relationship="신부"
              bride={true}
            />
            <ContactInfo
              name={brideParents[0].name}
              phoneNumber={brideParents[0].phoneNumber}
              relationship="신부 아버지"
              bride={true}
            />
            <ContactInfo
              name={brideParents[1].name}
              phoneNumber={brideParents[1].phoneNumber}
              relationship="신부 어머니"
              bride={true}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
