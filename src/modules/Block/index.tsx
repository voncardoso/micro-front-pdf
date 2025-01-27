import React from 'react';
import { Document, PDFViewer } from '@react-pdf/renderer';
import Capa from '../../components/Cover';
import BackCover from '../../components/BackCover';
import { useSearchParams } from 'react-router-dom';
import { CONCESSIONAIRES } from '../../constants/concessionaires';
import Template from '../../components/Template';
import Loading from '../../components/Loading';
import { useInformationsBlock } from '../../services/block';
import { InformationsBlock } from './report';
import { useMunicipality } from '../../services/municipality';

export const Block: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idblock = Number(searchParams.get('idBlock'));
  const { data, isLoading } = useInformationsBlock(idblock);
  const { data: municipality } = useMunicipality();

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
              <InformationsBlock
                data={data?.data}
                idblock={idblock}
                municipality={municipality?.data}
              ></InformationsBlock>
            </Template>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};
