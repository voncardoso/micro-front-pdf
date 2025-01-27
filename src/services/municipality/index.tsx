import api from '../../infra/providers/axios/apit';
import { useQuery } from '@tanstack/react-query';
import { IMunicipality } from './@types';

const getMunicipality = async () => {
  const tokenFromStorage = localStorage.getItem('auth_token_gapus_v1');

  if (!tokenFromStorage) {
    throw new Error('Token not found');
  }

  const { data } = await api.get(`municipality`, {
    headers: { Authorization: `Bearer ${tokenFromStorage}` },
  });
  const reponse: IMunicipality[] = data;
  return {
    data: reponse,
  };
};

export const useMunicipality = () => {
  return useQuery({
    queryKey: ['municipality'],
    queryFn: () => getMunicipality(),
    enabled: true,
  });
};
