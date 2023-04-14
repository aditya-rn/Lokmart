import {
  StyleSheet,
  Dimensions,
  TextInput,
  Animated,
  Pressable,
  Platform,
} from 'react-native';
import {forwardRef, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconLock from 'react-native-vector-icons/MaterialCommunityIcons';
import {themeColors} from '../../constants/styles/ThemeColors';
import FontFamilies from '../../constants/styles/FontFamilies';

let dimension = Dimensions.get('screen');

export default Inputbar = forwardRef((props, ref) => {
  const {
    isPassword,
    rightIcon,
    isFocused,
    inputRef,
    isInvalid,
    containerStyle,
    ...otherProps
  } = props;
  const animatedBlock = useRef(new Animated.Value(0)).current;
  const animatedBlockHeight = useRef(
    new Animated.Value(dimension.height * 0.075),
  ).current;
  const animatedBlockWidth = useRef(
    new Animated.Value(dimension.width * 0.82),
  ).current;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const increment = () => {
    Animated.parallel([
      Animated.timing(animatedBlock, {
        toValue: 2,
        duration: 200,
        useNativeDriver: false,
      }).start(),
      Animated.timing(animatedBlockHeight, {
        toValue: dimension.height * 0.075,
        duration: 100,
        useNativeDriver: false,
      }).start(),
      Animated.timing(animatedBlockWidth, {
        toValue: dimension.width * 0.83,
        duration: 100,
        useNativeDriver: false,
      }).start(),
    ]).start();
  };
  const decrement = () => {
    Animated.parallel([
      Animated.timing(animatedBlock, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(),
      Animated.timing(animatedBlockHeight, {
        toValue: dimension.height * 0.075,
        duration: 100,
        useNativeDriver: false,
      }).start(),
      Animated.timing(animatedBlockWidth, {
        toValue: dimension.width * 0.82,
        duration: 100,
        useNativeDriver: false,
      }).start(),
    ]).start();
  };

  useEffect(() => {
    if (
      !!otherProps.touched[otherProps.placeholder.toLowerCase()] ||
      isInvalid
    ) {
      increment();
    } else {
      decrement();
    }
  }, [otherProps.touched, isInvalid]);

  return (
    <Animated.View
      ref={[animatedBlock, animatedBlockHeight, animatedBlockWidth]}
      style={[
        styles.mainDiv,
        {
          borderColor: isInvalid
            ? themeColors.invalidField
            : themeColors.primaryColor,
          borderWidth: animatedBlock,
        },
        !!otherProps.touched[otherProps.placeholder.toLowerCase()] && {
          borderWidth: animatedBlock,
          height: animatedBlockHeight,
          width: animatedBlockWidth,
        },
        {...containerStyle},
      ]}>
      {isPassword ? (
        <IconLock
          name="lock"
          size={25}
          style={styles.iconDiv}
          color={
            isInvalid
              ? themeColors.invalidField
              : !!otherProps.touched[otherProps.placeholder.toLowerCase()]
              ? themeColors.primaryColor
              : themeColors.primaryGray
          }
        />
      ) : (
        <Icon
          name={rightIcon}
          size={22}
          style={styles.iconDiv}
          color={
            isInvalid
              ? themeColors.primaryGray
              : !!otherProps.touched[otherProps.placeholder.toLowerCase()]
              ? themeColors.primaryColor
              : themeColors.primaryGray
          }
        />
      )}

      <TextInput
        style={[
          styles.inputbar,
          {
            color: isInvalid
              ? themeColors.primaryGray
              : themeColors.primaryBlack,
          },
          !!isPassword &&
            !!otherProps.value &&
            !passwordVisible && {
              fontSize: 30,
              letterSpacing: Platform.OS == 'android' ? -3 : -6,
              textAlignVertical: 'bottom',
            },
        ]}
        {...otherProps}
        secureTextEntry={!!isPassword && !passwordVisible}
        ref={ref}
        placeholderTextColor={
          isInvalid ? themeColors.invalidField : themeColors.inactiveDotColor1
        }
      />
      {isPassword && (
        <Pressable style={styles.iconDiv} onPress={toggleVisibility}>
          <Icon
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={25}
            style={[
              styles.icon,
              {transform: [{rotateY: '180deg'}], marginHorizontal: '2%'},
            ]}
            color={
              isInvalid
                ? themeColors.invalidField
                : !!otherProps.touched[otherProps.placeholder.toLowerCase()]
                ? themeColors.primaryColor
                : themeColors.primaryGray
            }
          />
        </Pressable>
      )}
    </Animated.View>
  );
});
const styles = StyleSheet.create({
  mainDiv: {
    height: dimension.height * 0.075,
    width: dimension.width * 0.82,
    alignSelf: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: themeColors.inputbarBackgroundColor,
    marginVertical: dimension.height * 0.01,
  },
  inputbar: {
    fontFamily: FontFamilies.primaryFontsMedium,
    flex: 1,
    fontSize: 18,
    color: themeColors.primaryBlack,
    alignSelf: 'center',
  },
  iconDiv: {
    paddingHorizontal: '4%',
    alignSelf: 'center',
  },
});
