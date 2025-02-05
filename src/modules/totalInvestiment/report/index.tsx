import { Text, View } from '@react-pdf/renderer';
import ReactPDFChart from 'react-pdf-charts';
import { Cell, Pie, PieChart } from 'recharts';
import '../../../utils/fontRegister';
import { styles } from './style';
import { IInformationsBlock } from '../../../services/block/@types';
import { formatterCurrency } from '../../../utils/formatterCurrency';
import { formatterPercentagem } from '../../../utils/formatterPercentagem';
import { legends } from '../../../constants/legends';
import Legends from '../../../components/Legends';
import { formatterDate } from '../../../utils/formatterDate';

interface IProps {
  data?: IInformationsBlock;
}

const ReportInvestmentTotal = ({ data }: IProps) => {
  const COLORS = ['#35AEF2', '#DF2372'];
  function moduleValue(value?: number, total?: number) {
    if (!value || !total) return 0;
    if (!total) return 100;
    const percentage = ((value / total) * 100).toFixed(1);

    if (Number(percentage) < 0) return 0;
    return percentage;
  }
  function valueNotRealized(expected: number, realized: number) {
    return (expected ?? 0) - (realized ?? 0);
  }

  return (
    <View wrap={false}>
      <View wrap={false}>
        <Text style={styles.title}>Total Investido</Text>
        <View style={styles.containerChart}>
          <View style={styles.chart}>
            <ReactPDFChart>
              <PieChart width={250} height={200}>
                <Pie
                  data={[
                    { name: 'Previsto', value: data?.totalInvestment.expected },
                    {
                      name: 'Realizado',
                      value: data?.totalInvestment.realized,
                    },
                  ]}
                  cx={'50%'}
                  cy={'50%'}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  isAnimationActive={false}
                  dataKey="value"
                >
                  {[
                    { name: 'Previsto', value: data?.totalExpectedInvestment },
                    {
                      name: 'Realizado',
                      value: (data?.totalExpectedInvestment || 0) / 2,
                    },
                  ].map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ReactPDFChart>
          </View>
          <View style={{ ...styles.text1, right: 100 }}>
            <Text style={styles.labelSecundary}>
              {' '}
              {moduleValue(
                data?.totalInvestment.realized,
                data?.totalInvestment.expected ?? 0
              )}{' '}
              %
            </Text>{' '}
            <Text style={styles.label}>
              {formatterCurrency(data?.totalInvestment.realized)}{' '}
            </Text>{' '}
            <Text style={styles.label}>
              Realizado até{' '}
              {data && formatterDate(data?.lastInvestmentDate, 'YYYY')}
            </Text>{' '}
          </View>
          <View style={{ ...styles.text2, left: 100 }}>
            <Text style={styles.labelSecundary}>
              {' '}
              {formatterPercentagem(
                valueNotRealized(
                  data?.totalInvestment.expected ?? 0,
                  data?.totalInvestment.realized ?? 0
                ),
                data?.totalInvestment.expected ?? 0,
                1
              ) < 0
                ? 0
                : formatterPercentagem(
                    valueNotRealized(
                      data?.totalInvestment.expected ?? 0,
                      data?.totalInvestment.realized ?? 0
                    ),
                    data?.totalInvestment.expected ?? 0,
                    1
                  )}
              %{' '}
            </Text>{' '}
            <Text style={styles.label}>
              {formatterCurrency(
                (data?.totalInvestment.expected ?? 0) -
                  (data?.totalInvestment.realized ?? 0)
              )}{' '}
            </Text>
            <Text style={styles.label}>
              Restante até{' '}
              {data && data.firstYearOfContract + data.totalOfContractYears}
            </Text>
          </View>
          <View style={styles.text3}>
            <Text style={styles.label}>
              {' '}
              {formatterCurrency(data?.totalInvestment.expected)}{' '}
            </Text>
            <Text style={styles.labelSecundary}>Investimento previsto</Text>{' '}
            <Text style={styles.labelSecundary}> para o bloco</Text>
          </View>
        </View>
        <View style={styles.containerLegends}>
          <Legends legends={legends} alignItems="center" />
        </View>
      </View>

      <View style={styles.paragraph}>
        <Text>
          Esta seção apresenta a análise da distribuição temporal dos
          investimentos, com a quantificação dos valores aplicados em cada
          período do projeto. A organização temporal dos dados permite
          identificar o fluxo de recursos e sua alocação ao longo dos anos, em
          conformidade com o cronograma do plano de concessão. Os registros
          estão estruturados em períodos anuais, possibilitando a verificação da
          progressão dos investimentos e sua correspondência com as etapas
          estabelecidas na concessão.
        </Text>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <View>
          <View style={styles.containerChart}>
            <Text style={styles.title}>Sistema de água</Text>
            <View style={styles.chart}>
              <ReactPDFChart>
                <PieChart width={250} height={200}>
                  <Pie
                    data={[
                      {
                        name: 'Previsto',
                        value: data?.waterInvestment.expected,
                      },
                      {
                        name: 'Realizado',
                        value: data?.waterInvestment.realized,
                      },
                    ]}
                    cx={'50%'}
                    cy={'50%'}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    isAnimationActive={false}
                    dataKey="value"
                  >
                    {[
                      {
                        name: 'Previsto',
                        value: data?.waterInvestment?.expected,
                      },
                      {
                        name: 'Realizado',
                        value: (data?.waterInvestment?.realized || 0) / 2,
                      },
                    ].map((_, index) => (
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
                {' '}
                {moduleValue(
                  data?.waterInvestment.realized,
                  data?.waterInvestment.expected
                )}
                %
              </Text>{' '}
              <Text style={styles.label}>
                {formatterCurrency(data?.waterInvestment.realized)}{' '}
              </Text>{' '}
              <Text style={styles.label}>Realizado</Text>
            </View>
            <View style={styles.text2}>
              <Text style={styles.labelSecundary}>
                {' '}
                {formatterPercentagem(
                  valueNotRealized(
                    data?.waterInvestment.expected ?? 0,
                    data?.waterInvestment.realized ?? 0
                  ),
                  data?.waterInvestment.expected ?? 0,
                  1
                ) < 0
                  ? 0
                  : formatterPercentagem(
                      valueNotRealized(
                        data?.waterInvestment.expected ?? 0,
                        data?.waterInvestment.realized ?? 0
                      ),
                      data?.waterInvestment.expected ?? 0,
                      1
                    )}
                %
              </Text>{' '}
              <Text style={styles.label}>
                {formatterCurrency(
                  (data?.waterInvestment.expected ?? 0) -
                    (data?.waterInvestment.realized ?? 0)
                )}{' '}
              </Text>
              <Text style={styles.label}>Restante</Text>
            </View>
            <View style={styles.text3}>
              <Text style={styles.label}>
                {' '}
                {formatterCurrency(data?.waterInvestment.expected)}{' '}
              </Text>
              <Text style={styles.labelSecundary}>Investimento previsto</Text>{' '}
              <Text style={styles.labelSecundary}> para o bloco</Text>
            </View>
          </View>
          <View style={styles.containerLegends}>
            <Legends legends={legends} alignItems="center"></Legends>
          </View>
        </View>

        <View>
          <View style={styles.containerChart}>
            <Text style={styles.title}>Sistema de esgoto</Text>
            <View style={styles.chart}>
              <ReactPDFChart>
                <PieChart width={250} height={200}>
                  <Pie
                    data={[
                      {
                        name: 'Previsto',
                        value: data?.sewageInvestment.expected,
                      },
                      {
                        name: 'Realizado',
                        value: data?.sewageInvestment.realized,
                      },
                    ]}
                    cx={'50%'}
                    cy={'50%'}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    isAnimationActive={false}
                    dataKey="value"
                  >
                    {[
                      {
                        name: 'Previsto',
                        value: data?.totalExpectedInvestment,
                      },
                      {
                        name: 'Realizado',
                        value: (data?.totalExpectedInvestment || 0) / 2,
                      },
                    ].map((_, index) => (
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
                {' '}
                {moduleValue(
                  data?.sewageInvestment.realized,
                  data?.sewageInvestment.expected
                )}{' '}
                %{' '}
              </Text>{' '}
              <Text style={styles.label}>
                {formatterCurrency(data?.sewageInvestment.realized)}{' '}
              </Text>{' '}
              <Text style={styles.label}>Realizado</Text>{' '}
            </View>
            <View style={styles.text2}>
              <Text style={styles.labelSecundary}>
                {' '}
                {formatterPercentagem(
                  valueNotRealized(
                    data?.sewageInvestment.expected ?? 0,
                    data?.sewageInvestment.realized ?? 0
                  ),
                  data?.sewageInvestment.expected ?? 0,
                  1
                ) < 0
                  ? 0
                  : formatterPercentagem(
                      valueNotRealized(
                        data?.sewageInvestment.expected ?? 0,
                        data?.sewageInvestment.realized ?? 0
                      ),
                      data?.sewageInvestment.expected ?? 0,
                      1
                    )}
                %{' '}
              </Text>{' '}
              <Text style={styles.label}>
                {formatterCurrency(
                  (data?.sewageInvestment.expected ?? 0) -
                    (data?.sewageInvestment.realized ?? 0)
                )}{' '}
              </Text>
              <Text style={styles.label}>Restante</Text>
            </View>
            <View style={styles.text3}>
              <Text style={styles.label}>
                {' '}
                {formatterCurrency(data?.sewageInvestment.expected)}{' '}
              </Text>
              <Text style={styles.labelSecundary}>Investimento previsto</Text>{' '}
              <Text style={styles.labelSecundary}> para o bloco</Text>
            </View>
          </View>

          <View style={styles.containerLegends}>
            <Legends legends={legends} alignItems="center"></Legends>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReportInvestmentTotal;
