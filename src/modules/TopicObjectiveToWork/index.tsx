import React from 'react';
import { Document, PDFViewer, View } from '@react-pdf/renderer';
import Capa from '../../components/Cover';
import BackCover from '../../components/BackCover';
import { useSearchParams } from 'react-router-dom';
import { CONCESSIONAIRES } from '../../constants/concessionaires';
import Template from '../../components/Template';
import Loading from '../../components/Loading';
import { useInformationsBlock } from '../../services/block';
import ReportTopicObjectiveToWorkDonuts from './report/donuts';
import { useCapexInvestimentGeneral } from '../../services/topicObjectiveToWork';
import { useInvestmentsChartPerYear } from '../../services/investimentPerYear';
import { InvestimentoLine } from '../../enums/line';
import { formatterDate } from '../../utils/formatterDate';
import ReportTopicObjectiveToWorkLine from './report/line';
import ReportInvestimentPerMunicipalityAndTopic from './report/bar';
import { useGetMunicipalityInvestimentChart } from '../../services/municipality';
import { TextDonuts } from './report/textParagraph';
import { lineToText } from '../../utils/lineToText';

export const TopicObjectiveToWork: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idBlock = Number(searchParams.get('idBlock')) || 1;
  const idTopic = Number(searchParams.get('idTopic')) || 1;
  const year = Number(searchParams.get('year'));
  const line = (searchParams.get('line') as 'AGUA' | 'ESGOTO' | null) || 'AGUA';

  const { data: block } = useInformationsBlock(idBlock);

  const { data: dataTopicCapex } = useCapexInvestimentGeneral({
    idBlock,
    line: line,
    idTopic: idTopic,
  });

  const { data: chartDataYear, isLoading } = useInvestmentsChartPerYear({
    idBlock,
    idTopic,
    line: line as InvestimentoLine,
    startYear: block?.data.firstYearOfContract,
    endYear:
      block && Number(formatterDate(block?.data.lastInvestmentDate, 'YYYY')),
  });

  const { data: dataTopicMunicipality } = useGetMunicipalityInvestimentChart({
    idBlock,
    line: line,
    idTopic: idTopic,
    year: year,
  });

  const notRealizedFullYear =
    (dataTopicCapex?.data.totalExpected ?? 0) -
    (dataTopicCapex?.data.realized ?? 0);
  const notRealizedYear =
    (dataTopicCapex?.data.expected ?? 0) - (dataTopicCapex?.data.realized ?? 0);
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      {isLoading ? (
        <Loading />
      ) : (
        <PDFViewer width="100%" height="100%">
          <Document>
            <Capa
              concessionarieName={CONCESSIONAIRES[idBlock]}
              title={`RELATÓRIO DE FINALIDADE DA OBRA (${lineToText(line)})`}
              block={block?.data}
            />
            <BackCover block={block?.data} />
            <Template>
              {dataTopicCapex && (
                <View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <ReportTopicObjectiveToWorkDonuts
                      dataChart={[
                        {
                          name: 'Não realizado',
                          value:
                            notRealizedFullYear < 0 ? 0 : notRealizedFullYear,
                        },
                        {
                          name: 'Realizado',
                          value: dataTopicCapex?.data.realized ?? 0,
                        },
                      ]}
                      line={line}
                      total={dataTopicCapex?.data.totalExpected}
                    />
                    <ReportTopicObjectiveToWorkDonuts
                      dataChart={[
                        {
                          name: 'Não realizado',
                          value: notRealizedYear < 0 ? 0 : notRealizedYear,
                        },
                        {
                          name: 'Realizado',
                          value: dataTopicCapex?.data.realized ?? 0,
                        },
                      ]}
                      line={line}
                      total={dataTopicCapex?.data.expected}
                    />
                  </View>
                  <TextDonuts></TextDonuts>
                </View>
              )}
              <ReportTopicObjectiveToWorkLine
                dataYears={chartDataYear?.data}
                legend={`Investimento para ${lineToText(line)}`}
              />

              {dataTopicMunicipality && (
                <ReportInvestimentPerMunicipalityAndTopic
                  data={dataTopicMunicipality?.data}
                  title={`Investimento para ${lineToText(line)}`}
                />
              )}
            </Template>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};
