import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getComments } from '@api/comments';

import Section from '@shared/Section';
import Modal from '@shared/Modal';
import Toast from '@shared/Toast';
import CommentCard from '@components/CommentCard';
import CommentForm from '@components/CommentForm/index.jsx';
import IconViewMore from '@icons/IconViewMore';
import styles from './GuestBook.module.scss';

const cx = classNames.bind(styles);

export default function GuestBook() {
  const [viewMore, setViewMore] = useState(false);
  const [isOpenedPostModal, setIsOpenedPostModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  const { data, isPending, error } = useQuery({
    queryKey: ['getComments'],
    queryFn: getComments,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('error:', error);

    return (
      <div className={cx('txt-error')}>
        방명록을 불러오는데, 오류가 발생했습니다. 잠시후 다시 시도해주세요.
      </div>
    );
  }

  function handleCloseToast(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  const commentToShow = viewMore ? data : data.slice(0, 3);

  return (
    <Section title="방명록" subtitle="guest book" className={cx('container')}>
      <div className={cx('wrap-comments', { 'view-more': viewMore })}>
        {commentToShow?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            setToasts={setToasts}
          />
        ))}
      </div>
      <div className={cx('wrap-btns', { 'none-view-more': data?.length <= 3 })}>
        {data?.length > 3 && (
          <button
            className={cx('btn-view-more')}
            onClick={() => setViewMore((prev) => !prev)}
          >
            <div>{viewMore ? '접기' : '전체보기'}</div>
            <IconViewMore isOpenedViewMore={viewMore} />
          </button>
        )}
        <button
          className={cx('btn-submit')}
          onClick={() => setIsOpenedPostModal(true)}
        >
          작성하기
        </button>
      </div>
      <Modal
        light
        isOpened={isOpenedPostModal}
        handleClose={() => setIsOpenedPostModal(false)}
      >
        <CommentForm
          setToasts={setToasts}
          setIsOpenedPostModal={setIsOpenedPostModal}
        />
      </Modal>
      <Toast toasts={toasts} handleClose={handleCloseToast} />
    </Section>
  );
}
