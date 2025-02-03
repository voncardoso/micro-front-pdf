import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
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
    paddingHorizontal: 30,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 4,
  },
  boxHeaderTable: {
    width: '23%',
    border: '1px solid #D4D4D8',
    flexGrow: 1,
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 4,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  paragraph: {
    fontSize: 12,
    fontWeight: 'normal',
    display: 'flex',
    gap: 10,
    marginVertical: 20,
  },
});
