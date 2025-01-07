import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
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
