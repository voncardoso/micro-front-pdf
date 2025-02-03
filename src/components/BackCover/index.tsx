'use client';
import { View, Text, StyleSheet, Font } from '@react-pdf/renderer';
import { FunctionComponent } from 'react';
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

interface IPdfObligationsProps {}

const BackCover: FunctionComponent<IPdfObligationsProps> = ({}) => {
  return (
    <Template>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.title}>
          <Text>Apresentação</Text>
        </View>
        <View style={styles.paragraph}>
          <Text>
            Este relatório apresenta uma análise detalhada dos investimentos e
            avanços realizados no âmbito do programa de concessões, demonstrando
            o compromisso com a transparência e o desenvolvimento sustentável
            dos serviços públicos concedidos. O documento contempla as
            iniciativas implementadas pelas concessionárias vencedoras do
            processo licitatório, evidenciando o cumprimento das metas
            estabelecidas e o progresso alcançado nos objetivos contratuais.
          </Text>
          <Text>
            Através de uma abordagem técnica e objetiva, este documento
            consolida informações essenciais sobre a execução dos projetos,
            incluindo dados financeiros, cronogramas de implementação e
            indicadores de desempenho. São apresentados os resultados das ações
            executadas, demonstrando o alinhamento com as diretrizes
            estabelecidas no edital de licitação e o impacto positivo gerado
            para a sociedade.
          </Text>
          <Text>
            O conteúdo aqui apresentado reflete o compromisso das
            concessionárias com a excelência na prestação de serviços e a
            responsabilidade na gestão dos recursos investidos. Este relatório
            serve como instrumento de prestação de contas e acompanhamento,
            permitindo uma visão clara e abrangente dos avanços obtidos no
            período, bem como dos desafios enfrentados e das estratégias
            adotadas para superá-los. As informações compiladas neste documento
            são fundamentais para a avaliação do progresso das concessões e para
            o planejamento de ações futuras, visando a contínua melhoria dos
            serviços prestados à população.
          </Text>
        </View>
      </View>
    </Template>
  );
};

export default BackCover;
