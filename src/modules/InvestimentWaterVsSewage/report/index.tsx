import { Text, View } from '@react-pdf/renderer';
import ReactPDFChart from 'react-pdf-charts';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import '../../../utils/fontRegister';
import { styles } from './style';
import { IWaterVsSewageResponse } from '../../../services/waterVsSewage/@types';
import { formatCurrencyChart } from '../../../utils/formatterCurrencyChart';

interface IProps {
  data: IWaterVsSewageResponse[];
}

const ReportInvestimentWaterVsSewage = ({ data }: IProps) => {
  return (
    <View style={{ textAlign: 'center' }} wrap={false}>
      <View>
        <View>
          <Text style={styles.title}>Investimentos Água vs Esgoto</Text>
        </View>
        <View style={styles.chart}>
          <ReactPDFChart>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrencyChart} />
              <Legend />
              <Line
                type="monotone"
                dataKey="AGUA"
                name="Água"
                stroke="#00C589"
                isAnimationActive={false}
                strokeWidth={2}
                dot={false}
              />
              <Line
                name="Esgoto"
                type="monotone"
                dataKey="ESGOTO"
                stroke="#F1760F"
                dot={false}
                isAnimationActive={false}
                strokeWidth={2}
              />
            </LineChart>
          </ReactPDFChart>
        </View>
        <Text style={styles.paragraph}>
          O gráfico apresenta a evolução comparativa dos investimentos totais
          realizados nos sistemas de água e esgoto ao longo do período
          analisado. Esta visualização permite acompanhar as tendências de
          investimento em ambos os segmentos, evidenciando a distribuição dos
          recursos entre estas duas áreas fundamentais do saneamento básico.
        </Text>
        <Text style={styles.paragraph}>
          A análise temporal demonstra o comportamento dos investimentos em cada
          setor, permitindo identificar períodos de maior concentração de
          recursos e eventuais variações na priorização entre água e esgoto.
          Esta comparação é essencial para avaliar o equilíbrio dos
          investimentos e o alinhamento com as metas estabelecidas para cada
          segmento.
        </Text>
      </View>
    </View>
  );
};

export default ReportInvestimentWaterVsSewage;
