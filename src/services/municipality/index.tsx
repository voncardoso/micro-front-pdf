import api from '../../infra/providers/axios/apit';
import { useQuery } from '@tanstack/react-query';
import { IMunicipality } from './@types';
import { IGraphics } from '../../types/graphics';

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

interface paramsGetMunicipalityInvestimentChart {
  idBlock: number;
  line?: 'AGUA' | 'ESGOTO';
}
const getMunicipalityInvestimentChart = async ({
  idBlock,
  line,
}: paramsGetMunicipalityInvestimentChart) => {
  const tokenFromStorage = localStorage.getItem('auth_token_gapus_v1');

  if (!tokenFromStorage) {
    throw new Error('Token not found');
  }

  const { data } = await api.get(
    `capex/investment/chart/by-block-and-municipality`,
    {
      params: {
        idBlock,
        line,
      },
      headers: { Authorization: `Bearer ${tokenFromStorage}` },
    }
  );
  const response: IGraphics = data;
  return {
    data: response,
  };
};

export const useGetMunicipalityInvestimentChart = ({
  idBlock,
  line,
}: paramsGetMunicipalityInvestimentChart) => {
  return useQuery({
    queryKey: ['municipalityInvestimentChart', idBlock, line],
    queryFn: () => getMunicipalityInvestimentChart({ idBlock, line }),
    enabled: true,
  });
};
