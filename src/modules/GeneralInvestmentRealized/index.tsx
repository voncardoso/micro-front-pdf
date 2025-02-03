import { Document, PDFViewer } from '@react-pdf/renderer';
import Capa from '../../components/Cover';
import BackCover from '../../components/BackCover';
import Loading from '../../components/Loading';
import { CONCESSIONAIRES } from '../../constants/concessionaires';
import { useSearchParams } from 'react-router-dom';
import Template from '../../components/Template';
import {
  useCapexObejectiveToWork,
  useInvestimentObejectiveToWork,
} from '../../services/objectiveToWork';
import { useInformationsBlock } from '../../services/block';
import { formatterDate } from '../../utils/formatterDate';
import TableCapexPdf from '../CapexObjectiveToWork/reports';
import { InformationsBlock } from '../Block/report';
import {
  useGetMunicipalityInvestimentChart,
  useMunicipality,
} from '../../services/municipality';
import InvestmentPerYear from '../InvestimentPerYear/report';
import { useInvestmentsPerYear } from '../../services/investimentPerYear';
import ReportInvestmentTotal from '../totalInvestiment/report';
import ReportInvestimentPerObejectiveToWork from '../InvestimentPerObjectiveToWork/report';
import ReportInvestimentPerMunicipality from '../InvestimentPerMunicipality/report';
import ReportInvestimentWaterVsSewage from '../InvestimentWaterVsSewage/report';
import { useWaterVsSewage } from '../../services/waterVsSewage';

export const GeneralInestimentRealized: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idblock = Number(searchParams.get('idBlock'));
  const { data: capexObejectiveToWork, isLoading: isLoadingCapex } =
    useCapexObejectiveToWork({ idBlock: idblock, sistema: 'AGUA' });
  const { data: capexObejectiveToWorkSweage } = useCapexObejectiveToWork({
    idBlock: idblock,
    sistema: 'ESGOTO',
  });
  const { data: block, isLoading: isLoadingBlock } =
    useInformationsBlock(idblock);
  const { data: municipality } = useMunicipality();
  const { data: investmentsPerYear, isLoading: isLoadingInvestmentPerYear } =
    useInvestmentsPerYear(idblock);
  const { data: dataWater } = useInvestimentObejectiveToWork({
    idBlock: idblock,
    line: 'AGUA',
  });
  const { data: dataSewage } = useInvestimentObejectiveToWork({
    idBlock: idblock,
    line: 'ESGOTO',
  });
  const { data: dataMunicipalityWater } = useGetMunicipalityInvestimentChart({
    idBlock: idblock,
    line: 'AGUA',
  });
  const { data: dataMunicipalitySewage } = useGetMunicipalityInvestimentChart({
    idBlock: idblock,
    line: 'ESGOTO',
  });
  const { data: dataMunicipalityGeneral } = useGetMunicipalityInvestimentChart({
    idBlock: idblock,
  });
  const { data: dataWaterVsSewage } = useWaterVsSewage(idblock);
  console.log(block);
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      {isLoadingCapex && isLoadingBlock && isLoadingInvestmentPerYear ? (
        <Loading />
      ) : (
        <PDFViewer width="100%" height="100%">
          <Document>
            <Capa
              concessionarieName={CONCESSIONAIRES[idblock]}
              title={'RELATÓRIO DE INVESTIMENTOS'}
              block={block?.data}
            />
            <BackCover block={block?.data} />
            <Template>
              <InformationsBlock
                data={block?.data}
                idblock={idblock}
                municipality={municipality?.data}
              ></InformationsBlock>
            </Template>
            <Template>
              <>
                {investmentsPerYear && (
                  <InvestmentPerYear
                    block={block?.data}
                    tableData={investmentsPerYear.data}
                    yearsData={investmentsPerYear.years}
                    sewage={investmentsPerYear.sewage}
                    water={investmentsPerYear.water}
                  />
                )}
                <ReportInvestmentTotal data={block?.data} />
                {dataWater && dataSewage && (
                  <ReportInvestimentPerObejectiveToWork
                    dataWater={dataWater?.data}
                    dataSewage={dataSewage?.data}
                  />
                )}
                {capexObejectiveToWork && (
                  <TableCapexPdf
                    optionLineInvestiment={'SAA'}
                    time={`(${block && block.data.firstYearOfContract} - ${
                      block &&
                      formatterDate(block.data!.lastInvestmentDate, 'YYYY')
                    })`}
                    title={block?.data?.name ?? ' - '}
                    tableExpected={capexObejectiveToWork.realized}
                    tableNotExpected={capexObejectiveToWork.notExpected}
                    tableNotExecuted={capexObejectiveToWork.notRealized}
                    listGeneral={capexObejectiveToWork?.data}
                  />
                )}
                {capexObejectiveToWorkSweage && (
                  <TableCapexPdf
                    optionLineInvestiment={'SAE'}
                    time={`(${block && block.data.firstYearOfContract + 1} - ${
                      block &&
                      formatterDate(block.data!.lastInvestmentDate, 'MM/YYYY')
                    })`}
                    title={block?.data?.name ?? ' - '}
                    tableExpected={capexObejectiveToWorkSweage.realized}
                    tableNotExpected={capexObejectiveToWorkSweage.notExpected}
                    tableNotExecuted={capexObejectiveToWorkSweage.notRealized}
                    listGeneral={capexObejectiveToWorkSweage?.data}
                  />
                )}
                {dataMunicipalityWater &&
                  dataMunicipalitySewage &&
                  dataMunicipalityGeneral && (
                    <ReportInvestimentPerMunicipality
                      dataWater={dataMunicipalityWater?.data}
                      dataSewage={dataMunicipalitySewage?.data}
                      dataGeneral={dataMunicipalityGeneral?.data}
                    />
                  )}
                {dataWaterVsSewage && (
                  <ReportInvestimentWaterVsSewage
                    data={dataWaterVsSewage?.data}
                  />
                )}
              </>
            </Template>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};
