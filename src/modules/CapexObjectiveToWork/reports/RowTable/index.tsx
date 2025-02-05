import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { FunctionComponent } from 'react';
import { getIconSuperavitOrDeficit } from '../RowTotal';
import { ICapexObjectiveToWork } from '../../../../services/objectiveToWork/@types';
import { formatterCurrency } from '../../../../utils/formatterCurrency';
import { formatterPercentagem } from '../../../../utils/formatterPercentagem';
import { ECurrency } from '../../../../enums/currency.enum';

const styles = StyleSheet.create({
  boxRowData: {
    width: '100%',
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

interface IRowTableCapexPdfProps {
  item: ICapexObjectiveToWork;
  type?: TypeCapexPdf;
}

export enum TypeCapexPdf {
  expectedCapex = 0,
  NotExpected = 1,
  NotExecuted = 2,
}

export function checkType(
  TypeCapex: TypeCapexPdf,
  type?: TypeCapexPdf
): boolean {
  if (!type) return true;
  if (type === TypeCapex) return true;
  return false;
}

const RowTableCapexPdf: FunctionComponent<IRowTableCapexPdfProps> = ({
  item,
  type,
}) => {
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#FFF',
          color: '#0B2543',
        }}
      >
        <View style={{ ...styles.boxRowData, width: '30%' }}>
          <Text style={{ textAlign: 'left', fontSize: 8 }}>{item.topic}</Text>
        </View>
        <View style={{ ...styles.boxRowData, width: '23%' }}>
          {checkType(TypeCapexPdf.NotExpected, type) && (
            <View style={{ width: '90%' }}>
              <Text style={styles.textRowData}>
                {formatterCurrency(item.expected)}{' '}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            ...styles.boxRowData,
            width: '23%',
            ...styles.boxRowWithGap,
          }}
        >
          {checkType(TypeCapexPdf.NotExecuted, type) && (
            <>
              <View style={{ width: '60%' }}>
                <Text style={styles.textRowData}>
                  {formatterCurrency(item.realized)}{' '}
                </Text>
              </View>
              {!type && (
                <View
                  style={{ width: '40%', fontSize: 8, ...styles.boxRowWithGap }}
                >
                  <Text style={{ width: '35%', textAlign: 'center' }}>|</Text>
                  <View style={{ width: '65%' }}>
                    <Text style={{ textAlign: 'right', width: '90%' }}>
                      {`${formatterPercentagem(
                        item.realized,
                        item.expected
                      )} %`}
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
        <View
          style={{
            ...styles.boxRowData,
            ...styles.boxRowWithGap,
            width: '23%',
          }}
        >
          {!type && (
            <>
              <View style={{ width: '80%' }}>
                <Text style={styles.textRowData}>
                  {formatterCurrency(
                    item.expected - item.realized,
                    ECurrency.BRL,
                    true
                  )}{' '}
                </Text>
              </View>
              <View style={{ width: '20%' }}>
                {getIconSuperavitOrDeficit(item.expected, item.realized)}
              </View>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default RowTableCapexPdf;
