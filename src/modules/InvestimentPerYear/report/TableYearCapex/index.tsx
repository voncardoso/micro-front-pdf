import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { FunctionComponent } from 'react';
import RowTableCapexYearPdf from '../RowTable';
import RowTotalYearPdf from '../RowTotal';
import { IYearData, YearData } from '../../../../types/investmentsPerYear';

const styles = StyleSheet.create({
  pageTable: {
    paddingBottom: 30,
    paddingTop: 10,
    fontSize: 12,
    fontFamily: 'Nunito',
    width: '10vw',
  },
  boxTableCapex: {
    fontSize: 12,
    width: '100%',
    marginVertical: 4,
  },
  titleCapex: {
    paddingHorizontal: 20,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  boxHeaderTable: {
    width: '100%',
    border: '1px solid #D4D4D8',
    backgroundColor: '#EFFAFF',
    paddingVertical: 4,
  },
  textHeaderTable: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 8,
  },
  boxLogoPage: {
    position: 'absolute',
    width: '100vw',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: '#0A518A',
  },
});

interface ITableYearCapexPdfProps {
  table?: IYearData[];
  years: number[];
  optionLineInvestiment: string;
}
interface IHeaderTable {
  years: number[];
}

const HeaderTableCapexPdf: FunctionComponent<IHeaderTable> = ({ years }) => {
  if (!years) return;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: '#0B2543',
        width: '100%',
      }}
    >
      <View
        style={{
          ...styles.boxHeaderTable,
          width: '80%',
        }}
      >
        <Text style={styles.textHeaderTable}>Sistema</Text>
      </View>
      {years?.map((year, index) => {
        return (
          <View key={index} style={styles.boxHeaderTable}>
            <Text style={styles.textHeaderTable}>{year} </Text>
          </View>
        );
      })}
    </View>
  );
};

const TableYearCapex: FunctionComponent<ITableYearCapexPdfProps> = ({
  table,
  years,
}) => {
  const groupedData: Array<{ [key: string]: YearData }> = [];
  const maxYears = 5;
  const groupedYears: number[][] = [];
  for (let i = 0; i < years.length; i += maxYears) {
    groupedYears.push(years.slice(i, i + maxYears).sort((a, b) => a - b));
  }
  table?.forEach((investment, index) => {
    const { line, year, realized, expected } = investment;
    if (
      !groupedData.length ||
      groupedData[groupedData.length - 1][line]?.years.length >= maxYears
    ) {
      groupedData.push({
        AGUA: { name: 'AGUA', years: [] },
        ESGOTO: { name: 'ESGOTO', years: [] },
      });
    }
    groupedData[groupedData.length - 1][line].years.push({
      line,
      year,
      accomplished: realized,
      expected,
      name: line,
      id: index,
    });
  });

  const sortedGroupedData = groupedData.map((group) => {
    const sortedGroup = { ...group };
    Object.keys(sortedGroup).forEach((line) => {
      sortedGroup[line].years.sort((a, b) => a.year - b.year);
    });
    return sortedGroup;
  });

  return (
    <>
      {sortedGroupedData.map((group, index) => {
        return (
          <View style={styles.boxTableCapex} key={index}>
            <HeaderTableCapexPdf years={groupedYears?.[index] || []} />
            {table &&
              Object.values(group).map((item, index) => {
                return <RowTableCapexYearPdf item={item} key={index} />;
              })}
            {table && (
              <RowTotalYearPdf data={table} years={groupedYears[index]} />
            )}
          </View>
        );
      })}
    </>
  );
};

export default TableYearCapex;
