import React from 'react';
import { Document, PDFViewer } from '@react-pdf/renderer';
import Capa from '../../components/Cover';
import BackCover from '../../components/BackCover';
import { useSearchParams } from 'react-router-dom';
import { CONCESSIONAIRES } from '../../constants/concessionaires';
import Template from '../../components/Template';
import Loading from '../../components/Loading';
import ReportInvestimentPerMunicipality from './report';
import { useGetMunicipalityInvestimentChart } from '../../services/municipality';
import { useInformationsBlock } from '../../services/block';

export const InvestmentsPerMunicipality: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idBlock = Number(searchParams.get('idBlock')) || 1;
  const { data: dataWater, isLoading: isLoadingWater } =
    useGetMunicipalityInvestimentChart({
      idBlock,
      line: 'AGUA',
    });
  const { data: dataSewage, isLoading: isLoadingSewage } =
    useGetMunicipalityInvestimentChart({
      idBlock,
      line: 'ESGOTO',
    });
  const { data: dataGeneral } = useGetMunicipalityInvestimentChart({
    idBlock,
  });
  const { data: block } = useInformationsBlock(idBlock);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      {isLoadingWater || isLoadingSewage ? (
        <Loading />
      ) : (
        <PDFViewer width="100%" height="100%">
          <Document>
            <Capa
              concessionarieName={CONCESSIONAIRES[idBlock]}
              title={'RELATÓRIO DE INVESTIMENTOS DE MUNICÍPIOS'}
              block={block?.data}
            />
            <BackCover block={block?.data} />
            <Template>
              {dataWater && dataSewage && dataGeneral && (
                <ReportInvestimentPerMunicipality
                  dataWater={dataWater.data}
                  dataSewage={dataSewage?.data}
                  dataGeneral={dataGeneral?.data}
                />
              )}
            </Template>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};
