import {Text, StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageStrings from '../../constants/strings/ImageStrings';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';
import SeperatorLine from '../productCard/SeperatorLine';

export default ReviewComponent = ({review}) => {
  return (
    <View style={[styles.mainDiv]}>
      <Icon name="star" size={20} color={themeColors.ratingStarColor} />
      <Text style={styles.review}>
        {review} ({parseInt(review * 10)} reviews)
      </Text>
      <SeperatorLine style={styles.seperatorLine} width={30} />
      <Image
        source={ImageStrings.deliveryTruck}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.deliveryText}>Free Delivery</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: themeColors.primaryGray,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  review: {
    fontFamily: FontFamilies.primaryFontsMedium,
    color: themeColors.primaryBlack,
    fontSize: 14,
    marginLeft: 10,
  },
  seperatorLine: {
    transform: [{rotateZ: '90deg'}],
  },
  icon: {
    height: 20,
    width: 25,
  },
  deliveryText: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    textTransform: 'uppercase',
    color: themeColors.primarySuccessColor,
    fontSize: 16,
    marginLeft: 10,
  },
});
