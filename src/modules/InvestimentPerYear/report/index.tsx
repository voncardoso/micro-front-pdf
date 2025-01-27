import { Text, View } from '@react-pdf/renderer';
import ReactPDFChart from 'react-pdf-charts';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import TableYearCapex from './TableYearCapex';
import { IYearData } from '../../../types/investmentsPerYear';
import '../../../utils/fontRegister';
import Legends from '../../../components/Legends';
import { legends } from '../../../constants/legends';
import { styles } from './style';

interface IProps {
  tableData: IYearData[];
  yearsData: number[];
  sewage: IYearData[];
  water: IYearData[];
}

const InvestmentPerYear = ({ tableData, yearsData, sewage, water }: IProps) => {
  function sumByYear(data: IYearData[]) {
    const result = [];
    const groupedByYear = data.reduce(
      (
        acc: {
          [year: number]: { year: number; expected: number; realized: number };
        },
        curr
      ) => {
        if (!acc[curr.year]) {
          acc[curr.year] = { year: curr.year, expected: 0, realized: 0 };
        }
        acc[curr.year].expected += curr.expected;
        acc[curr.year].realized += curr.realized;
        return acc;
      },
      {}
    );

    for (const year in groupedByYear) {
      result.push({
        year: parseInt(year),
        expected: groupedByYear[year].expected.toFixed(2),
        realized: groupedByYear[year].realized.toFixed(2),
        line: 'todos',
      });
    }

    return result;
  }

  return (
    <View style={styles.generalBox}>
      <View style={styles.boxTitle}>
        <Text style={styles.generalTitle}>Investimentos por ano</Text>
        <Text style={styles.generalTitle}>(jul/2021 a nov/2023)</Text>
      </View>

      <View>
        <Text style={styles.titleTable}>Investimentos por Ano</Text>
        <TableYearCapex
          optionLineInvestiment="Visão Geral"
          subtitle="Investimento previsto até "
          title="Teste"
          years={yearsData}
          table={tableData}
        ></TableYearCapex>
        <View>
          <View style={styles.observation}>
            <Text style={{ fontWeight: 'bold' }}>Observação:</Text>
            <Text>Investimentos realizados pela BRK Ambiental até 11/2023</Text>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              position: 'absolute',
              width: '100%',
            }}
          >
            <View style={styles.legend}>
              <View style={styles.boxLegend}>
                <Text style={styles.legendText}>Previsto: </Text>
                <View
                  style={{
                    ...styles.labelInformation,
                    backgroundColor: '#0B2543',
                  }}
                ></View>
              </View>
              <View style={styles.boxLegend}>
                <Text style={styles.legendText}>Realizado: </Text>
                <View
                  style={{
                    ...styles.labelInformation,
                    backgroundColor: '#F1760F',
                  }}
                ></View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.paragraph}>
        <Text>
          Esta seção apresenta a distribuição temporal dos investimentos
          realizados, detalhando os valores aplicados em cada período do
          projeto. A análise temporal permite visualizar o fluxo de recursos e
          sua distribuição ao longo dos anos, demonstrando o comprometimento com
          o cronograma estabelecido no plano de concessão. Os dados estão
          organizados em períodos anuais, facilitando o acompanhamento da
          evolução dos investimentos e sua correlação com as etapas previstas na
          concessão.
        </Text>
      </View>

      <View wrap={false}>
        <Text style={styles.titleTable}>Investimento Previsto x Realizado</Text>
        <View style={styles.chart}>
          <ReactPDFChart>
            <BarChart
              data={sumByYear(tableData)}
              height={200}
              width={400}
              barSize={30}
            >
              <XAxis dataKey="year" />
              <YAxis
                tick={{
                  fontSize: 10,
                  alignmentBaseline: 'middle',
                  textAnchor: 'end',
                }}
              />
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
        <View style={styles.paragraph}>
          <Text>
            O gráfico apresenta uma análise comparativa entre os investimentos
            previstos e os efetivamente realizados durante o período da
            concessão. Esta visualização permite avaliar o grau de aderência
            entre o planejamento financeiro inicial e sua execução real,
            destacando eventuais variações e seus respectivos impactos no
            desenvolvimento do projeto. A comparação serve como importante
            indicador de desempenho e eficiência na gestão dos recursos,
            auxiliando na identificação de pontos de atenção e oportunidades de
            otimização.
          </Text>
        </View>
      </View>

      <View wrap={false}>
        <Text style={styles.titleTable}>
          Investimento Previsto x Realizado ( Água )
        </Text>
        <View style={styles.chart}>
          <ReactPDFChart>
            <BarChart data={water} height={200} width={400} barSize={30}>
              <XAxis dataKey="year" />
              <YAxis
                tick={{
                  fontSize: 10,
                  alignmentBaseline: 'middle',
                  textAnchor: 'end',
                }}
              />
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
        <View style={styles.paragraph}>
          <Text>
            A análise comparativa entre os investimentos previstos e realizados
            permite avaliar a efetividade da execução do plano de investimentos,
            considerando as metas estabelecidas no contrato de concessão.
          </Text>
        </View>
      </View>

      <View wrap={false}>
        <Text style={styles.titleTable}>
          Investimento Previsto x Realizado ( Esgoto )
        </Text>
        <View style={styles.chart}>
          <ReactPDFChart>
            <BarChart data={sewage} height={200} width={400} barSize={30}>
              <XAxis dataKey="year" />
              <YAxis
                tick={{
                  fontSize: 10,
                  alignmentBaseline: 'middle',
                  textAnchor: 'end',
                }}
              />
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

        <View style={styles.paragraph}>
          <Text>
            A análise comparativa entre os investimentos previstos e realizados
            permite avaliar a efetividade da execução do plano de investimentos,
            considerando as metas estabelecidas no contrato de concessão.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InvestmentPerYear;
