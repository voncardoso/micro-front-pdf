import React from 'react';
import { Document, PDFViewer } from '@react-pdf/renderer';
import Capa from '../../components/Cover';
import BackCover from '../../components/BackCover';
import { useSearchParams } from 'react-router-dom';
import { CONCESSIONAIRES } from '../../constants/concessionaires';
import Loading from '../../components/Loading';
import { useInformationsBlock } from '../../services/block';
import ReportInvestmentTotal from './report';
import Template from '../../components/Template';

export const TotalInvestiment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idblock = Number(searchParams.get('idBlock'));
  const { data, isLoading } = useInformationsBlock(idblock);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      {isLoading ? (
        <Loading />
      ) : (
        <PDFViewer width="100%" height="100%">
          <Document>
            <Capa
              concessionarieName={CONCESSIONAIRES[idblock]}
              title={'Meta de Investimento Total'}
              period={'(35 anos)'}
            />
            <BackCover />
            <Template>
              <ReportInvestmentTotal data={data?.data} />
            </Template>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};
