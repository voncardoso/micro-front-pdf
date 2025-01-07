'use client';
import { Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';
import { FunctionComponent } from 'react';
import IconLogo from '../../assets/Logo';
import LogoAlagoas from '../../assets/LogoAlagoas';
Font.register({
  family: 'Nunito',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/nunito/v24/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshdTo3ig.ttf',
    },
    {
      src: 'https://fonts.gstatic.com/s/nunito/v24/XRXI3I6Li01BKofiOc5wtlZ2di8HDGUmdTo3ig.ttf',
      fontWeight: 'semibold',
    },
    {
      src: 'https://fonts.gstatic.com/s/nunito/v24/XRXI3I6Li01BKofiOc5wtlZ2di8HDFwmdTo3ig.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'https://fonts.gstatic.com/s/nunito/v24/XRXI3I6Li01BKofiOc5wtlZ2di8HDDsmdTo3ig.ttf',
      fontWeight: 800,
    },
    {
      src: 'https://fonts.gstatic.com/s/nunito/v24/XRXI3I6Li01BKofiOc5wtlZ2di8HDBImdTo3ig.ttf',
      fontWeight: 900,
    },
    {
      src: 'https://fonts.gstatic.com/s/nunito/v24/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshdTo3ig.ttf',
      fontWeight: 'normal',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingBottom: 30,
    fontSize: 12,
    fontFamily: 'Nunito',
    paddingHorizontal: 30,
  },
  schedule: {
    paddingHorizontal: 80,
    fontSize: 12,
    fontFamily: 'Nunito',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  body: {
    paddingBottom: 65,
    fontSize: 12,
    fontFamily: 'Nunito',
  },
  boxInfoname: {
    marginBottom: 30,
  },
  header: {
    paddingBottom: 20,
    marginTop: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 12,
  },
  boxText: {
    marginBottom: 15,
  },
  boxDate: {
    marginTop: 15,
    marginBottom: 30,
    fontSize: 12,
  },
  boxSignature: {
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: 10,
    borderTop: '1px solid #E4E4E7',
    paddingHorizontal: 33,
  },
  textFooter: {
    fontSize: 8,
    textAlign: 'center',
  },
  boxTextHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  scheduleTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
    marginBottom: 8,
  },
  scheduleText: {
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 6,
  },
  scheduleDate: {
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'semibold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#F5F5F5',
    color: '#0A518A',
  },
  boxSchedule: { display: 'flex', flexDirection: 'row', gap: 6, height: 120 },
  boxIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    backgroundColor: '#0A518A',
    width: '28',
    height: '28',
    borderRadius: '23.5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface IPdfObligationsProps {
  children: React.ReactNode;
  orientation?: 'landscape' | 'portrait';
}

const Template: FunctionComponent<IPdfObligationsProps> = ({
  children,
  orientation,
}) => {
  return (
    <Page orientation={orientation}>
      <View
        fixed
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            padding: 10,
            backgroundColor: '#0A518A',
          }}
        >
          <LogoAlagoas />
        </View>
      </View>
      <View style={styles.page}>
        <View style={styles.header} fixed>
          <IconLogo></IconLogo>
          <View style={styles.boxTextHeader}>
            <Text>Governo de Alagoas</Text>
            <Text>Observatório de Saneamento</Text>
          </View>
        </View>
        <View style={styles.body}>{children}</View>
      </View>
      <View style={styles.footer} fixed>
        <Text style={styles.textFooter} fixed>
          SEGOV - Secretaria de Governo | Rua Cincinato Pinto, s/n Centro - CEP
          57020-050 | Maceió - Alagoas (82) 9 8727-3991 |
          gabinete@segov.al.gov.b
        </Text>
      </View>
    </Page>
  );
};

export default Template;
