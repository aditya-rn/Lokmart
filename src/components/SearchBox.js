import {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontFamilies from '../constants/styles/FontFamilies';
import {themeColors} from '../constants/styles/ThemeColors';

export default SearchBox = ({
  cancelSearch,
  saveSearch,
  onChangeText,
  searchModeHandler,
  searchText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusHandler = () => {
    setIsFocused(true);
    searchModeHandler();
  };

  const onChangeTextHandler = text => {
    onChangeText(text);
  };

  const onSubmitEditingHandler = () => {
    saveSearch(searchText);
  };

  const onCancelSearchHandler = () => {
    cancelSearch();
  };

  return (
    <View
      style={[
        styles.mainDiv,
        isFocused && {
          borderColor: themeColors.primaryColorDark,
          borderWidth: 2,
        },
      ]}>
      <Icon
        name="search"
        style={styles.iconStyle}
        size={25}
        color={
          isFocused ? themeColors.primaryColorDark : themeColors.inputbarIcon
        }
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor={themeColors.inputbarIcon}
        onFocus={focusHandler}
        onBlur={() => setIsFocused(false)}
        cursorColor={themeColors.primaryColorDark}
        onChangeText={onChangeTextHandler}
        onSubmitEditing={onSubmitEditingHandler}
        value={searchText}
      />
      <Pressable
        style={({pressed}) => [styles.closeIconDiv, pressed && {opacity: 0.5}]}
        onPress={onCancelSearchHandler}>
        <Icon
          name="close"
          style={[styles.iconStyle, {marginRight: '2%'}]}
          size={25}
          color={
            isFocused ? themeColors.primaryColorDark : themeColors.inputbarIcon
          }
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    width: Dimensions.get('screen').width * 0.66,
    // height: Dimensions.get('screen').height * 0.065,
    borderWidth: Platform.OS == 'android' ? 1 : 0.7,
    borderRadius: 14,
    borderColor: themeColors.inputbarIcon,
    overflow: 'hidden',
    flexDirection: 'row',
    paddingHorizontal: '2%',
  },
  iconStyle: {
    marginHorizontal: '6%',
    alignSelf: 'center',
  },
  searchInput: {
    fontFamily: FontFamilies.primaryFontsRegular,
    height: Dimensions.get('screen').height * 0.065,
    fontSize: 18,
    color: themeColors.primaryBlack,
    letterSpacing: -0.3,
    flex: 1,
    paddingRight: '5%',
    // backgroundColor: 'yellow',
  },
  closeIconDiv: {
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
});
