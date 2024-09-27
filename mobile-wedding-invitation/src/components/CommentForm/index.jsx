import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { postComment, updateComment } from '@api/comments.js';
import ERROR_MSG from '@utils/errorMessage';
import styles from './CommentForm.module.scss';

const cx = classNames.bind(styles);

const initialErrorMessage = {
  name: '',
  password: '',
  content: '',
};

const passwordRegex = /^\d{4}$/;
const contentRegex = /^.{1,150}$/;

export default function CommentForm({
  setToasts,
  setIsOpenedPostModal,
  setIsOpenedUpdateModal,
  edit = false,
  prevComment,
}) {
  const initialComment = edit
    ? { ...prevComment, password: '' }
    : {
        name: '',
        password: '',
        content: '',
        createdDate: '',
      };

  const [comment, setComment] = useState(initialComment);
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: edit
      ? (updatedComment) => updateComment(updatedComment)
      : (newComment) => postComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getComments'] });

      edit ? setIsOpenedUpdateModal(false) : setIsOpenedPostModal(false);

      setToasts((prev) => [
        ...prev,
        {
          id: Date.now(),
          toasted: true,
          type: 'success',
          message: `${edit ? '수정' : '작성'} 완료되었습니다 🥰`,
        },
      ]);
    },
    onError: () => {
      edit ? setIsOpenedUpdateModal(false) : setIsOpenedPostModal(false);

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

  function handleInputChange(filed, value) {
    if (filed === 'name' && !value) {
      setErrorMessage((prev) => ({
        ...prev,
        [filed]: ERROR_MSG.NO_NAME,
      }));
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        [filed]: '',
      }));
    }

    if (filed === 'content') {
      if (!value) {
        setErrorMessage((prev) => ({
          ...prev,
          [filed]: ERROR_MSG.NO_CONTENT,
        }));
      } else if (!contentRegex.exec(value)) {
        setErrorMessage((prev) => ({
          ...prev,
          [filed]: ERROR_MSG.INVALID_CONTENT,
        }));
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          [filed]: '',
        }));
      }
    }

    if (filed === 'password') {
      if (!value) {
        setErrorMessage((prev) => ({
          ...prev,
          [filed]: ERROR_MSG.NO_PW,
        }));
      } else if (!passwordRegex.exec(value)) {
        setErrorMessage((prev) => ({
          ...prev,
          [filed]: ERROR_MSG.INVALID_PW,
        }));
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          [filed]: '',
        }));
      }
    }

    setComment((prev) => ({
      ...prev,
      [filed]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(comment);
  }

  function handleUpdate(e) {
    e.preventDefault();

    if (prevComment.password !== comment.password) {
      setErrorMessage((prev) => ({
        ...prev,
        ['password']: '잘못된 비밀번호입니다. 다시 입력해주세요.',
      }));
      return;
    }

    setErrorMessage(initialErrorMessage);
    mutation.mutate(comment);
  }

  return (
    <form
      className={cx('write-container')}
      onSubmit={edit ? handleUpdate : handleSubmit}
    >
      <h1 className={cx('header')}>방명록 {edit ? '수정' : '작성'}</h1>
      <div className={cx('wrap-form')}>
        <div className={cx('wrap-input')}>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            name="name"
            type="text"
            value={comment.name}
            autoComplete="off"
            placeholder="이름을 작성해주세요"
            required
            onChange={(e) => handleInputChange('name', e.target.value)}
            onInvalid={(e) => e.preventDefault()}
          />
        </div>
        {errorMessage?.name && (
          <div className={cx('txt-error')}>{errorMessage.name}</div>
        )}
        <div className={cx('wrap-input')}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            value={comment.password}
            pattern="[0-9]{4}"
            inputMode="numeric"
            autoComplete="off"
            placeholder="4자리 숫자"
            required
            onChange={(e) => handleInputChange('password', e.target.value)}
            onInvalid={(e) => e.preventDefault()}
          />
        </div>
        {errorMessage?.password && (
          <div className={cx('txt-error')}>{errorMessage.password}</div>
        )}
        <div className={cx('wrap-input', 'wrap-textarea')}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={comment.content}
            placeholder=" 축하글을 남겨주세요🫶🏻&#10;(최대 150자, 공백포함)"
            maxLength={150}
            autoComplete="off"
            required
            onChange={(e) => handleInputChange('content', e.target.value)}
            onInvalid={(e) => e.preventDefault()}
          ></textarea>
        </div>
        {errorMessage?.content && (
          <div className={cx('txt-error')}>{errorMessage.content}</div>
        )}
      </div>
      <button className={cx('btn-submit')} type="submit">
        {edit ? '수정하기' : '작성하기'}
      </button>
    </form>
  );
}
