import { Text, View } from '@react-pdf/renderer';
import ReactPDFChart from 'react-pdf-charts';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import '../../../utils/fontRegister';
import Legends from '../../../components/Legends';
import { legends } from '../../../constants/legends';
import { IGraphics } from '../../../types/graphics';
import LegendsChart from '../../../components/LegendsCharts';
import { styles } from './styles';
import { formatCurrencyChart } from '../../../utils/formatterCurrencyChart';

interface IProps {
  dataWater: IGraphics;
  dataSewage: IGraphics;
}

const ReportInvestimentPerObejectiveToWork = ({
  dataWater,
  dataSewage,
}: IProps) => {
  const tableDataSewage = dataSewage.categories.map((category, index) => ({
    category: category,
    expected: dataSewage.data.find((d) => d.name === 'CAPEX')?.data[index] || 0,
    realized:
      dataSewage.data.find((d) => d.name === 'Realizado')?.data[index] || 0,
  }));

  const tableDataWater = dataWater.categories.map((category, index) => ({
    category: category,
    expected: dataWater.data.find((d) => d.name === 'CAPEX')?.data[index] || 0,
    realized:
      dataWater.data.find((d) => d.name === 'Realizado')?.data[index] || 0,
  }));
  return (
    <View style={{ textAlign: 'center' }}>
      <View wrap={false}>
        <View>
          <Text style={styles.title}>
            Investimentos por finalidade da obra (Água)
          </Text>
        </View>
        <ReactPDFChart>
          <BarChart data={tableDataWater} height={300} width={500} barSize={30}>
            <XAxis dataKey="category" />
            <YAxis tickFormatter={formatCurrencyChart} />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <Bar dataKey="expected" fill="#35ADF2" isAnimationActive={false} />
            <Bar dataKey="realized" fill="#EE368C" isAnimationActive={false} />
          </BarChart>
        </ReactPDFChart>
      </View>
      <Legends alignItems="center" legends={legends} />
      <LegendsChart
        legends={dataWater.legends}
        alignItems="center"
        categories={dataWater.categories}
      />
      <Text style={styles.paragraph}>
        O gráfico demonstra a distribuição dos investimentos previstos e
        realizados, segmentados por finalidade de obra no sistema de
        abastecimento de água. A visualização permite comparar o planejamento
        financeiro com sua execução efetiva em cada categoria operacional.
      </Text>
      <Text style={styles.paragraph}>
        A análise apresenta de forma clara as diferentes áreas de investimento,
        possibilitando identificar os segmentos com maior alocação de recursos
        previstos e sua respectiva execução. Esta distribuição reflete o
        planejamento estratégico da companhia e suas prioridades de investimento
        na infraestrutura do sistema de abastecimento.
      </Text>

      <View style={styles.generalBox} wrap={false}>
        <Text style={styles.title}>
          Investimentos por finalidade da obra (Esgoto)
        </Text>
        <ReactPDFChart>
          <BarChart
            data={tableDataSewage}
            height={300}
            width={500}
            barSize={30}
          >
            <XAxis dataKey="category" />
            <YAxis tickFormatter={formatCurrencyChart} />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <Bar dataKey="expected" fill="#35ADF2" isAnimationActive={false} />
            <Bar dataKey="realized" fill="#EE368C" isAnimationActive={false} />
          </BarChart>
        </ReactPDFChart>
      </View>
      <Legends alignItems="center" legends={legends} />
      <LegendsChart
        legends={dataSewage.legends}
        alignItems="center"
        categories={dataSewage.categories}
      />
      <Text style={styles.paragraph}>
        O gráfico apresenta a distribuição dos investimentos previstos e
        realizados, segmentados por finalidade de obra no sistema de esgotamento
        sanitário. A visualização permite comparar o planejamento financeiro com
        sua execução efetiva em cada categoria operacional do sistema.
      </Text>
      <Text style={styles.paragraph}>
        A análise contempla diversos componentes essenciais da infraestrutura de
        esgoto, desde obras estruturantes até elementos complementares como
        estações elevatórias e ligações domiciliares. Esta distribuição reflete
        o planejamento estratégico da concessionária em detrimento dos itens
        especificados em contratos.
      </Text>
    </View>
  );
};

export default ReportInvestimentPerObejectiveToWork;
