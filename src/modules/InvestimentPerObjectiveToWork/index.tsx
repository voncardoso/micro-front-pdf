import React from 'react';
import { Document, PDFViewer } from '@react-pdf/renderer';
import Capa from '../../components/Cover';
import BackCover from '../../components/BackCover';
import { useSearchParams } from 'react-router-dom';
import { CONCESSIONAIRES } from '../../constants/concessionaires';
import Template from '../../components/Template';
import Loading from '../../components/Loading';
import ReportInvestimentPerObejectiveToWork from './report';
import { useInvestimentObejectiveToWork } from '../../services/objectiveToWork';
import { useInformationsBlock } from '../../services/block';

export const InvestmentsPerObjectiveToWork: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idBlock = Number(searchParams.get('idBlock')) || 1;
  const { data: dataWater, isLoading: isLoadingWater } =
    useInvestimentObejectiveToWork({
      idBlock,
      line: 'AGUA',
    });
  const { data: dataSewage, isLoading: isLoadingSewage } =
    useInvestimentObejectiveToWork({
      idBlock,
      line: 'ESGOTO',
    });

  const { data } = useInformationsBlock(idBlock);
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      {isLoadingWater || isLoadingSewage ? (
        <Loading />
      ) : (
        <PDFViewer width="100%" height="100%">
          <Document>
            <Capa
              concessionarieName={CONCESSIONAIRES[idBlock]}
              title={'RELATÓRIO DE INVESTIMENTOS'}
              block={data?.data}
            />
            <BackCover block={data?.data} />
            <Template>
              {dataWater && dataSewage && (
                <ReportInvestimentPerObejectiveToWork
                  dataWater={dataWater.data}
                  dataSewage={dataSewage?.data}
                />
              )}
            </Template>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};
