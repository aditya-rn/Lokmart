import {NativeModules, Platform, StyleSheet} from 'react-native';
import {themeColors} from './ThemeColors';
const StatusBarHeight = NativeModules.StatusBarManager.HEIGHT;

export default CommonStyles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  pageStyle: {
    paddingTop: StatusBarHeight,
    backgroundColor: themeColors.primaryBackground,
  },
  normalHeading: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 20,
    color: themeColors.primaryBlack,
  },
  loaderStyleBig: {
    paddingVertical: 15,
    // backgroundColor: 'yellow',
  },
  loaderStyleSmall: {
    paddingVertical: 5,
    // backgroundColor: 'yellow',
  },
  errorText: {
    marginHorizontal: '8%',
    fontFamily: FontFamilies.primaryFontsMedium,
    fontSize: 16,
    color: themeColors.primaryColorDark,
  },
  floatingButton: {
    position: 'absolute',
    bottom: Platform.OS == 'android' ? '7.5%' : '4%',
  },
  flatListWithBottomPadding: {
    paddingBottom: '35%',
  },
});
