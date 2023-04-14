import {StyleSheet} from 'react-native';
import FontFamilies from '../../../constants/styles/FontFamilies';
import {themeColors} from '../../../constants/styles/ThemeColors';

export default OnboardingStyles = StyleSheet.create({
  curvedBackground: {
    height: '55.6%',
    width: '100%',
  },
  ilustrationDiv: {
    height: '55.6%',
    width: '100%',
    padding: '10%',
    paddingTop: '5%',
  },
  greetings: {
    fontFamily: FontFamilies.primaryFontsBold,
    alignSelf: 'center',
    fontSize: 24,
    letterSpacing: 1,
    color: themeColors.primaryBlack,
    textAlign: 'center',
    lineHeight: 34,
  },
  subText: {
    fontFamily: FontFamilies.primaryFontsRegular,
    alignSelf: 'center',
    marginTop: '4%',
    fontSize: 16,
    width: '70%',
    textAlign: 'center',
    lineHeight: 20,
    color: themeColors.primaryBlack,
  },
});
