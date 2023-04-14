import {useNavigation} from '@react-navigation/native';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {themeColors} from '../constants/styles/ThemeColors';
import IconButton from './IconButton';

const dimension = Dimensions.get('screen');
export default PageHeading = ({
  isBackAvailable,
  rightFirstButtonName,
  rightSecondButtonName,
  onRightFirstButtonPress,
  onSecondFirstButtonPress,
  pageHeading,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headingBar}>
      <View style={styles.leftHeadingItems}>
        {!!isBackAvailable && (
          <IconButton
            name={'arrow-back'}
            color={themeColors.primaryBlack}
            size={30}
            onPress={() => navigation.goBack()}
          />
        )}
        {!!pageHeading && <Text style={styles.pageHeading}>{pageHeading}</Text>}
      </View>
      <View style={[styles.headingBar, styles.subDiv]}>
        {!!rightSecondButtonName && (
          <IconButton
            name={rightSecondButtonName}
            color={themeColors.primaryBlack}
            size={30}
            containerStyles={styles.iconContainerStyle}
            onPress={onSecondFirstButtonPress}
          />
        )}
        {!!rightFirstButtonName && (
          <IconButton
            name={rightFirstButtonName}
            color={themeColors.primaryBlack}
            size={30}
            onPress={onRightFirstButtonPress}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: '7%',
    paddingVertical: dimension.height * 0.01,
  },
  subDiv: {
    marginHorizontal: 0,
  },
  iconContainerStyle: {
    marginHorizontal: '3%',
  },
  pageHeading: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 24,
    color: themeColors.primaryBlack,
    marginHorizontal: '5%',
  },
  leftHeadingItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
