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
  idTopic?: number;
  year?: number;
}
const getMunicipalityInvestimentChart = async ({
  idBlock,
  line,
  idTopic,
  year,
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
        idTopic,
        year,
      },
      headers: { Authorization: `Bearer ${tokenFromStorage}` },
    }
  );
  const response: IGraphics = data;
  return {
    data: response,
  };
};

export const useGetMunicipalityInvestimentChart = (
  params: paramsGetMunicipalityInvestimentChart
) => {
  return useQuery({
    queryKey: [
      'municipalityInvestimentChart',
      params.idBlock,
      params.line,
      params.idTopic,
      params.year,
    ],
    queryFn: () => getMunicipalityInvestimentChart(params),
    enabled: true,
  });
};

interface IparamsGetMunicipalityInvestimentChartPerYear {
  line?: 'AGUA' | 'ESGOTO' | null;
  idMunicipality?: number;
  maximum?: number;
  minimum?: number;
}
const getMunicipalityPerYearInvestimentChart = async (
  params: IparamsGetMunicipalityInvestimentChartPerYear
) => {
  const tokenFromStorage = localStorage.getItem('auth_token_gapus_v1');

  if (!tokenFromStorage) {
    throw new Error('Token not found');
  }

  const { data } = await api.get(
    `capex/investment/chart/by-year-with-municipality-and-line`,
    {
      params,
      headers: { Authorization: `Bearer ${tokenFromStorage}` },
    }
  );
  const response: IGraphics = data;
  return {
    data: response,
  };
};

export const useGetMunicipalityPerYearInvestimentChart = (
  params: IparamsGetMunicipalityInvestimentChartPerYear
) => {
  return useQuery({
    queryKey: [
      'municipalityInvestimentChart',
      params.idMunicipality,
      params.maximum,
      params.minimum,
    ],
    queryFn: () => getMunicipalityPerYearInvestimentChart(params),
    enabled: !!params.maximum,
  });
};
