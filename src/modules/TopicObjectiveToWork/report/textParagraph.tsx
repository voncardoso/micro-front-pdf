import { Text, View } from '@react-pdf/renderer';
import { styles } from './styles';

export const TextDonuts = () => {
  return (
    <View style={styles.paragraph}>
      <Text>
        Os gráficos apresentados demonstram a relação entre os valores previstos
        e realizados referentes aos investimentos em infraestrutura operacional.
        A visualização em formato donut permite uma clara comparação entre o
        planejamento financeiro e sua execução efetiva, facilitando o
        entendimento do progresso dos investimentos realizados.
      </Text>
      <Text>
        A apresentação contempla dois horizontes temporais distintos: a previsão
        total até o final da concessão e a previsão parcial até o ano corrente.
        Esta dupla perspectiva temporal possibilita uma visão abrangente do
        planejamento financeiro, permitindo acompanhar tanto os objetivos de
        longo prazo quanto o andamento atual dos investimentos. Os percentuais e
        valores apresentados refletem a proporção entre o montante previsto e o
        efetivamente realizado, constituindo uma importante ferramenta de
        monitoramento e transparência na gestão dos recursos.
      </Text>
      <Text>
        Esta visualização contribui para o acompanhamento sistemático da
        execução financeira do projeto, oferecendo uma perspectiva clara sobre a
        aplicação dos recursos destinados ao desenvolvimento da infraestrutura.
        A apresentação gráfica facilita a compreensão do status atual dos
        investimentos, sendo um instrumento relevante para a gestão e o controle
        do planejamento estabelecido.
      </Text>
    </View>
  );
};

export const TextLine = () => {
  return (
    <View style={styles.paragraph}>
      <Text>
        O gráfico de linha apresentado demonstra a evolução temporal dos
        investimentos, comparando os valores previstos (CAPEX) e realizados ao
        longo do período analisado. Esta visualização permite acompanhar a
        dinâmica dos investimentos em uma perspectiva cronológica, facilitando a
        compreensão do fluxo financeiro ao longo do tempo.
      </Text>
      <Text>
        A representação gráfica utiliza duas linhas distintas que ilustram
        paralelamente o comportamento dos valores planejados e executados. Esta
        abordagem visual possibilita uma clara percepção da evolução dos
        investimentos, permitindo observar as variações e tendências ao longo
        dos períodos apresentados. O eixo vertical apresenta os valores
        monetários em reais, enquanto o eixo horizontal demonstra a progressão
        temporal em anos.
      </Text>
      <Text>
        A visualização contribui para o monitoramento contínuo da execução
        financeira, oferecendo uma perspectiva longitudinal do desenvolvimento
        dos investimentos. Esta forma de apresentação dos dados permite uma
        compreensão objetiva da distribuição dos recursos ao longo do tempo,
        constituindo uma importante ferramenta para o acompanhamento da execução
        orçamentária e financeira do projeto
      </Text>
    </View>
  );
};
