import React from 'react';
import { Document, PDFViewer } from '@react-pdf/renderer';
import InvestmentPerYear from './report';
import Capa from '../../components/Cover';
import BackCover from '../../components/BackCover';
import { useInvestmentsPerYear } from '../../services/investimentPerYear';
import { useSearchParams } from 'react-router-dom';
import { CONCESSIONAIRES } from '../../constants/concessionaires';
import Template from '../../components/Template';
import Loading from '../../components/Loading';

export const InvestimentosPerYear: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idblock = Number(searchParams.get('idBlock')) || 1;
  const { data, isLoading } = useInvestmentsPerYear(idblock);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      {isLoading ? (
        <Loading />
      ) : (
        <PDFViewer width="100%" height="100%">
          <Document>
            <Capa
              concessionarieName={CONCESSIONAIRES[idblock]}
              title={'RELATÓRIO DE INVESTIMENTOS'}
              period={'JUL/2021 - NOV/2023'}
            />
            <BackCover />
            <Template>
              {data && (
                <InvestmentPerYear
                  tableData={data.data}
                  yearsData={data.years}
                  sewage={data.sewage}
                  water={data.water}
                />
              )}
            </Template>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};
