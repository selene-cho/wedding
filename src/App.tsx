import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import FullScreenMessage from './components/shared/FullScreenMessage';

const cx = classNames.bind(styles);

export default function App() {
  const [wedding, setWedding] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:4000/wedding1')
      .then((response) => {
        if (response.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.');
        }

        return response.json();
      })
      .then((data) => {
        setWedding(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log('에러', e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <FullScreenMessage type="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <FullScreenMessage type="error" />
      </div>
    );
  }

  return <div className={cx('container')}>{JSON.stringify(wedding)}</div>;
}
