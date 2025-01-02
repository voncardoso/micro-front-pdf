import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import ReactPDFChart from 'react-pdf-charts';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'G', uv: 3490, pv: 4300, amt: 2100 },
];

const options: ApexOptions = {
  chart: {
    id: 'basic-bar',
  },
  xaxis: {
    categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
  },
};

const series = [
  {
    name: 'Vendas',
    data: [30, 40, 45, 50, 49, 60],
  },
];

export const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Relatório do Dashboard</Text>
      <Text style={styles.text}>
        Este é um relatório gerado com Recharts e React-PDF.
      </Text>
      <ReactPDFChart>
        <BarChart data={data} height={300} width={500}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <Bar dataKey="uv" fill="#8884d8" isAnimationActive={false} />
          <Bar dataKey="pv" fill="#82ca9d" isAnimationActive={false} />
        </BarChart>
      </ReactPDFChart>
      <Text style={styles.text}>
        Este é um relatório gerado com Recharts e React-PDF.
      </Text>
      <ReactPDFChart>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          width={500}
        />
      </ReactPDFChart>
    </Page>
  </Document>
);

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
