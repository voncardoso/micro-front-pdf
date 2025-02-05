import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  legend: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    marginTop: 4,
    gap: 6,
  },
  boxLegend: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  legendText: {
    fontSize: 9,
  },
  legendCategory: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  labelInformation: {
    width: '10px',
    height: '10px',
  },
});
interface ILegendsProps {
  legends: string[];
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  categories: string[];
}

const LegendsChart = ({ legends, categories, alignItems }: ILegendsProps) => {
  return (
    <View>
      <View style={{ ...styles.legend, justifyContent: alignItems }}>
        {legends.map((legend, index) => {
          return (
            <View style={styles.boxLegend} key={index}>
              <Text style={styles.legendCategory}>{categories[index]} : </Text>
              <Text style={styles.legendText}>{legend}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default LegendsChart;
