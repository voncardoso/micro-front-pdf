import { View } from 'lucide-react';
import { styles } from './style';
import { Text } from '@react-pdf/renderer';

const TextChartMunicipality = () => {
  return (
    <View style={{ ...styles.paragraph, marginTop: 0, paddingTop: 0 }}>
      <Text>
        O gráfico apresenta o panorama dos investimentos relacionados ao
        canteiro de obras, demonstrando a relação entre os valores previstos e
        realizados no período. Esta visualização permite acompanhar a execução
        financeira das obras planejadas, oferecendo uma perspectiva clara sobre
        o andamento dos investimentos em infraestrutura.
      </Text>
      <Text>
        O acompanhamento destes indicadores é fundamental para a gestão
        eficiente dos recursos e cumprimento das metas estabelecidas no contrato
        de concessão. A comparação entre o previsto e realizado auxilia na
        avaliação do progresso das obras e na identificação de eventuais
        necessidades de ajustes no planejamento, contribuindo para a
        transparência e efetividade na prestação dos serviços de saneamento.
      </Text>
    </View>
  );
};

export default TextChartMunicipality;
