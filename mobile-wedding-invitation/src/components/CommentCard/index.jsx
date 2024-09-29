import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { deleteComment } from '@api/comments';
import ERROR_MSG from '@utils/errorMessage';

import Modal from '@shared/Modal';
import CommentForm from '@components/CommentForm';
import IconClose from '@icons/IconClose';
import IconEdit from '@icons/IconEdit';
import styles from './CommentCard.module.scss';

const cx = classNames.bind(styles);

const passwordRegex = /^\d{4}$/;

export default function CommentCard({ comment, setToasts }) {
  const [isOpenedVerifyModal, setIsOpenedVerifyModal] = useState(false);
  const [isOpenedUpdateModal, setIsOpenedUpdateModal] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, password }) => deleteComment(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getComments'] });

      setIsOpenedVerifyModal(false);
      setPassword('');

      setToasts((prev) => [
        ...prev,
        {
          id: Date.now(),
          toasted: true,
          type: 'success',
          message: '삭제 완료되었습니다 🥰',
        },
      ]);
    },
    onError: () => {
      setIsOpenedVerifyModal(false);
      setPassword('');

      setToasts((prev) => [
        ...prev,
        {
          id: Date.now(),
          toasted: true,
          type: 'warn',
          message: '⚠️오류가 발생했습니다. 잠시후 다시 시도해주세요',
        },
      ]);
    },
  });

  function handleDelete(e) {
    e.preventDefault();

    if (password === '') {
      return setErrorMessage(ERROR_MSG.NO_PW);
    }

    if (comment.password !== password) {
      return setErrorMessage(ERROR_MSG.WRONG_PW);
    }

    setErrorMessage('');
    mutation.mutate({ id: comment.id, password });
  }

  function handleVerifyPassword(value) {
    if (!value) {
      setErrorMessage(ERROR_MSG.NO_PW);
    } else if (!passwordRegex.exec(value)) {
      setErrorMessage(ERROR_MSG.INVALID_PW);
    } else {
      setErrorMessage('');
    }

    setPassword(value);
  }

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('wrap-header')}>
          <div className={cx('txt-name')}>{comment.name}</div>
          <div className={cx('wrap-icons')}>
            <IconEdit
              className={cx('icon')}
              handleUpdate={() => setIsOpenedUpdateModal(true)}
            />
            <IconClose
              className={cx('icon')}
              handleClose={() => setIsOpenedVerifyModal(true)}
            />
          </div>
        </div>
        <div className={cx('txt-content')}>{comment.content}</div>
      </div>
      <Modal
        isOpened={isOpenedVerifyModal}
        handleClose={() => setIsOpenedVerifyModal(false)}
        light
      >
        <form onSubmit={handleDelete} className={cx('form-container')}>
          <div className={cx('txt-title')}>비밀번호 확인</div>
          <div className={cx('wrap-input')}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              autoComplete="off"
              placeholder="4자리 숫자"
              onChange={(e) => handleVerifyPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <div className={cx('txt-error')}>{errorMessage}</div>
          )}
          <button>삭제</button>
        </form>
      </Modal>
      <Modal
        isOpened={isOpenedUpdateModal}
        handleClose={() => setIsOpenedUpdateModal(false)}
        light
      >
        <CommentForm
          edit
          setToasts={setToasts}
          prevComment={comment}
          setIsOpenedUpdateModal={setIsOpenedUpdateModal}
        />
      </Modal>
    </>
  );
}
