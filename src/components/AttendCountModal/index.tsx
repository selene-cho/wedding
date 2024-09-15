import { useEffect, useRef } from 'react';
import { useModalContext } from '@contexts/ModalContext';
import { Wedding } from '@models/wedding';

export default function AttendCountModal({ wedding }: { wedding: Wedding }) {
  const { open, close } = useModalContext();

  const $input = useRef<HTMLInputElement>(null);

  const haveSeenModal = localStorage.getItem('@have-seen-modal');

  useEffect(() => {
    if (haveSeenModal) {
      return;
    }

    open({
      title: `현재 참석자: ${wedding.attendCount}명`,
      body: (
        <div>
          <input
            ref={$input}
            placeholder="참석 가능 인원을 작성해주세요."
            style={{ width: '100%' }}
            type="number"
          />
        </div>
      ),
      onLeftButtonClick: () => {
        localStorage.setItem('@have-seen-modal', 'true');
        close();
      },
      onRightButtonClick: async () => {
        if (!$input.current) {
          return;
        }

        await fetch('http://localhost:4000/wedding', {
          method: 'PUT',
          body: JSON.stringify({
            ...wedding,
            attendCount: wedding.attendCount + Number($input.current.value),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        localStorage.setItem('@have-seen-item', 'true');
        close();
      },
    });
  }, [open, close, wedding, haveSeenModal]);

  return null;
}
