import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { FunctionComponent } from 'react';
import { TypeCapexPdf, checkType } from '../RowTable';
import IconArrow from '../../../../assets/icons/Arrow';
import IconArrowUp from '../../../../assets/icons/ArrowUp';
import { formatterCurrency } from '../../../../utils/formatterCurrency';
import { formatterPercentagem } from '../../../../utils/formatterPercentagem';
import { ECurrency } from '../../../../enums/currency.enum';

const styles = StyleSheet.create({
  boxRowTotal: {
    display: 'flex',
    flexDirection: 'row',
    color: '#0B2543',
    fontWeight: 'bold',
  },
  boxRowData: {
    width: '23%',
    border: '1px solid #D4D4D8',
    flexGrow: 1,
    padding: 4,
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
});

interface IRowTotalPdfProps {
  accomplished: number;
  predicted: number;
  type?: TypeCapexPdf;
  general?: boolean;
}

export const getIconSuperavitOrDeficit = (
  previsto: number,
  realized: number
) => {
  return previsto - realized > 0 ? <IconArrow /> : <IconArrowUp />;
};

const RowTotalPdf: FunctionComponent<IRowTotalPdfProps> = ({
  accomplished,
  predicted,
  type,
  general = false,
}) => {
  return (
    <>
      <View
        style={{
          backgroundColor: general ? '#FDE9C8' : '#F5F5F5',
          ...styles.boxRowTotal,
        }}
      >
        <View style={{ ...styles.boxRowData, width: '30%' }}>
          <Text style={{ textAlign: 'left', fontSize: 8 }}>Total</Text>
        </View>
        <View style={styles.boxRowData}>
          {checkType(TypeCapexPdf.NotExpected, type) && (
            <View style={{ width: '90%' }}>
              <Text style={styles.textRowData}>
                {formatterCurrency(predicted)}{' '}
              </Text>
            </View>
          )}
        </View>
        <View style={{ ...styles.boxRowData, ...styles.boxRowWithGap }}>
          {checkType(TypeCapexPdf.NotExecuted, type) && (
            <>
              <View style={{ width: '60%' }}>
                <Text style={styles.textRowData}>
                  {formatterCurrency(accomplished)}{' '}
                </Text>
              </View>
              {!type && (
                <View
                  style={{ width: '40%', fontSize: 8, ...styles.boxRowWithGap }}
                >
                  <Text style={{ width: '35%', textAlign: 'center' }}>|</Text>
                  <View style={{ width: '65%' }}>
                    <Text style={{ textAlign: 'right', width: '90%' }}>
                      {`${formatterPercentagem(accomplished, predicted)} %`}
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
        <View style={{ ...styles.boxRowData, ...styles.boxRowWithGap }}>
          {!type && (
            <>
              {' '}
              <View style={{ width: '80%' }}>
                <Text style={styles.textRowData}>
                  {formatterCurrency(
                    accomplished - predicted,
                    ECurrency.BRL,
                    true
                  )}{' '}
                </Text>
              </View>
              {!type && (
                <View style={{ width: '20%' }}>
                  {getIconSuperavitOrDeficit(predicted, accomplished)}
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default RowTotalPdf;
