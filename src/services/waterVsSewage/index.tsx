import api from '../../infra/providers/axios/apit';
import { useQuery } from '@tanstack/react-query';
import { IWaterVsSewage, IWaterVsSewageResponse } from './@types';

const getWaterVsSewage = async (idBlock: number) => {
  const tokenFromStorage = localStorage.getItem('auth_token_gapus_v1');

  if (!tokenFromStorage) {
    throw new Error('Token not found');
  }

  const { data } = await api.get(`capex/investment/line/by-block-and-year`, {
    params: {
      idBlock: idBlock,
    },
    headers: { Authorization: `Bearer ${tokenFromStorage}` },
  });

  const response: IWaterVsSewage[] = data;

  return {
    data: response.reduce((acc, item) => {
      const existingEntry = acc.find((entry) => entry.year === item.year);

      if (existingEntry) {
        existingEntry[item.line] = item.realized;
      } else {
        acc.push({
          year: item.year,
          [item.line]: item.realized,
        });
      }

      return acc;
    }, [] as IWaterVsSewageResponse[]),
  };
};
export const useWaterVsSewage = (idBlock: number) => {
  return useQuery({
    queryKey: ['waterVsSewage', idBlock],
    queryFn: () => getWaterVsSewage(idBlock),
    enabled: true,
  });
};
