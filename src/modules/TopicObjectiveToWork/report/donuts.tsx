import { Text, View } from '@react-pdf/renderer';
import ReactPDFChart from 'react-pdf-charts';
import { Cell, Pie, PieChart } from 'recharts';
import Legends from '../../../components/Legends';
import { formatterCurrency } from '../../../utils/formatterCurrency';
import { formatterPercentagem } from '../../../utils/formatterPercentagem';
import { styles } from './styles';
import { legends } from '../../../constants/legends';
import { COLORS } from '../../../constants/colors';
import { lineToText } from '../../../utils/lineToText';

interface IProps {
  dataChart: {
    name: string;
    value: number;
  }[];
  total?: number;
  line: string;
}
const ReportTopicObjectiveToWorkDonuts = ({
  dataChart,
  total,
  line,
}: IProps) => {
  function moduleValue(value: number, total: number) {
    if (!total) return 100;
    const percentage = ((value / total) * 100).toFixed(1);

    if (Number(percentage) < 0) return 0;
    return percentage;
  }
  return (
    <>
      <View wrap={false}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <View>
            <View style={styles.containerChart}>
              <Text style={styles.title}>Sistema de {lineToText(line)}</Text>
              <View style={styles.chart}>
                <ReactPDFChart>
                  <PieChart width={250} height={200}>
                    <Pie
                      data={dataChart}
                      cx={'50%'}
                      cy={'50%'}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      isAnimationActive={false}
                      dataKey="value"
                    >
                      {dataChart.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ReactPDFChart>
              </View>
              <View style={styles.text1}>
                <Text style={styles.labelSecundary}>
                  {moduleValue(dataChart[1].value, total ?? 0)}%
                </Text>{' '}
                <Text style={styles.label}>
                  {formatterCurrency(dataChart[1]?.value ?? 0)}{' '}
                </Text>{' '}
                <Text style={styles.label}>Realizado</Text>
              </View>
              <View style={styles.text2}>
                <Text style={styles.labelSecundary}>
                  {' '}
                  {formatterPercentagem(dataChart[0].value, total ?? 0, 1) < 0
                    ? 0
                    : formatterPercentagem(dataChart[0].value, total ?? 0, 1)}
                  %
                </Text>{' '}
                <Text style={styles.label}>
                  {formatterCurrency(Math.max(0, dataChart[0].value))}{' '}
                </Text>
                <Text style={styles.label}>Restante</Text>
              </View>
              <View style={styles.text3}>
                <Text style={styles.label}> {formatterCurrency(total)} </Text>
                <Text style={styles.labelSecundary}>
                  Investimento previsto
                </Text>{' '}
                <Text style={styles.labelSecundary}> para o bloco</Text>
              </View>
            </View>
            <View style={styles.containerLegends}>
              <Legends legends={legends} alignItems="center"></Legends>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ReportTopicObjectiveToWorkDonuts;
