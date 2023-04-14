import {Text, StyleSheet} from 'react-native';
import FontFamilies from '../constants/styles/FontFamilies';
import {themeColors} from '../constants/styles/ThemeColors';

export default TermsAndConditions = () => {
  return (
    <Text style={styles.mainDiv}>
      <Text style={styles.simpleText}>
        By Tapping "Sign up" you accept our{' '}
      </Text>
      <Text style={styles.buttonText}>terms</Text>
      <Text style={styles.simpleText}> and </Text>
      <Text style={styles.buttonText}>conditions</Text>
    </Text>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '4%',
    flex: 1,
  },
  simpleText: {
    fontFamily: FontFamilies.primaryFontsMedium,
    color: themeColors.inputbarIcon,
    fontSize: 18,
  },
  buttonText: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    color: themeColors.primaryColor,
    fontSize: 18,
  },
});
