import {memo, useState} from 'react';
import {Text, StyleSheet, View, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const dimensions = Dimensions.get('screen');

const ProductImageSlider = ({imageArray}) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const renderImages = ({item}) => (
    <Image
      borderRadius={20}
      //   resizeMode="stretch"
      style={styles.image}
      source={{uri: item}}
    />
  );

  return (
    <View style={[styles.mainDiv]}>
      <Carousel
        data={imageArray}
        sliderWidth={dimensions.width * 0.85}
        sliderHeight={dimensions.height * 0.27}
        itemHeight={dimensions.height * 0.27}
        itemWidth={dimensions.width * 0.85}
        renderItem={renderImages}
        onSnapToItem={index => setSliderIndex(index)}
        loop
      />
      <Pagination
        dotsLength={imageArray.length}
        inactiveDotElement={
          <View style={styles.dotContainerStyle}>
            <OnboardingSwiperDot />
          </View>
        }
        dotElement={
          <View style={[styles.dotContainerStyle, {width: 15}]}>
            <OnboardingSwiperDot isActive />
          </View>
        }
        activeDotIndex={sliderIndex}
        containerStyle={styles.dotDiv}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    // backgroundColor: 'red',
    height: dimensions.height * 0.33,
    width: dimensions.width * 0.85,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
  },
  image: {
    flex: 1,
    // marginHorizontal: dimensions.width * 0.05,
  },
  dotDiv: {
    marginTop: -15,
  },
  dotContainerStyle: {
    height: 5,
    width: 10,
    marginHorizontal: 0,
    borderRadius: 100,
    overflow: 'hidden',
    marginHorizontal: 3,
  },
});

export default memo(ProductImageSlider);
