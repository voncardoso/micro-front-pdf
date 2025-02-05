import api from '../../infra/providers/axios/apit';
import { IGroupYear, IYearData } from '../../types/investmentsPerYear';
import { useQuery } from '@tanstack/react-query';
import { IRequestParams } from './@types';
import { IGraphics } from '../../types/graphics';

function organizeData(data: IYearData[]): IGroupYear {
  return data.reduce<IGroupYear>(
    (acc, item) => {
      if (item.line === 'AGUA') {
        acc.AGUA.push({
          year: item.year,
          expected: item.expected,
          realized: item.realized,
          line: item.line,
        });
      } else if (item.line === 'ESGOTO') {
        acc.ESGOTO.push({
          year: item.year,
          expected: item.expected,
          realized: item.realized,
          line: item.line,
        });
        if (!acc.YEARS.includes(item.year)) {
          acc.YEARS.push(item.year);
        }
      }
      return acc;
    },
    { AGUA: [], ESGOTO: [], YEARS: [] }
  );
}

const getTableInvestmentsGroupedByYearAndLine = async (idBlock: number) => {
  const tokenFromStorage = localStorage.getItem('auth_token_gapus_v1');

  if (!tokenFromStorage) {
    throw new Error('Token not found');
  }

  const { data } = await api.get<IYearData[]>(
    'capex/investment/line/by-block-and-year',
    {
      params: { idBlock },
      headers: { Authorization: `Bearer ${tokenFromStorage}` },
    }
  );

  const filteredData = data.filter((item) => item.year !== 2020);
  const groupedData = organizeData(filteredData);

  return {
    data: filteredData,
    water: groupedData.AGUA,
    sewage: groupedData.ESGOTO,
    years: groupedData.YEARS,
  };
};

export const useInvestmentsPerYear = (idBlock: number) => {
  return useQuery({
    queryKey: ['investmentsPerYear', idBlock],
    queryFn: () => getTableInvestmentsGroupedByYearAndLine(idBlock),
    enabled: !!idBlock,
  });
};

const getInvestmentsChartYearAndLine = async (params: IRequestParams) => {
  const tokenFromStorage = localStorage.getItem('auth_token_gapus_v1');

  if (!tokenFromStorage) {
    throw new Error('Token not found');
  }

  const { data } = await api.get<IGraphics>(
    `capex/investment/chart/by-block-and-year`,
    {
      params: {
        idBlock: params.idBlock,
        line: params.line,
        startYear: params.startYear,
        endYear: params.endYear,
        idTopic: params.idTopic,
        idMunicipality: params.idMunicipality,
      },
      headers: { Authorization: `Bearer ${tokenFromStorage}` },
    }
  );

  return {
    data,
  };
};

export const useInvestmentsChartPerYear = (params: IRequestParams) => {
  return useQuery({
    queryKey: [
      'investmentsChartPerYear',
      params.idTopic,
      params.line,
      params.endYear,
    ],
    queryFn: () => getInvestmentsChartYearAndLine(params),
    enabled: !!params.endYear,
  });
};
