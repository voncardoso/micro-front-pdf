import api from '../../infra/providers/axios/apit';
import { useQuery } from '@tanstack/react-query';
import { IInformationsBlock } from './@types';

const getInformationsBlock = async (idBlock: number) => {
  const tokenFromStorage = localStorage.getItem('auth_token_gapus_v1');

  if (!tokenFromStorage) {
    throw new Error('Token not found');
  }

  const { data } = await api.get(`block/${idBlock}/investment-info`, {
    headers: { Authorization: `Bearer ${tokenFromStorage}` },
  });
  const reponse: IInformationsBlock = data;
  return {
    data: reponse,
  };
};

export const useInformationsBlock = (idBlock: number) => {
  return useQuery({
    queryKey: ['block', idBlock],
    queryFn: () => getInformationsBlock(idBlock),
    enabled: !!idBlock,
  });
};
