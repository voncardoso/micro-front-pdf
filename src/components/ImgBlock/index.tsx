import { Image, View } from '@react-pdf/renderer';
import BlockA from '../../assets/blockA.png';
import BlockB from '../../assets/blockB.png';
import BlockC from '../../assets/blockC.png';

const ImgBlock = ({ idBlock }: { idBlock: number }) => {
  const block: { [key: number]: string } = {
    1: BlockA,
    2: BlockB,
    3: BlockC,
  };
  return (
    <View style={{ marginVertical: 6 }}>
      <Image src={block[idBlock] || BlockA}></Image>
    </View>
  );
};

export default ImgBlock;
