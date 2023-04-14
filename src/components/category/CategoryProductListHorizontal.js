import {useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';
import IconButton from '../IconButton';
import DiscountLabel from '../productCard/DiscountLabel';
import Rating from '../productCard/Rating';
// import {data} from '../constants/Data';
const dimensions = Dimensions.get('screen');
export default CategoryProductListHorizontal = ({categoryObject}) => {
  const navigation = useNavigation();
  const gotoProduct = item => {
    navigation.navigate('ProductScreen', {
      productObject: item,
    });
  };
  const renderItem = ({item}) => {
    return (
      <Pressable
        style={({pressed}) => [styles.productItem, pressed && {opacity: 0.5}]}
        onPress={gotoProduct.bind(this, item)}>
        <Image
          style={styles.productImage}
          borderRadius={16}
          source={{uri: item.thumbnail}}
        />
        <Text style={styles.productName}>{item.title}</Text>
        <View style={styles.productDetails}>
          <Rating rating={item.rating} ratings={parseInt(item.rating * 10)} />
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <IconButton
          name={'heart'}
          color={themeColors.primaryGray}
          size={30}
          containerStyles={styles.addToFavoriteButton}
        />
        <DiscountLabel
          isSmall={false}
          discount={item.discountPercentage}
          style={styles.discountLabel}
        />
      </Pressable>
    );
  };
  return (
    <View style={styles.mainDiv}>
      <FlatList
        data={categoryObject.products}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={styles.flatlistDiv}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    // backgroundColor: 'red',
  },
  productImage: {
    height: dimensions.height * 0.265,
    width: dimensions.width * 0.75,
  },
  productItem: {
    marginHorizontal: dimensions.width * 0.02,
    marginVertical: dimensions.height * 0.015,
    width: dimensions.width * 0.75,
    // backgroundColor: 'green',
  },
  flatlistDiv: {
    paddingHorizontal: '5%',
  },
  productName: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 20,
    color: themeColors.primaryBlack,
    marginTop: dimensions.height * 0.015,
  },
  productDetails: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 20,
    color: themeColors.primaryBlack,
  },
  addToFavoriteButton: {
    position: 'absolute',
    right: '7%',
    top: '5%',
    opacity: 0.7,
  },
  discountLabel: {
    position: 'absolute',
    left: '7%',
    top: '5%',
  },
});
