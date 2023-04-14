import {Text, StyleSheet, View} from 'react-native';
import {themeColors} from '../../constants/styles/ThemeColors';

export default SeperatorLine = ({
  color = themeColors.primaryGray,
  width = '100%',
  style,
}) => {
  return (
    <View
      style={[
        styles.mainDiv,
        {backgroundColor: color, width: width, height: 1},
        {...style},
      ]}></View>
  );
};
const styles = StyleSheet.create({});
