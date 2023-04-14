import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import FontFamilies from '../constants/styles/FontFamilies';
import {themeColors} from '../constants/styles/ThemeColors';

export default GradientButton = ({
  onPress,
  title,
  height,
  width,
  containerStyle,
  iconName,
  iconStyle,
  iconSize,
  iconColor,
  imageUri,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.mainDiv,
        {height, width},
        pressed && {opacity: 0.5},
        containerStyle,
      ]}>
      <Svg
        height={!!height ? height : Dimensions.get('screen').height * 0.079}
        width={!!width ? width : Dimensions.get('screen').width * 0.8}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="90%" y2="90%">
            <Stop offset="0" stopColor={themeColors.activeDotColor1} />
            <Stop offset="5" stopColor={themeColors.activeDotColor2} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <View style={styles.buttonContentDiv}>
        {!!iconName && (
          <Icon
            name={iconName}
            color={iconColor}
            size={iconSize}
            style={[{marginHorizontal: 5}, iconStyle]}
          />
        )}
        {!!imageUri && (
          <Image
            source={imageUri}
            style={styles.imageIcon}
            resizeMode="contain"
          />
        )}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContentDiv: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FontFamilies.primaryFontsExtraBold,
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    color: 'white',
    textAlignVertical: 'center',
  },
  imageIcon: {
    height: '35%',
    width: '10%',
    marginHorizontal: 5,
    // backgroundColor: 'yellow',
  },
});
