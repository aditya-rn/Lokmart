import {Pressable} from 'react-native';

export default CustomButton = ({onPress, style, children}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [style, pressed && {opacity: 0.5}]}>
    {children}
  </Pressable>
);
