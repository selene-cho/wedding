import { useSuspenseQuery } from '@tanstack/react-query';
import { Wedding } from '@models/wedding';
import getWedding from '@/api/wedding';

export default function useWedding() {
  const { data } = useSuspenseQuery<Wedding>({
    queryKey: ['wedding'],
    queryFn: () =>
      getWedding().then((response) => {
        if (response.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.');
        }

        return response.json();
      }),
  });

  return { wedding: data };
}
