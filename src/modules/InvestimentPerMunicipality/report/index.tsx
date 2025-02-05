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
  dataGeneral: IGraphics;
}

const ReportInvestimentPerMunicipality = ({
  dataWater,
  dataSewage,
  dataGeneral,
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

  const tableDataGeneral = dataGeneral.categories.map((category, index) => ({
    category: category,
    expected:
      dataGeneral.data.find((d) => d.name === 'CAPEX')?.data[index] || 0,
    realized:
      dataGeneral.data.find((d) => d.name === 'Realizado')?.data[index] || 0,
  }));
  return (
    <View style={{ textAlign: 'center' }}>
      <View wrap={false} style={styles.generalBox}>
        <View>
          <View>
            <Text style={styles.title}>Investimentos por Município</Text>
          </View>
          <ReactPDFChart>
            <BarChart
              data={tableDataGeneral}
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
          legends={dataGeneral.legends}
          alignItems="center"
          categories={dataGeneral.categories}
        />
        <Text style={styles.paragraph}>
          O gráfico apresenta a distribuição dos investimentos previstos e
          realizados por município, permitindo uma visualização clara da
          alocação de recursos em diferentes localidades da área de atuação da
          concessionária. Esta representação possibilita uma análise comparativa
          entre o planejamento e a execução financeira em cada região atendida.
        </Text>
        <Text style={styles.paragraph}>
          A distribuição dos investimentos reflete as diferentes necessidades e
          prioridades de cada município, que por sua vez consideram aspectos
          como populacional, infraestrutura existente assim como novas demandas
          específicas de cada localidade. Esta visão é fundamental para o
          acompanhamento da política de desenvolvimento e equidade na prestação
          dos serviços.
        </Text>
      </View>
      <View wrap={false} style={styles.generalBox}>
        <View>
          <View>
            <Text style={styles.title}>Investimentos por município (Água)</Text>
          </View>
          <ReactPDFChart>
            <BarChart
              data={tableDataWater}
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
          legends={dataWater.legends}
          alignItems="center"
          categories={dataWater.categories}
        />
        <Text style={styles.paragraph}>
          O gráfico apresenta a comparação entre os investimentos previstos e
          realizados em sistemas de água por município. A visualização permite
          identificar as diferenças entre o planejamento e a execução financeira
          em cada localidade atendida.
        </Text>
        <Text style={styles.paragraph}>
          Esta representação possibilita uma análise clara da distribuição dos
          recursos destinados ao setor de água, permitindo avaliar a efetividade
          do planejamento em cada município da área de atuação da
          concessionária.
        </Text>
      </View>
      <View wrap={false} style={styles.generalBox}>
        <View>
          <Text style={styles.title}>Investimentos por município (Esgoto)</Text>
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
          legends={dataSewage.legends}
          alignItems="center"
          categories={dataSewage.categories}
        />
        <Text style={styles.paragraph}>
          O gráfico demonstra o comparativo entre os investimentos previstos e
          realizados em sistemas de esgoto por município. A disposição em barras
          facilita a visualização das variações entre os valores planejados e
          executados em cada localidade.
        </Text>
        <Text style={styles.paragraph}>
          Esta apresentação permite analisar como os recursos destinados ao
          setor de esgoto foram distribuídos territorialmente, evidenciando o
          desempenho da execução financeira em cada município pertecente a
          cobertura de atuação da concessionária.
        </Text>
      </View>
    </View>
  );
};

export default ReportInvestimentPerMunicipality;
