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
import NavigationsStrings from '../../constants/strings/NavigationsStrings';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';
import IconButton from '../IconButton';
import DiscountLabel from '../productCard/DiscountLabel';
import Rating from '../productCard/Rating';
// import {data} from '../constants/Data';
const dimensions = Dimensions.get('screen');
export default CategoryProductListHorizontalSmall = ({categoryObject}) => {
  const navigation = useNavigation();

  const goToItem = item => {
    navigation.push(NavigationsStrings.ProductScreen, {
      productObject: {
        ...item,
      },
    });
  };

  const renderItem = ({item}) => {
    let oldPrice = item.price + item.price * item.discountPercentage * 0.01;
    return (
      <Pressable
        style={({pressed}) => [styles.productItem, pressed && {opacity: 0.5}]}
        onPress={goToItem.bind(this, item)}>
        <Image
          style={styles.productImage}
          borderRadius={16}
          source={{uri: item.thumbnail}}
        />
        <Text style={styles.productName}>{item.title}</Text>
        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <Text style={[styles.productPrice, styles.oldproductPrice]}>
            ${oldPrice.toFixed(2)}
          </Text>
        </View>
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
    height: dimensions.height * 0.15,
    width: dimensions.height * 0.15,
  },
  productItem: {
    marginHorizontal: dimensions.width * 0.02,
    marginVertical: dimensions.height * 0.015,
    width: dimensions.height * 0.15,
    // backgroundColor: 'green',
  },
  flatlistDiv: {
    // paddingHorizontal: '5%',
  },
  productName: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 20,
    color: themeColors.primaryBlack,
    marginTop: dimensions.height * 0.015,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 14,
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
  oldproductPrice: {
    marginLeft: 5,
    textDecorationLine: 'line-through',
    fontFamily: FontFamilies.primaryFontsMedium,
    color: themeColors.primaryGray,
  },
});
