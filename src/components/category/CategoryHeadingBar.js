import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';

export default CategoryHeadingBar = ({
  category,
  onPress,
  disableRightButton = false,
  style,
}) => {
  return (
    <View style={[styles.mainDiv, style]}>
      <Text style={styles.categoryText}>{category}</Text>
      {!disableRightButton && (
        <Pressable
          style={({pressed}) => [
            styles.mainDiv,
            {marginHorizontal: 0},
            pressed && {
              opacity: 0.5,
            },
          ]}>
          <Text style={styles.rightButtonText}>Show all</Text>
          <Icon
            name="caret-forward"
            color={themeColors.primaryColorDark}
            size={15}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    // backgroundColor: 'red',
    marginHorizontal: Platform.OS == 'android' ? '6%' : '8%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontFamily: FontFamilies.primaryFontsBold,
    fontSize: 24,
    letterSpacing: 1,
    color: themeColors.primaryBlack,
    lineHeight: 34,
  },
  rightButtonText: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 18,
    letterSpacing: 1,
    color: themeColors.primaryColorDark,
    lineHeight: 34,
  },
});
