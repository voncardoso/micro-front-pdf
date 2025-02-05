import { Text, View } from '@react-pdf/renderer';
import ReactPDFChart from 'react-pdf-charts';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { styles } from './styles';
import { formatCurrencyChart } from '../../../utils/formatterCurrencyChart';
import { IGraphics } from '../../../types/graphics';
import { TextLine } from './textParagraph';

interface IProps {
  dataYears?: IGraphics;
  legend: string;
}
export interface IData {
  year: string;
  CAPEX: number;
  Realizado: number;
}
const ReportTopicObjectiveToWorkLine = ({ dataYears, legend }: IProps) => {
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
        <TextLine />
      </View>
    </>
  );
};

export default ReportTopicObjectiveToWorkLine;
