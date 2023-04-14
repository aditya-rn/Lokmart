import {Text, StyleSheet, View, Image} from 'react-native';
import IconButton from '../../../components/IconButton';
import FontFamilies from '../../../constants/styles/FontFamilies';
import {themeColors} from '../../../constants/styles/ThemeColors';

export default CartProductCardSmall = ({
  product,
  onQuantityIncrement,
  onQuantityDecrement,
}) => {
  let oldPrice =
    product.price + (product.price * product.discountPercentage) / 100;
  //   console.log(product);
  return (
    <View style={[styles.mainDiv]}>
      <Image
        source={{uri: product.thumbnail}}
        style={styles.productsImage}
        borderRadius={14}
      />
      <View style={styles.detailsDiv}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={[styles.title, styles.category]}>{product.category}</Text>
        <View style={[styles.row, styles.priceAndQuantity]}>
          <View style={[styles.priceDiv, styles.row]}>
            <Text style={[styles.title, styles.price]}>$ {product.price}</Text>
            <Text style={[styles.title, styles.category, styles.oldPrice]}>
              $ {oldPrice.toFixed(2)}
            </Text>
          </View>
          <View style={styles.row}>
            <IconButton
              name={'remove'}
              size={20}
              color={themeColors.primaryBlack}
              containerStyles={styles.quantityButton}
              onPress={onQuantityDecrement.bind(this, {
                ...product,
              })}
            />
            <Text style={[styles.title, styles.quantity]}>
              {product.quantity}
            </Text>
            <IconButton
              name={'add'}
              size={20}
              color={themeColors.primaryBlack}
              containerStyles={styles.quantityButton}
              onPress={onQuantityIncrement.bind(this, {
                ...product,
                quantity: 1,
              })}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 14,
    padding: 15,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: themeColors.primaryGrayLight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productsImage: {
    height: 60,
    width: 60,
  },
  detailsDiv: {
    marginHorizontal: 15,
    flex: 1,
  },
  priceAndQuantity: {
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  priceDiv: {
    flex: 1,
  },
  title: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 16,
    color: themeColors.primaryBlack,
    marginVertical: 1.5,
  },
  category: {
    color: themeColors.primaryGray,
    fontFamily: FontFamilies.primaryFontsMedium,
  },
  price: {
    marginRight: 5,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 10,
    fontFamily: FontFamilies.primaryFontsMedium,
  },
  quantityButton: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 5,
    borderColor: themeColors.primaryGrayLight,
  },
});
