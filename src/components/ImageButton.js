import {Pressable, Image} from 'react-native';

export default ImageButton = ({source, containerStyle, ImageStyle}) => {
  return (
    <Pressable style={[{...containerStyle}]}>
      <Image source={source} style={[{...ImageStyle}]} />
    </Pressable>
  );
};
