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
import { Children, FunctionComponent } from 'react';
import IconLogo from '../../assets/Logo';
import LogoAlagoas from '../../assets/LogoAlagoas';
import Template from '../Template';
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 12,
    fontWeight: 'normal',
    display: 'flex',
    gap: 10,
  },
});

interface IPdfObligationsProps {}

const BackCover: FunctionComponent<IPdfObligationsProps> = ({}) => {
  return (
    <>
      <Template>
        <View style={styles.title}>
          <Text>Apresentação</Text>
        </View>
        <View style={styles.paragraph}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            rhoncus nisi quis nunc pretium, ac tristique neque semper. In porta
            ornare metus, sit amet cursus tellus convallis vel. Quisque non sem
            eu eros iaculis porta non nec massa. Vestibulum laoreet imperdiet
            diam. Maecenas nisl ipsum, hendrerit vitae auctor in, sagittis non
            enim. Aliquam sit amet tortor eget purus porttitor aliquet nec sit
            amet ante. Donec a vestibulum nisl. Quisque vestibulum erat dui, sit
            amet suscipit felis auctor id. Maecenas sodales velit et efficitur
            condimentum. Mauris a sollicitudin ante, non tincidunt mi. Integer
            vestibulum sed erat sed hendrerit. Sed nec viverra nunc. Proin
            pellentesque scelerisque sollicitudin. Sed molestie, sem vel
            ullamcorper porttitor, ligula justo malesuada neque, at sodales
            dolor augue nec nibh. Nam diam erat, mattis quis ipsum non, luctus
            scelerisque metus. Etiam rutrum a nisi sit amet porta
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            rhoncus nisi quis nunc pretium, ac tristique neque semper. In porta
            ornare metus, sit amet cursus tellus convallis vel. Quisque non sem
            eu eros iaculis porta non nec massa. Vestibulum laoreet imperdiet
            diam. Maecenas nisl ipsum, hendrerit vitae auctor in, sagittis non
            enim. Aliquam sit amet tortor eget purus porttitor aliquet nec sit
            amet ante. Donec a vestibulum nisl. Quisque vestibulum erat dui, sit
            amet suscipit felis auctor id. Maecenas sodales velit et efficitur
            condimentum. Mauris a sollicitudin ante, non tincidunt mi. Integer
            vestibulum sed erat sed hendrerit. Sed nec viverra nunc. Proin
            pellentesque scelerisque sollicitudin. Sed molestie, sem vel
            ullamcorper porttitor, ligula justo malesuada neque, at sodales
            dolor augue nec nibh. Nam diam erat, mattis quis ipsum non, luctus
            scelerisque metus. Etiam rutrum a nisi sit amet porta
          </Text>
        </View>
        <View></View>
      </Template>
    </>
  );
};

export default BackCover;
