import React from 'react';
import { Document, PDFViewer } from '@react-pdf/renderer';
import Capa from '../../components/Cover';
import BackCover from '../../components/BackCover';
import { useSearchParams } from 'react-router-dom';
import { CONCESSIONAIRES } from '../../constants/concessionaires';
import Template from '../../components/Template';
import Loading from '../../components/Loading';
import ReportInvestimentWaterVsSewage from './report';
import { useWaterVsSewage } from '../../services/waterVsSewage';
import { useInformationsBlock } from '../../services/block';

export const InvestmentsWaterVsSewage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idBlock = Number(searchParams.get('idBlock')) || 1;
  const { data, isLoading } = useWaterVsSewage(idBlock);
  const { data: block } = useInformationsBlock(idBlock);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      {isLoading ? (
        <Loading />
      ) : (
        <PDFViewer width="100%" height="100%">
          <Document>
            <Capa
              concessionarieName={CONCESSIONAIRES[idBlock]}
              title={'RELATÓRIO DE INVESTIMENTOS DE MUNICÍPIOS'}
              block={block?.data}
            />
            <BackCover />
            <Template>
              {data && <ReportInvestimentWaterVsSewage data={data.data} />}
            </Template>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};
