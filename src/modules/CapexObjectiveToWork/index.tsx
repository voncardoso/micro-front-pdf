import { Document, PDFViewer } from '@react-pdf/renderer';
import Capa from '../../components/Cover';
import BackCover from '../../components/BackCover';
import Loading from '../../components/Loading';
import { CONCESSIONAIRES } from '../../constants/concessionaires';
import { useSearchParams } from 'react-router-dom';
import Template from '../../components/Template';
import { useCapexObejectiveToWork } from '../../services/objectiveToWork';
import TableCapexPdf from './reports';
import { useInformationsBlock } from '../../services/block';
import { formatterDate } from '../../utils/formatterDate';

export const CapexObjectiveToWork: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idblock = Number(searchParams.get('idBlock'));
  const { data, isLoading } = useCapexObejectiveToWork({
    idBlock: idblock,
    sistema: 'AGUA',
  });
  const { data: capexSewage } = useCapexObejectiveToWork({
    idBlock: idblock,
    sistema: 'ESGOTO',
  });
  const { data: block } = useInformationsBlock(idblock);
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
              block={block?.data}
            />
            <BackCover block={block?.data} />
            <Template>
              {data?.data && capexSewage && (
                <>
                  <TableCapexPdf
                    optionLineInvestiment={'SAA'}
                    time={`(${block && block.data.firstYearOfContract + 1} - ${
                      block &&
                      formatterDate(block.data!.lastInvestmentDate, 'MM/YYYY')
                    })`}
                    title={block?.data?.name ?? ' - '}
                    tableExpected={data.realized}
                    tableNotExpected={data.notExpected}
                    tableNotExecuted={data.notRealized}
                    listGeneral={data?.data}
                  />
                  <TableCapexPdf
                    optionLineInvestiment={'SAE'}
                    time={`(${block && block.data.firstYearOfContract + 1} - ${
                      block &&
                      formatterDate(block.data!.lastInvestmentDate, 'MM/YYYY')
                    })`}
                    title={block?.data?.name ?? ' - '}
                    tableExpected={capexSewage.realized}
                    tableNotExpected={capexSewage.notExpected}
                    tableNotExecuted={capexSewage.notRealized}
                    listGeneral={capexSewage?.data}
                  />
                </>
              )}
            </Template>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};
