import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Pagination} from 'react-native-snap-carousel';
import GradientButton from '../../../components/GradientButton';
import OnboardingSwiperDot from '../../../components/OnboardingSwiperDot';
import CommonStyles from '../../../constants/styles/CommonStyles';
import FontFamilies from '../../../constants/styles/FontFamilies';
import ImageStrings from '../../../constants/strings/ImageStrings';
import OnboardingScreen1 from './OnboardingScreen1';
import OnboardingScreen2 from './OnboardingScreen2';
const dimensions = Dimensions.get('screen');
export default OnboardingSwiper = () => {
  const navigation = useNavigation();

  const [screenDimensions, setScreenDimensions] = useState({...dimensions});
  const [swiperIndex, setSwiperIndex] = useState(0);
  const sliderRef = useRef();

  useEffect(() => {
    Dimensions.addEventListener('change', ({screen}) => {
      setScreenDimensions({...screen});
    });
  }, []);

  const nextSlide = () => {
    sliderRef.current.snapToNext();
    setSwiperIndex(sliderRef.current.currentIndex);
    if (sliderRef.current.currentIndex == 1) {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.conatiner}>
      <Image
        source={ImageStrings.OnboardingSwiperBackground}
        style={[
          styles.curvedBackground,
          Platform.OS == 'android' && {height: '60.5%'},
        ]}
        resizeMode={
          screenDimensions.height > screenDimensions.width
            ? 'contain'
            : 'stretch'
        }
      />

      <Carousel
        data={[<OnboardingScreen1 />, <OnboardingScreen2 />]}
        renderItem={item => item.item}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width}
        ref={sliderRef}
        onSnapToItem={() => {
          setSwiperIndex(sliderRef.current.currentIndex);
        }}
        pagingEnabled
      />
      <View
        style={[styles.dotDiv, Platform.OS == 'android' && {bottom: '12%'}]}>
        <Pagination
          dotsLength={2}
          inactiveDotElement={
            <View style={styles.dotContainerStyle}>
              <OnboardingSwiperDot />
            </View>
          }
          dotElement={
            <View style={[styles.dotContainerStyle, {width: 22}]}>
              <OnboardingSwiperDot isActive />
            </View>
          }
          activeDotIndex={swiperIndex}
        />
      </View>

      <View style={styles.nextBtn}>
        <GradientButton
          title={swiperIndex == '0' ? 'next' : 'Get Started'}
          height={Dimensions.get('screen').height * 0.079}
          width={Dimensions.get('screen').width * 0.8}
          onPress={nextSlide}
        />
      </View>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  ...CommonStyles,
  curvedBackground: {
    height: '55.6%',
    width: '100%',
    position: 'absolute',
  },
  contrlBtn: {
    justifyContent: 'center',
    borderRadius: 12,
    height: '8%',
    marginTop: '187.5%',
  },
  nextBtn: {
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0,
  },
  nextBtnText: {
    ...FontFamilies.primaryFontsExtraBold,
    position: 'absolute',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    color: 'white',
    lineHeight: 70,
    textAlignVertical: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  dotDiv: {
    position: 'absolute',
    bottom: '15%',
    alignSelf: 'center',
  },
  dotContainerStyle: {
    height: 9,
    width: 19,
    marginHorizontal: 0,
    borderRadius: 100,
    overflow: 'hidden',
    marginHorizontal: 3,
  },
});
