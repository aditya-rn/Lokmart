import {StyleSheet, Text} from 'react-native';
import FontFamilies from '../constants/styles/FontFamilies';
import {themeColors} from '../constants/styles/ThemeColors';

export default Heading = ({text, isCenter = true, containerStyles}) => (
  <Text
    style={[
      styles.greetings,
      isCenter && {textAlign: 'center'},
      containerStyles,
    ]}>
    {text}
  </Text>
);
const styles = StyleSheet.create({
  greetings: {
    fontFamily: FontFamilies.primaryFontsBold,
    fontSize: 24,
    letterSpacing: 1,
    color: themeColors.primaryBlack,
    lineHeight: 34,
  },
});
