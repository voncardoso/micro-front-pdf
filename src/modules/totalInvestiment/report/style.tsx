import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  containerChart: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chart: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  text1: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 10,
  },
  text2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    width: '100%',
  },
  text3: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-0%, -15%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  labelSecundary: {
    fontSize: 12,
    color: '#71717A',
  },
  title: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    textAlign: 'center',
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
