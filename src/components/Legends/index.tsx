import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  legend: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
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

  labelInformation: {
    width: '10px',
    height: '10px',
  },
});
interface ILegendsProps {
  legends: {
    name: string;
    color: string;
  }[];
  alignItems?: 'flex-start' | 'flex-end' | 'center';
}

const Legends = ({ legends, alignItems }: ILegendsProps) => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          alignItems: alignItems,
          justifyContent: 'flex-start',
          position: 'absolute',
          width: '100%',
        }}
      >
        <View style={styles.legend}>
          {legends.map((legend, index) => {
            return (
              <View style={styles.boxLegend} key={index}>
                <View
                  style={{
                    ...styles.labelInformation,
                    backgroundColor: legend.color,
                  }}
                ></View>
                <Text style={styles.legendText}>{legend.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Legends;
