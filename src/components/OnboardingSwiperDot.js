import {StyleSheet, View} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {themeColors} from '../constants/styles/ThemeColors';

export default OnboardingSwiperDot = ({isActive = false}) => {
  return (
    // <View style={[isActive ? styles.activeMainDiv : styles.inactiveMainDiv]}>
    isActive ? (
      <Svg height="100%" width="100%">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="90%" y2="90%">
            <Stop offset="0" stopColor={themeColors.activeDotColor1} />
            <Stop offset="1" stopColor={themeColors.activeDotColor2} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    ) : (
      <View style={styles.inactiveMainDiv}></View>
    )
    // </View>
  );
};
const styles = StyleSheet.create({
  inactiveMainDiv: {
    flex: 1,
    backgroundColor: themeColors.inactiveDotColor1,
  },
});
