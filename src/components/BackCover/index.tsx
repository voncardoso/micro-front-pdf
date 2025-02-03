'use client';
import { View, Text, StyleSheet, Font } from '@react-pdf/renderer';
import { FunctionComponent } from 'react';
import Template from '../Template';
import { IInformationsBlock } from '../../services/block/@types';
import { formatterDate } from '../../utils/formatterDate';
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
    marginBottom: 20,
    textAlign: 'justify',
  },
  date: {
    marginTop: 40,
    marginBottom: 20,
  },
  signature: {
    marginTop: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signatureText: {
    borderTop: '1px solid black',
    fontSize: 12,
    fontWeight: 'normal',
  },
});

interface IPdfObligationsProps {
  block?: IInformationsBlock;
}

const BackCover: FunctionComponent<IPdfObligationsProps> = ({ block }) => {
  return (
    <Template>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.title}>
          <Text>Apresentação</Text>
        </View>
        <View style={styles.paragraph}>
          <Text>
            Este relatório apresenta a análise dos investimentos e ações
            realizadas no âmbito do programa de concessões de saneamento,
            abrangendo o período de{' '}
            {`${
              block && formatterDate(block.dateOfContractSignature, 'MM/YYYY')
            } - ${block && formatterDate(block.lastInvestmentDate, 'MM/YYYY')}`}
            . O documento contempla as iniciativas implementadas pela
            concessionára através do processo licitatório, apresentando os dados
            referentes as metas de investimentos contratuais estabelecidas.
          </Text>
          <Text>
            As informações compiladas neste documento servem como base para a
            verificação do andamento da concessão conforme as metas contratuais
            estabelecidas, subsidiando o planejamento e as ações de
            fiscalização. A análise destes dados permite à agência reguladora e
            demais órgãos responsáveis, avaliar o cumprimento das obrigações
            contratuais e a conformidade com os marcos regulatórios do setor de
            saneamento.
          </Text>
          <Text>
            A estrutura do relatório está organizada em seções específicas que
            abordam:
          </Text>
          <Text>- Dado dos sistemas de água e esgoto</Text>
          <Text>- Evolução do programa de investimentos ao longo dos anos</Text>
          <Text>
            - Visualização referência contratuais e suas respectivas datas
          </Text>
          <Text>
            Assim, constituindo um instrumento de prestação de contas e
            acompanhamento da concessão, apresentando os dados do período
            analisado, sobre os investimentos registrados.
          </Text>
        </View>
      </View>
    </Template>
  );
};

export default BackCover;
