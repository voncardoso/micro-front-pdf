'use client';
import {
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Path,
  Svg,
  Ellipse,
} from '@react-pdf/renderer';
import { FunctionComponent } from 'react';
import IconLogo from '../../assets/Logo';
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
    fontSize: 12,
    fontFamily: 'Nunito',
  },
  body: {
    marginBottom: 100,
    paddingBottom: 65,
    paddingHorizontal: 50,
    fontSize: 12,
    fontFamily: 'Nunito',
  },
});

interface IPdfObligationsProps {
  concessionarieName: string;
  title: string;
  period: string;
}

const Cover: FunctionComponent<IPdfObligationsProps> = ({
  concessionarieName,
  title,
  period,
}) => {
  return (
    <>
      <Page style={styles.page}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            height: '100%',
            right: 0,
          }}
        >
          <Svg width="153" height="842" viewBox="0 0 153 842" fill="none">
            <Path d="M0.5 -2.5H153.5V842.5H0.5V-2.5Z" fill="#0A518A" />
          </Svg>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 41,
            right: 33,
          }}
        >
          <Svg width="201" height="198" viewBox="0 0 201 198" fill="none">
            <Ellipse
              cx="99.25"
              cy="98.5075"
              rx="98.75"
              ry="98.5075"
              fill="white"
            />
            <Path
              d="M84.5938 27.5734C64.9271 31.5636 43.7604 48.1893 35.0938 66.4776C18.5938 101.392 31.7604 142.956 65.4271 161.078C108.76 184.52 162.76 157.753 170.594 109.04C178.427 59.9936 133.927 17.9305 84.5938 27.5734ZM95.0938 56.6685C93.5938 64.6488 98.7604 76.2868 106.094 80.7758C116.76 87.2598 133.927 83.6021 139.26 73.9592C140.927 70.6341 141.26 70.4678 142.76 73.1279C143.594 74.6242 144.427 79.9445 144.427 84.9322C144.76 116.687 107.26 133.812 83.7604 112.697C66.2604 96.9027 66.4271 72.1304 84.0938 57.001C93.5938 49.0206 96.4271 48.8544 95.0938 56.6685Z"
              fill="#0A518A"
            />
          </Svg>
        </View>
        <View style={{ position: 'absolute', top: 33, left: 31 }}>
          <IconLogo></IconLogo>
        </View>
        <View
          style={{
            height: '100vh',
            width: '65vw',
            display: 'flex',
            justifyContent: 'flex-end',
            textAlign: 'right',
            fontWeight: 'bold',
            fontSize: 24,
            color: '#0A518A',
            marginBottom: 47,
          }}
        >
          <Text>{concessionarieName}</Text>
          <Text style={{ fontWeight: 'normal' }}>{title}</Text>
          <Text>{period}</Text>
        </View>
      </Page>
    </>
  );
};

export default Cover;
