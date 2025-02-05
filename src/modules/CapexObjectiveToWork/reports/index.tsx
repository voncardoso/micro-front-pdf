import { View, Text } from '@react-pdf/renderer';
import { FunctionComponent } from 'react';
import RowTotalPdf from './RowTotal';
import RowTableCapexPdf, { TypeCapexPdf } from './RowTable';
import { ICapexObjectiveToWork } from '../../../services/objectiveToWork/@types';
import { styles } from './style';

interface ITableCapexPdfProps {
  tableExpected: ICapexObjectiveToWork[];
  tableNotExpected: ICapexObjectiveToWork[];
  tableNotExecuted: ICapexObjectiveToWork[];
  optionLineInvestiment: string;
  time: string;
  listGeneral: ICapexObjectiveToWork[];
  municipality?: string;
  title: string;
}

const HeaderTableCapexPdf: FunctionComponent = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#EFFAFF',
        color: '#0B2543',
      }}
    >
      <View style={{ ...styles.boxHeaderTable, width: '30%' }}>
        <Text style={styles.textHeaderTable}>Tópico</Text>
      </View>
      <View style={styles.boxHeaderTable}>
        <Text style={styles.textHeaderTable}>Previsto</Text>
      </View>
      <View style={styles.boxHeaderTable}>
        <Text style={styles.textHeaderTable}>Realizado</Text>
      </View>
      <View style={styles.boxHeaderTable}>
        <Text style={styles.textHeaderTable}>Resultado</Text>
      </View>
    </View>
  );
};

const TableCapexPdf: FunctionComponent<ITableCapexPdfProps> = ({
  listGeneral,
  tableExpected,
  tableNotExpected,
  tableNotExecuted,
  optionLineInvestiment,
  time,
  municipality,
  title,
}) => {
  return (
    <>
      <View wrap={false}>
        <View style={styles.title}>
          {municipality && <Text>{`${municipality}`}</Text>}
          <Text>{`${title} - ${optionLineInvestiment} | ${time}`}</Text>
        </View>

        <Text style={styles.subTitle}>
          Investimentos realizados previstos no CAPEX
        </Text>
        <View style={styles.boxTableCapex}>
          <HeaderTableCapexPdf></HeaderTableCapexPdf>
          {tableExpected.map((item, index) => {
            return (
              <RowTableCapexPdf key={index} item={item}></RowTableCapexPdf>
            );
          })}
          <RowTotalPdf
            accomplished={tableExpected.reduce(
              (acc, at) => acc + at.realized,
              0
            )}
            predicted={tableExpected.reduce((acc, at) => acc + at.expected, 0)}
          />
        </View>
      </View>
      <View wrap={false}>
        <Text style={styles.subTitle}>
          Investimentos realizados não previstos no CAPEX
        </Text>
        <View style={styles.boxTableCapex}>
          <HeaderTableCapexPdf></HeaderTableCapexPdf>
          {tableNotExpected.map((item, index) => {
            return (
              <RowTableCapexPdf
                key={index}
                item={item}
                type={TypeCapexPdf.NotExecuted}
              ></RowTableCapexPdf>
            );
          })}
          <RowTotalPdf
            type={TypeCapexPdf.NotExecuted}
            accomplished={tableNotExpected.reduce(
              (acc, at) => acc + at.realized,
              0
            )}
            predicted={tableNotExpected.reduce(
              (acc, at) => acc + at.expected,
              0
            )}
          />
        </View>
      </View>
      <View wrap={false}>
        <Text style={styles.subTitle}>
          Investimentos previstos no CAPEX não realizados
        </Text>
        <View style={styles.boxTableCapex}>
          <HeaderTableCapexPdf></HeaderTableCapexPdf>
          {tableNotExecuted.map((item, index) => {
            return (
              <RowTableCapexPdf
                key={index}
                item={item}
                type={TypeCapexPdf.NotExpected}
              ></RowTableCapexPdf>
            );
          })}
          <RowTotalPdf
            type={TypeCapexPdf.NotExpected}
            accomplished={tableNotExecuted.reduce(
              (acc, at) => acc + at.realized,
              0
            )}
            predicted={tableNotExecuted.reduce(
              (acc, at) => acc + at.expected,
              0
            )}
          />
        </View>
      </View>
      <View style={{ ...styles.boxTableCapex, marginTop: 8 }} wrap={false}>
        <RowTotalPdf
          general
          type={TypeCapexPdf.expectedCapex}
          accomplished={listGeneral.reduce((acc, at) => acc + at.realized, 0)}
          predicted={listGeneral.reduce((acc, at) => acc + at.expected, 0)}
        />
      </View>
    </>
  );
};

export default TableCapexPdf;
