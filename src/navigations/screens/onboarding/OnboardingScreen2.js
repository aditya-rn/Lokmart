import {useState} from 'react';
import {Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import CommonStyles from '../../../constants/styles/CommonStyles';
import ImageStrings from '../../../constants/strings/ImageStrings';
import OnboardingStyles from './OnboardingStyles';
import Heading from '../../../components/Heading';
const dimensions = Dimensions.get('screen');

export default OnboardingScreen2 = () => {
  const [screenDimensions, setScreenDimensions] = useState({...dimensions});

  return (
    <View
      style={[
        styles.conatiner,
        {height: screenDimensions.height, width: screenDimensions.width},
      ]}>
      <View style={styles.ilustrationDiv}>
        <Image
          source={ImageStrings.OnboardingScreen2Image}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </View>
      <View style={[{marginTop: '7%'}]}>
        <Heading text={'Best Quality and \nFast Delivery!'} />
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
