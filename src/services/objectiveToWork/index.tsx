import api from '../../infra/providers/axios/apit';
import { useQuery } from '@tanstack/react-query';
import { EStatusCapex, ICapexObjectiveToWork } from './@types';
import { IGraphics } from '../../types/graphics';

const getcapexObejectiveToWork = async ({
  idBlock,
  sistema,
}: {
  idBlock: number;
  sistema: 'AGUA' | 'ESGOTO';
}) => {
  const tokenFromStorage = localStorage.getItem('auth_token_gapus_v1');

  if (!tokenFromStorage) {
    throw new Error('Token not found');
  }

  const { data } = await api.get(`capex/investment/topic`, {
    params: {
      idBlock,
      sistema,
    },
    headers: { Authorization: `Bearer ${tokenFromStorage}` },
  });
  const response: ICapexObjectiveToWork[] = data;
  const notRealized = response.filter(
    (e) => e.status === EStatusCapex.NOT_REALIZED
  );

  const notExpected = response.filter(
    (e) => e.status === EStatusCapex.NOT_EXPECTED
  );
  const realized = response.filter((e) => e.status === EStatusCapex.REALIZED);
  return {
    data: response,
    realized,
    notExpected,
    notRealized,
  };
};
export const useCapexObejectiveToWork = ({
  idBlock,
  sistema,
}: {
  idBlock: number;
  sistema: 'AGUA' | 'ESGOTO';
}) => {
  return useQuery({
    queryKey: ['capexObejectiveToWork', { idBlock, sistema }],
    queryFn: () => getcapexObejectiveToWork({ idBlock, sistema }),
    enabled: true,
  });
};

const getInvestimentObejectiveToWork = async ({
  idBlock,
  line,
}: {
  idBlock: number;
  line: 'AGUA' | 'ESGOTO';
}) => {
  const tokenFromStorage = localStorage.getItem('auth_token_gapus_v1');

  if (!tokenFromStorage) {
    throw new Error('Token not found');
  }

  const { data } = await api.get(`capex/investment/chart/by-block-and-topic`, {
    params: {
      idBlock,
      line,
    },
    headers: { Authorization: `Bearer ${tokenFromStorage}` },
  });
  const response: IGraphics = data;

  return {
    data: response,
  };
};
export const useInvestimentObejectiveToWork = ({
  idBlock,
  line,
}: {
  idBlock: number;
  line: 'AGUA' | 'ESGOTO';
}) => {
  return useQuery({
    queryKey: ['investimentObejectiveToWork', idBlock, line],
    queryFn: () => getInvestimentObejectiveToWork({ idBlock, line }),
    enabled: true,
  });
};
