import { Text, View } from '@react-pdf/renderer';
import ReactPDFChart from 'react-pdf-charts';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { styles } from './style';
import { formatCurrencyChart } from '../../../utils/formatterCurrencyChart';
import { IGraphics } from '../../../types/graphics';

interface IProps {
  dataYears?: IGraphics;
  legend: string;
}
export interface IData {
  year: string;
  CAPEX: number;
  Realizado: number;
}
const ReportDetailsMunicipalityLine = ({ dataYears, legend }: IProps) => {
  function formatterData(value?: IGraphics): IData[] {
    if (!value) return [];
    return value.categories.map((item, index) => {
      return {
        year: item,
        CAPEX:
          value.data.find((item) => item.name === 'CAPEX')?.data[index] ?? 0,
        Realizado:
          value.data.find((item) => item.name === 'Realizado')?.data[index] ??
          0,
      };
    });
  }
  return (
    <>
      <View wrap={false} style={styles.boxChart}>
        <Text style={styles.titleTopic}>{legend}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <View style={styles.containerLegends}>
            {formatterData(dataYears).length ? (
              <ReactPDFChart>
                <LineChart
                  width={500}
                  height={300}
                  data={formatterData(dataYears)}
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
                    dataKey="CAPEX"
                    name="Previsto"
                    stroke="#00C589"
                    isAnimationActive={false}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    name="Realizado"
                    type="monotone"
                    dataKey="Realizado"
                    stroke="#F1760F"
                    dot={false}
                    isAnimationActive={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ReactPDFChart>
            ) : (
              <View style={styles.textNotData}>
                <Text>Não há dados</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.paragraph}>
        <Text>
          O gráfico apresenta a evolução temporal dos investimentos, comparando
          os valores previstos e realizados ao longo dos anos. Esta visualização
          em linha permite acompanhar a tendência histórica dos investimentos e
          sua projeção futura, oferecendo uma perspectiva ampla sobre o
          comportamento dos recursos aplicados ao longo do tempo.
        </Text>
        <Text>
          A análise da série histórica dos investimentos é uma ferramenta
          essencial para a gestão e planejamento estratégico, permitindo avaliar
          o ritmo de execução dos recursos e a aderência ao planejamento
          inicial. Este acompanhamento temporal contribui para a compreensão dos
          ciclos de investimento e auxilia na tomada de decisões para os
          períodos subsequentes, assegurando a continuidade e efetividade dos
          serviços prestados.
        </Text>
      </View>
    </>
  );
};

export default ReportDetailsMunicipalityLine;
