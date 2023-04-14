import {StyleSheet, Text} from 'react-native';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';

export default InputBarError = ({error}) => (
  <Text style={styles.usernameError}>{error}</Text>
);

const styles = StyleSheet.create({
  usernameError: {
    fontSize: 14,
    fontFamily: FontFamilies.primaryFontsRegular,
    marginHorizontal: '10%',
    color: themeColors.invalidField,
  },
});
