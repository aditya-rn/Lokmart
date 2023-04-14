import {useState} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ImageStrings from '../constants/strings/ImageStrings';
import CommonStyles from '../constants/styles/CommonStyles';
import {themeColors} from '../constants/styles/ThemeColors';
const dimensions = Dimensions.get('screen');

export default HomePageAdvertisementSlider = () => {
  const [sliderNumber, setsliderNumber] = useState(0);

  const renderAdSlider = ({item}) => (
    <View style={{height: dimensions.height * 0.16}}>
      <Image source={item} style={styles.imageStyle} borderRadius={10} />
    </View>
  );

  const DotElement = ({isActive = false}) => (
    <View style={[styles.dotStyle, isActive && styles.actveDot]}></View>
  );

  return (
    <View style={[styles.mainDiv]}>
      <Carousel
        data={ImageStrings.adSlider}
        sliderWidth={dimensions.width}
        sliderHeight={dimensions.height * 0.16}
        itemHeight={dimensions.height * 0.16}
        itemWidth={dimensions.width * 0.8}
        renderItem={renderAdSlider}
        loop={true}
        autoplay
        autoplayInterval={1000}
        enableSnap={true}
        layout="default"
        onSnapToItem={number => setsliderNumber(number)}
      />
      <Pagination
        activeDotIndex={sliderNumber}
        dotsLength={3}
        dotElement={<DotElement isActive />}
        inactiveDotElement={<DotElement />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  ...CommonStyles,
  mainDiv: {
    // backgroundColor: 'red',
    marginVertical: '1%',
    marginTop: '25%',
  },
  dotStyle: {
    width: '3.5%',
    height: 4,
    borderRadius: 100,
    backgroundColor: themeColors.primaryGray,
    marginHorizontal: '1%',
    marginTop: '-5%',
  },
  actveDot: {
    backgroundColor: themeColors.primaryColor,
    width: '7%',
  },
});
