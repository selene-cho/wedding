import classNames from 'classnames/bind';

import data from '@/data.json';
import Intro from '@sections/Intro';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

export default function App() {
  const { date, groom, bride, galleryImages, location } = data;

  return (
    <div className={cx('container')}>
      <Intro
        date={date}
        mainImg={galleryImages[0]}
        groomName={groom.name}
        brideName={bride.name}
        location={location.name}
      />
    </div>
  );
}
