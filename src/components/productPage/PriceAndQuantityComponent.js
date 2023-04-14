import {memo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';
import IconButton from '../IconButton';

const PriceAndQuantityComponenet = ({productObject, updateQuantity}) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(pre => pre + 1);
    updateQuantity(quantity + 1);
  };
  const decrement = () => {
    setQuantity(pre => pre - 1);
    updateQuantity(quantity - 1);
  };

  const oldPrice =
    productObject.price +
    (productObject.price * productObject.discountPercentage) / 100;

  return (
    <View style={styles.priceAndQuantityDiv}>
      <View style={styles.priceDiv}>
        <Text style={styles.price}>${productObject.price}</Text>
        <Text style={styles.oldPrice}>${oldPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityDiv}>
        <IconButton
          name={'add'}
          size={27}
          containerStyles={styles.quantityBtn}
          color={themeColors.primaryBlack}
          pressColor={themeColors.primaryColorDark}
          onPress={increment}
        />
        <Text style={[styles.oldPrice, styles.quantity]}>{quantity}</Text>
        <IconButton
          name={'remove'}
          size={27}
          containerStyles={styles.quantityBtn}
          color={themeColors.primaryBlack}
          pressColor={themeColors.primaryColorDark}
          onPress={decrement}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceAndQuantityDiv: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceDiv: {
    flexDirection: 'row',
  },
  price: {
    fontSize: 22,
    fontFamily: FontFamilies.primaryFontsSemiBold,
    textTransform: 'capitalize',
    color: themeColors.primaryBlack,
  },
  oldPrice: {
    fontSize: 22,
    fontFamily: FontFamilies.primaryFontsRegular,
    textTransform: 'capitalize',
    color: themeColors.primaryGray,
    textDecorationLine: 'line-through',
    marginHorizontal: 10,
  },
  quantityDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  quantityBtn: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 7,
    borderColor: themeColors.primaryGray,
  },
  quantity: {
    textDecorationLine: 'none',
    color: themeColors.primaryBlack,
    marginHorizontal: 15,
  },
});

export default memo(PriceAndQuantityComponenet);
