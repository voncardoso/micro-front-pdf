import { IYearData } from '../../../../types/investmentsPerYear';
import { formatterCurrency } from '../../../../utils/formatterCurrency';
import { formatterPercentagem } from '../../../../utils/formatterPercentagem';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { FunctionComponent } from 'react';

const styles = StyleSheet.create({
  boxRowTotal: {
    display: 'flex',
    flexDirection: 'row',
    color: '#0B2543',
    fontWeight: 'bold',
    width: '100%',
  },
  boxRowData: {
    width: '100%',
    border: '1px solid #D4D4D8',
    backgroundColor: '#FDE9C8',
    padding: 4,
    maxWidth: '25%',
  },
  boxRowWithGap: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    fontWeight: 'normal',
  },
  textRowData: {
    textAlign: 'right',
    fontSize: 8,
  },
  textRowDataAccomplished: {
    textAlign: 'right',
    fontSize: 8,
    color: '#FF0000',
  },
});

interface IRowTotalPdfProps {
  data: IYearData[];
  years: number[];
}

const RowTotalYearPdf: FunctionComponent<IRowTotalPdfProps> = ({
  data,
  years,
}) => {
  return (
    <>
      <View style={styles.boxRowTotal}>
        <View
          style={{
            ...styles.boxRowData,
            justifyContent: 'center',
            width: '25%',
            maxWidth: '25%',
          }}
        >
          <Text style={{ textAlign: 'left', fontSize: 8 }}>Total</Text>
        </View>
        {years?.map((year, index) => {
          const sumExpected = data
            .filter((e) => Number(e.year) === year)
            .reduce((acc, curr) => acc + curr.expected, 0);
          const sumAccomplished = data
            .filter((e) => Number(e.year) === year)
            .reduce((acc, curr) => acc + curr.realized, 0);
          return (
            <>
              <View
                key={index}
                style={{
                  ...styles.boxRowData,
                  ...styles.boxRowWithGap,
                }}
              >
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <View style={{ width: '75%' }}>
                    <Text style={styles.textRowData}>
                      {formatterCurrency(sumExpected)}{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      fontSize: 8,
                      ...styles.boxRowWithGap,
                      gap: 0,
                    }}
                  >
                    <View style={{ width: '75%' }}>
                      <Text style={styles.textRowDataAccomplished}>
                        {formatterCurrency(sumAccomplished)}{' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '25%',
                        fontSize: 8,
                        ...styles.boxRowWithGap,
                        gap: 0,
                      }}
                    >
                      <Text style={{ width: '10%', textAlign: 'center' }}>
                        |
                      </Text>
                      <View style={{ width: '90%' }}>
                        <Text
                          style={{
                            ...styles.textRowDataAccomplished,
                            textAlign: 'right',
                            width: '100%',
                          }}
                        >
                          {`${formatterPercentagem(
                            sumAccomplished,
                            sumExpected
                          )} %`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </>
          );
        })}
      </View>
    </>
  );
};

export default RowTotalYearPdf;
