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
  data: IGraphics;
  title: string;
}

const ReportInvestimentPerMunicipalityAndTopic = ({ data, title }: IProps) => {
  const tableDataSewage = data.categories.map((category, index) => ({
    category: category,
    expected: data.data.find((d) => d.name === 'CAPEX')?.data[index] || 0,
    realized: data.data.find((d) => d.name === 'Realizado')?.data[index] || 0,
  }));

  return (
    <View style={{ textAlign: 'center' }}>
      <View wrap={false} style={styles.generalBox}>
        <View>
          <Text style={styles.titleTopic}>{title}</Text>
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
              <Bar
                dataKey="expected"
                fill="#35ADF2"
                isAnimationActive={false}
              />
              <Bar
                dataKey="realized"
                fill="#EE368C"
                isAnimationActive={false}
              />
            </BarChart>
          </ReactPDFChart>
        </View>
        <Legends alignItems="center" legends={legends} />
        <LegendsChart
          legends={data.legends}
          alignItems="center"
          categories={data.categories}
        />
        <View style={styles.paragraph}>
          <Text>
            O gráfico demonstra o comparativo entre os investimentos previstos e
            realizados em sistemas de esgoto por município. A disposição em
            barras facilita a visualização das variações entre os valores
            planejados e executados em cada localidade.
          </Text>
          <Text>
            Esta apresentação permite analisar como os recursos destinados ao
            setor de esgoto foram distribuídos territorialmente, evidenciando o
            desempenho da execução financeira em cada município pertecente a
            cobertura de atuação da concessionária.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReportInvestimentPerMunicipalityAndTopic;
