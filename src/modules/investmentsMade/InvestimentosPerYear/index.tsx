import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import ReactPDFChart from 'react-pdf-charts';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
interface IData {
  categories: string[];
  data: Datum[];
  legends: string[];
}

interface Datum {
  name: string;
  data: number[];
}

interface TransformedData {
  name: string;
  [key: string]: string | number; // Nome + valores dinâmicos como CAPEX, Realizado, etc.
}
const InvestmentPerYear = () => {
  function transformToData(teste: IData): TransformedData[] {
    const { categories, data, legends } = teste;

    const transformedData: TransformedData[] = categories.map((_, index) => {
      //   const row: TransformedData = { name: legends[index] };
      const row: TransformedData = { name: (index + 1).toString() };

      data.forEach((series) => {
        row[series.name] = series.data[index];
      });

      return row;
    });

    return transformedData;
  }
  const teste = {
    categories: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '14',
      '14',
      '14',
      '14',
      '14',
      '14',
    ],
    data: [
      {
        name: 'CAPEX',
        data: [
          26490415.5, 11730520.71, 5375347.01, 1796238.33, 667816340.43,
          55482429.88, 8282835.2, 8879716.88, 11077014.31, 15719650.45,
          28098713.55, 3551427.1, 7574756.33, 7574756.33, 11077014.31,
          15719650.45, 28098713.55, 3551427.1, 7574756.33, 7574756.33,
        ],
      },
      {
        name: 'Realizado',
        data: [
          44715792.29, 7103895.44, 24587492.18, 1462560.94, 295469448.13,
          94001720.73, 3256077.54, 4542191.48, 5391608.28, 9388138.51,
          22118494.7, 2382233.67, 1101217.78, 1101217.78, 11077014.31,
          15719650.45, 28098713.55, 3551427.1, 7574756.33, 7574756.33,
        ],
      },
    ],
    legends: [
      'Atalaia',
      'Barra de Santo Antônio',
      'Barra de São Miguel',
      'Coqueiro Seco',
      'Maceió',
      'Marechal Deodoro',
      'Messias',
      'Murici',
      'Paripueira',
      'Pilar',
      'Rio Largo',
      'Santa Luzia do Norte',
      'Satuba',
      'Satuba',
      'Paripueira',
      'Pilar',
      'Rio Largo',
      'Santa Luzia do Norte',
      'Satuba',
      'Satuba',
    ],
  };

  return (
    <View style={{}}>
      <Text style={styles.title}>Relatório do Dashboard</Text>
      <Text style={styles.text}>
        Este é um relatório gerado com Recharts e React-PDF.
      </Text>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ReactPDFChart>
          <BarChart
            data={transformToData(teste)}
            height={300}
            width={500}
            barSize={5}
          >
            <XAxis dataKey="name" />
            <YAxis
              tick={{
                fontSize: 10,
                alignmentBaseline: 'middle',
                textAnchor: 'end',
              }} // Tamanho da fonte do eixo Y
              //   tickFormatter={(value) => {
              //     if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`; // Formato para bilhões
              //     if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`; // Formato para milhões
              //     return value; // Valor original para menores números
              //   }}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <Bar dataKey="CAPEX" fill="#8884d8" isAnimationActive={false} />
            <Bar dataKey="Realizado" fill="#82ca9d" isAnimationActive={false} />
          </BarChart>
        </ReactPDFChart>
      </View>
      <Text style={styles.text}>
        Este é um relatório gerado com Recharts e React-PDF.
      </Text>
    </View>
  );
};

export default InvestmentPerYear;

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 12,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
});
