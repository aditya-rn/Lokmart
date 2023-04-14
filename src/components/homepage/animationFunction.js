import {Animated, Dimensions, Keyboard, Platform} from 'react-native';
const dimensions = Dimensions.get('screen');

export const animate = (ref, toValue, duration) =>
  Animated.timing(ref, {
    toValue: toValue,
    duration: duration,
    useNativeDriver: false,
  }).start();

export const animateXY = (ref, toValue, duration) =>
  Animated.timing(ref, {
    toValue: {x: toValue.x, y: toValue.y},
    duration: duration,
    useNativeDriver: false,
  }).start();

export const expandModal = (
  heightAnimation,
  topAnimation,
  visibility,
  navigationRef,
  setHook,
  toValues = {
    height: dimensions.height * 1,
    top:
      Platform.OS == 'android'
        ? dimensions.height * 0.04
        : dimensions.height * 0.05,
    visibility: 1,
  },
  isBoth = false,
) => {
  setHook(true);
  Animated.parallel([
    isBoth
      ? animateXY(heightAnimation, {x: toValues.x, y: toValues.y}, 300)
      : animate(heightAnimation, toValues.height, 400),
    isBoth
      ? animateXY(topAnimation, {x: toValues.x1, y: toValues.y1}, 300)
      : animate(topAnimation, toValues.top, 200),
    animate(visibility, toValues.visibility, 500),
  ]).start();
  //   x: toValue.x, y: toValue.y
  navigationRef.setOptions({
    tabBarStyle: {display: 'none'},
  });
};

export const shrinkModal = (
  heightAnimation,
  topAnimation,
  visibility,
  navigationRef,
  setHook,
  toValues2 = {
    height: dimensions.height * 0.11,
    top: dimensions.height * 0.15,
    visibility: 0.1,
  },
  isBoth = false,
) => {
  console.log('toValues2');
  console.log(toValues2);
  setHook(false);
  Animated.parallel([
    isBoth
      ? animateXY(heightAnimation, {x: toValues2.x, y: toValues2.y}, 200)
      : animate(heightAnimation, toValues2?.height, 400),
    isBoth
      ? animateXY(topAnimation, {x: toValues2.x1, y: toValues2.y1}, 300)
      : animate(topAnimation, toValues2?.top, 200),
    animate(visibility, toValues2?.visibility, 200),
  ]).start();
  Keyboard.dismiss();
  navigationRef.setOptions({
    tabBarStyle: {height: '12%'},
  });
};
// toValues2 = {
//   height: dimensions.height * 0.11,
//   top: dimensions.height * 0.15,
//   visibility: 0.1,
// };
