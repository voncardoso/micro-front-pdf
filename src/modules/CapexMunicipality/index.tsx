import React from 'react';
import { Document, PDFViewer, View } from '@react-pdf/renderer';
import Capa from '../../components/Cover';
import BackCover from '../../components/BackCover';
import { useSearchParams } from 'react-router-dom';
import { CONCESSIONAIRES } from '../../constants/concessionaires';
import Template from '../../components/Template';
import { useInformationsBlock } from '../../services/block';
import {
  useGetMunicipalityInvestimentChart,
  useGetMunicipalityPerYearInvestimentChart,
} from '../../services/municipality';
import Loading from '../../components/Loading';
import { lineToText } from '../../utils/lineToText';
import ReportDetailMunicipalityDonuts from './report/donuts';
import { useCapexInvestimentGeneral } from '../../services/topicObjectiveToWork';
import { formatterDate } from '../../utils/formatterDate';
import ReportDetailsMunicipalityLine from './report/line';
import TextChartMunicipality from './report/textCharts';

export const CapexMunicipality: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idBlock = Number(searchParams.get('idBlock')) || 1;
  const line = searchParams.get('line') as 'AGUA' | 'ESGOTO' | null;
  const idMunicipality = Number(searchParams.get('idMunicipality'));
  const { data: block } = useInformationsBlock(idBlock);
  const { data: capex, isLoading } = useCapexInvestimentGeneral({
    idBlock: idBlock,
    idMunicipality,
    line: line,
  });
  const dateFinal = formatterDate(
    String(block?.data?.lastInvestmentDate),
    'YYYY'
  );
  const { data: chartDataYear, isLoading: isLoadingYear } =
    useGetMunicipalityPerYearInvestimentChart({
      idMunicipality,
      line,
      minimum: Number(block?.data.firstYearOfContract),
      maximum: Number(dateFinal),
    });

  const notRealizedFullYear =
    (capex?.data.totalExpected ?? 0) - (capex?.data.realized ?? 0);
  const notRealizedYear =
    (capex?.data.expected ?? 0) - (capex?.data.realized ?? 0);
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      {!isLoading && !isLoadingYear ? (
        <PDFViewer width="100%" height="100%">
          <Document>
            <Capa
              concessionarieName={CONCESSIONAIRES[idBlock]}
              title={`RELATÓRIO DE MUNICÍPIOS (${lineToText(line)})`}
              block={block?.data}
            />
            <BackCover block={block?.data} />
            <Template>
              <>
                {capex && (
                  <View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <ReportDetailMunicipalityDonuts
                        dataChart={[
                          {
                            name: 'Não realizado',
                            value:
                              notRealizedFullYear < 0 ? 0 : notRealizedFullYear,
                          },
                          {
                            name: 'Realizado',
                            value: capex?.data.realized ?? 0,
                          },
                        ]}
                        total={capex?.data.totalExpected}
                        line={line}
                        year={
                          (block?.data.firstYearOfContract || 0) +
                          (block?.data.totalOfContractYears || 0)
                        }
                      ></ReportDetailMunicipalityDonuts>
                      <ReportDetailMunicipalityDonuts
                        dataChart={[
                          {
                            name: 'Não realizado',
                            value: notRealizedYear < 0 ? 0 : notRealizedYear,
                          },
                          {
                            name: 'Realizado',
                            value: capex?.data.realized ?? 0,
                          },
                        ]}
                        total={capex?.data.expected}
                        line={line}
                        year={formatterDate(
                          block?.data.lastInvestmentDate || new Date(),
                          'YYYY'
                        )}
                      ></ReportDetailMunicipalityDonuts>
                    </View>
                    <TextChartMunicipality />
                  </View>
                )}
                <ReportDetailsMunicipalityLine
                  dataYears={chartDataYear?.data}
                  legend={`Investimento para ${lineToText(line)}`}
                ></ReportDetailsMunicipalityLine>
              </>
            </Template>
          </Document>
        </PDFViewer>
      ) : (
        <Loading />
      )}
    </div>
  );
};
