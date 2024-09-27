import classNames from 'classnames/bind';

import data from '@/data.json';
import Intro from '@sections/Intro';
import Greetings from '@sections/Greetings';
import Gallery from '@sections/Gallery';
import Calendar from '@sections/Calendar';
import DdayCalculator from '@sections/DdayCalculator';
import Location from '@sections/Location';
import Account from '@sections/Account';
import GuestBook from '@sections/GuestBook';

import styles from './App.module.scss';

const cx = classNames.bind(styles);

export default function App() {
  const { date, groom, bride, message, galleryImages, location } = data;

  return (
    <div className={cx('container')}>
      <Intro
        date={date}
        mainImg={galleryImages[0]}
        groomName={groom.name}
        brideName={bride.name}
        location={location.name}
      />
      <Greetings
        message={message}
        groomName={groom.name}
        groomPhoneNumber={groom.phoneNumber}
        groomParents={groom.parents}
        brideName={bride.name}
        bridePhoneNumber={bride.phoneNumber}
        brideParents={bride.parents}
        subImg={galleryImages[9]}
      />
      <Gallery images={galleryImages} />
      <Calendar date={date} />
      <DdayCalculator
        date={date}
        groomName={groom.name}
        brideName={bride.name}
      />
      <Location location={location} />
      <Account
        groom={groom}
        bride={bride}
        image={galleryImages[galleryImages.length - 1]}
      />
      <GuestBook />
    </div>
  );
}
