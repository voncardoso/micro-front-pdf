import { StyleSheet, Text, View } from '@react-pdf/renderer';
import ReactPDFChart from 'react-pdf-charts';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import TableYearCapex from './TableYearCapex';
import { IYearData } from '../../../types/investmentsPerYear';
import '../../../utils/fontRegister';

interface IProps {
  tableData: IYearData[];
  yearsData: number[];
  sewage: IYearData[];
  water: IYearData[];
}
const styles = StyleSheet.create({
  generalBox: {
    fontFamily: 'Nunito',
  },
  boxTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleTable: {
    fontSize: 16,
    fontWeight: 'semibold',
  },

  labelInformation: {
    width: '10px',
    height: '10px',
  },
  observation: {
    fontSize: 9,
    fontWeight: 'normal',
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  legend: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    gap: 6,
  },
  boxLegend: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  legendText: {
    fontSize: 9,
  },
  paragraph: {
    fontSize: 12,
    fontWeight: 'normal',
    display: 'flex',
    gap: 10,
    marginVertical: 20,
  },
  chart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          rhoncus nisi quis nunc pretium, ac tristique neque semper. In porta
          ornare metus, sit amet cursus tellus convallis vel. Quisque non sem eu
          eros iaculis porta non nec massa. Vestibulum laoreet imperdiet diam.
          Maecenas nisl ipsum, hendrerit vitae auctor in, sagittis non enim.
          Aliquam sit amet tortor eget purus porttitor aliquet nec sit amet
          ante. Donec a vestibulum nisl. Quisque vestibulum erat dui, sit amet
          suscipit felis auctor id. Maecenas sodales velit et efficitur
          condimentum. Mauris a sollicitudin ante, non tincidunt mi. Integer
          vestibulum sed erat sed hendrerit. Sed nec viverra nunc. Proin
          pellentesque scelerisque sollicitudin. Sed molestie, sem vel
          ullamcorper porttitor, ligula justo malesuada neque, at sodales dolor
          augue nec nibh. Nam diam erat, mattis quis ipsum non, luctus
          scelerisque metus. Etiam rutrum a nisi sit amet porta
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
        <View style={styles.paragraph}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            rhoncus nisi quis nunc pretium, ac tristique neque semper. In porta
            ornare metus, sit amet cursus tellus convallis vel. Quisque non sem
            eu eros iaculis porta non nec massa. Vestibulum laoreet imperdiet
            diam. Maecenas nisl ipsum.
          </Text>
        </View>
      </View>

      <View wrap={false}>
        <Text style={styles.titleTable}>
          Investimento Previsto x Realizado Agua
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
        <View style={styles.paragraph}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            rhoncus nisi quis nunc pretium, ac tristique neque semper. In porta
            ornare metus, sit amet cursus tellus convallis vel. Quisque non sem
            eu eros iaculis porta non nec massa. Vestibulum laoreet imperdiet
            diam. Maecenas nisl ipsum.
          </Text>
        </View>
      </View>

      <View wrap={false}>
        <Text style={styles.titleTable}>
          Investimento Previsto x Realizado Esgoto
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
        <View style={styles.paragraph}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            rhoncus nisi quis nunc pretium, ac tristique neque semper. In porta
            ornare metus, sit amet cursus tellus convallis vel. Quisque non sem
            eu eros iaculis porta non nec massa. Vestibulum laoreet imperdiet
            diam. Maecenas nisl ipsum.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InvestmentPerYear;
