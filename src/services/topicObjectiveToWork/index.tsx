import api from '../../infra/providers/axios/apit';
import { useQuery } from '@tanstack/react-query';
import { ITopicObjectiveToWork } from './@types';

const getInvestimentCapexGeneral = async ({
  idBlock,
  line,
  idTopic,
  idMunicipality,
}: {
  idBlock: number;
  line?: 'AGUA' | 'ESGOTO' | null;
  idTopic?: number;
  idMunicipality?: number;
}) => {
  const tokenFromStorage = localStorage.getItem('auth_token_gapus_v1');

  if (!tokenFromStorage) {
    throw new Error('Token not found');
  }

  const { data } = await api.get(`/capex/investment`, {
    params: {
      idBlock,
      idMunicipality,
      line,
      idTopic,
    },
    headers: { Authorization: `Bearer ${tokenFromStorage}` },
  });
  const response: ITopicObjectiveToWork = data;

  return {
    data: response,
  };
};
export const useCapexInvestimentGeneral = ({
  idBlock,
  line,
  idTopic,
  idMunicipality,
}: {
  idBlock: number;
  line?: 'AGUA' | 'ESGOTO' | null;
  idTopic?: number;
  idMunicipality?: number;
}) => {
  return useQuery({
    queryKey: [
      'capexInvestimentGeneral',
      idBlock,
      line,
      idTopic,
      idMunicipality,
    ],
    queryFn: () =>
      getInvestimentCapexGeneral({
        idBlock,
        line,
        idTopic,
        idMunicipality,
      }),
    enabled: true,
  });
};
