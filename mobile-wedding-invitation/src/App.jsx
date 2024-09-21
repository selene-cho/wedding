import classNames from 'classnames/bind';

import data from '@/data.json';
import Intro from '@sections/Intro';
import Greetings from '@sections/Greetings';
import Gallery from '@sections/Gallery';

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
        groomParents={groom.parents}
        brideName={bride.name}
        brideParents={bride.parents}
        subImg={galleryImages[9]}
      />
      <Gallery images={galleryImages} />
    </div>
  );
}
