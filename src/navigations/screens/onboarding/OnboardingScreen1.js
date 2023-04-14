import {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import CommonStyles from '../../../constants/styles/CommonStyles';
import FontFamilies from '../../../constants/styles/FontFamilies';
import ImageStrings from '../../../constants/strings/ImageStrings';
import {themeColors} from '../../../constants/styles/ThemeColors';
import OnboardingStyles from './OnboardingStyles';
import Heading from '../../../components/Heading';
const dimensions = Dimensions.get('screen');

export default OnboardingScreen1 = ({onNext}) => {
  const [screenDimensions, setScreenDimensions] = useState({...dimensions});

  useEffect(() => {
    Dimensions.addEventListener('change', ({screen}) => {
      setScreenDimensions({...screen});
    });
  }, []);

  return (
    <View
      style={[
        styles.conatiner,
        {height: screenDimensions.height, width: screenDimensions.width},
      ]}>
      <View style={styles.ilustrationDiv}>
        <Image
          source={ImageStrings.OnboardingScreen1Image}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </View>
      <View style={[{marginTop: '7%'}]}>
        <Heading text={'Welcome to LokMart! \nGrocery Applications'} />
      </View>
      <Text style={styles.subText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  ...CommonStyles,
  ...OnboardingStyles,
});
