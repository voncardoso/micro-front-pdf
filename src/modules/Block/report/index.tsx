import { Text, View } from '@react-pdf/renderer';
import '../../../utils/fontRegister';
import { IInformationsBlock } from '../../../services/block/@types';
import ImgBlock from '../../../components/ImgBlock';
import { IMunicipality } from '../../../services/municipality/@types';
import { styles } from './style';
import { formatterCurrency } from '../../../utils/formatterCurrency';

interface IProps {
  data?: IInformationsBlock;
  idblock: number;
  municipality?: IMunicipality[];
}

export const InformationsBlock: React.FC<IProps> = ({
  data,
  idblock,
  municipality,
}: IProps) => {
  console.log(municipality);
  console.log(data);
  return (
    <View style={{}}>
      <View>
        <Text style={styles.title}>Visão Geral do bloco {data?.name}</Text>
      </View>
      <View style={styles.containerInformation}>
        <View style={styles.boxInformation}>
          <Text style={styles.textInformation}>{data?.concessionaire}</Text>
          <Text style={styles.labelInformation}>Concessionária</Text>
        </View>
        <View style={styles.boxInformation}>
          <Text style={styles.textInformation}>
            {formatterCurrency(data?.waterInvestment.realized || 0)}
          </Text>
          <Text style={styles.labelInformation}>
            {' '}
            Investimento Total para Água
          </Text>
        </View>
        <View style={styles.boxInformation}>
          <Text style={styles.textInformation}>{data?.population}</Text>
          <Text style={styles.labelInformation}>População</Text>
        </View>
        <View style={styles.boxInformation}>
          <Text style={styles.textInformation}>
            {formatterCurrency(data?.sewageInvestment.realized || 0)}
          </Text>
          <Text style={styles.labelInformation}>
            {' '}
            Investimento Total para Esgoto
          </Text>
        </View>
        <View style={styles.boxInformation}>
          <Text style={styles.textInformation}>
            {data?.numberOfMunicipalities}
          </Text>
          <Text style={styles.labelInformation}> N° de municípios</Text>
        </View>
        <View style={styles.boxInformation}>
          <Text style={styles.textInformation}>
            {formatterCurrency(data?.totalExpectedInvestment || 0)}
          </Text>
          <Text style={styles.labelInformation}>
            {' '}
            Investimento Total Previsto
          </Text>
        </View>
      </View>
      <ImgBlock idBlock={idblock}></ImgBlock>
      <View style={styles.municipality}>
        <Text style={styles.title}>POPULAÇÃO MUNICÍPIOS</Text>
        <View style={styles.containerMunicipality}>
          {municipality
            ?.filter((e) => e.block.id === idblock)
            .map((municipality, index) => {
              return (
                <View key={index} style={styles.boxMunicipality}>
                  <Text style={styles.textMunicipality}>
                    {municipality.name}
                  </Text>
                  <Text style={styles.labelMunicipality}>
                    {municipality.population}
                  </Text>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
};
