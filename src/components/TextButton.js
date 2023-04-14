import {Text, Pressable} from 'react-native';
import {themeColors} from '../constants/styles/ThemeColors';

export default TextButton = ({onPress, text, style, inUnderlined}) => {
  return (
    <Pressable
      style={({pressed}) => [
        inUnderlined && {
          borderBottomColor: themeColors.primaryColor,
          borderBottomWidth: 1,
        },
        pressed && {
          opacity: 0.5,
        },
      ]}
      onPress={onPress}>
      <Text style={[style]}>{text}</Text>
    </Pressable>
  );
};
