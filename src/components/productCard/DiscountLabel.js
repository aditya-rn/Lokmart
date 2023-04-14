import {Text, StyleSheet, View, Dimensions} from 'react-native';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';
const dimensions = Dimensions.get('screen');
export default DiscountLabel = ({isSmall = true, discount, style}) => {
  return (
    <Text style={[styles.mainDiv, !isSmall && styles.bigDiv, {...style}]}>
      {parseInt(discount)}% off
    </Text>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: themeColors.primaryColorDark,
    width: dimensions.width * 0.17,
    fontFamily: FontFamilies.primaryFontsBold,
    color: themeColors.primaryBackground,
    letterSpacing: -0.06,
    fontSize: 12,
    textAlign: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    textTransform: 'uppercase',
    paddingVertical: '1.5%',
  },
  bigDiv: {
    backgroundColor: themeColors.primaryColorDark,
    width: dimensions.width * 0.15,
    fontFamily: FontFamilies.primaryFontsMedium,
    color: themeColors.primaryBackground,
    letterSpacing: 0,
    fontSize: 14,
    paddingVertical: '10%',
  },
});
