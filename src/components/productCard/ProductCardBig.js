import {useNavigation} from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import ImageStrings from '../../constants/strings/ImageStrings';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';
import DiscountLabel from './DiscountLabel';
import Rating from './Rating';
import SeperatorLine from './SeperatorLine';

const dimensions = Dimensions.get('screen');

export default ProductCardBig = ({productObject}) => {
  const navigation = useNavigation();

  const gotoProduct = () => {
    navigation.navigate('ProductScreen', {
      productObject: productObject,
    });
  };
  // console.log(productObject);
  return (
    <Pressable
      style={({pressed}) => [styles.mainDiv, pressed && {opacity: 0.5}]}
      onPress={gotoProduct}>
      <View style={styles.imageDiv}>
        <Image
          source={{uri: productObject.thumbnail}}
          style={styles.productImage}
          borderRadius={14}
        />
        <DiscountLabel
          isSmall
          discount={productObject.discountPercentage}
          style={styles.discountLabelDiv}
        />
      </View>
      <View style={styles.detailsDiv}>
        <Text style={styles.productTitle}>{productObject.title}</Text>
        <Rating
          rating={productObject.rating}
          ratings={parseInt(productObject.rating * 10)}
        />
        <Text style={[styles.productTitle, styles.productPrice]}>
          $ {productObject.price.toFixed(2)}
        </Text>
        <SeperatorLine width={'95%'} style={styles.seperatorLineStyle} />
        <View style={styles.discountDiv}>
          <Image source={ImageStrings.discount} style={styles.discountLogo} />
          <Text style={styles.discountText}>
            {productObject.discountPercentage} % off upto $100
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    // backgroundColor: 'red',
    marginVertical: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: '7%',
  },
  imageDiv: {},
  productImage: {
    height: dimensions.height * 0.17,
    width: dimensions.width * 0.27,
  },
  discountLabelDiv: {
    marginTop: '-10%',
    alignSelf: 'center',
  },
  detailsDiv: {
    // backgroundColor: 'yellow',
    marginLeft: '5%',
    flex: 1,
  },
  productTitle: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 20,
    color: themeColors.primaryBlack,
  },
  productPrice: {
    fontSize: 18,
    marginVertical: '3%',
  },
  seperatorLineStyle: {
    alignSelf: 'center',
    marginVertical: '3%',
  },
  discountDiv: {
    flexDirection: 'row',
    // backgroundColor: 'green',
    marginVertical: '2%',
    alignItems: 'center',
  },
  discountLogo: {
    height: dimensions.height * 0.025,
    width: dimensions.height * 0.025,
  },
  discountText: {
    marginHorizontal: '5%',
    fontFamily: FontFamilies.primaryFontsMedium,
    fontSize: 12,
    color: themeColors.primaryGray,
  },
});
