import { YearData } from '../../../../types/investmentsPerYear';
import { formatterCurrency } from '../../../../utils/formatterCurrency';
import { formatterPercentagem } from '../../../../utils/formatterPercentagem';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { FunctionComponent } from 'react';

const styles = StyleSheet.create({
  boxRowData: {
    width: '100%',
    maxWidth: '25%',
    border: '1px solid #D4D4D8',
    padding: 4,
    paddingHorizontal: 2,
  },
  boxRowWithGap: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
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

interface IRowTableCapexYearPdfProps {
  item: YearData;
}

const RowTableCapexYearPdf: FunctionComponent<IRowTableCapexYearPdfProps> = ({
  item,
}) => {
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#FFF',
          color: '#0B2543',
          width: '100%',
        }}
      >
        <View
          style={{
            ...styles.boxRowData,
            paddingHorizontal: 4,
            justifyContent: 'center',
            width: '25%',
          }}
        >
          <Text style={{ textAlign: 'left', fontSize: 8 }}>{item.name}</Text>
        </View>

        {item.years.map((year, index) => {
          return (
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
                    {formatterCurrency(year.expected)}{' '}
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
                      {formatterCurrency(year.accomplished)}{' '}
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
                    <Text style={{ width: '10%', textAlign: 'center' }}>|</Text>
                    <View style={{ width: '90%' }}>
                      <Text
                        style={{
                          ...styles.textRowDataAccomplished,
                          textAlign: 'right',
                          width: '100%',
                        }}
                      >
                        {`${formatterPercentagem(
                          year.accomplished,
                          year.expected
                        )} %`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default RowTableCapexYearPdf;
