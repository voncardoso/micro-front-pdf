import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  containerInformation: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  boxInformation: {
    width: '50%',
    marginVertical: 6,
  },
  textInformation: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0B2543',
  },
  labelInformation: {
    fontSize: '10px',
    color: '#71717A',
  },
  municipality: {
    marginVertical: 6,
  },
  containerMunicipality: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 2,
  },
  boxMunicipality: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  textMunicipality: {
    fontSize: '10px',
    color: '#71717A',
  },
  labelMunicipality: {
    color: '#0B2543',
    fontSize: '10px',
  },
});
