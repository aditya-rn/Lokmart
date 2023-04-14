import {StyleSheet, View, Dimensions} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import {themeColors} from '../constants/styles/ThemeColors';

export default CheckBox = ({isChecked = false, onPress}) => {
  return (
    <View style={[styles.mainDiv, !isChecked && styles.boxOutline]}>
      {isChecked && (
        <Icon
          name="checkmark-sharp"
          size={20}
          color={'white'}
          style={styles.icon}
        />
      )}
      {isChecked && (
        <Svg height={'100%'} width={'100%'}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="90%" y2="90%">
              <Stop offset="0" stopColor={themeColors.activeDotColor1} />
              <Stop offset="5" stopColor={themeColors.activeDotColor2} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    height: Dimensions.get('screen').height * 0.025,
    width: Dimensions.get('screen').height * 0.025,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    zIndex: 2,
  },
  boxOutline: {
    borderWidth: 2,
    borderColor: themeColors.orange,
  },
});
