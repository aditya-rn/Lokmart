import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  NativeModules,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateCart} from '../../../../redux/cart/CartReducer';
import {
  addToCart,
  getAllProductsFromId,
  removeFromCart,
} from '../../../api/product/ProductApiRequests';
import GradientButton from '../../../components/GradientButton';
import Heading from '../../../components/Heading';
import PageHeading from '../../../components/PageHeading';
import SeperatorLine from '../../../components/productCard/SeperatorLine';
import TextButton from '../../../components/TextButton';
import ImageStrings from '../../../constants/strings/ImageStrings';
import CommonStyles from '../../../constants/styles/CommonStyles';
import FontFamilies from '../../../constants/styles/FontFamilies';
import {themeColors} from '../../../constants/styles/ThemeColors';
import CartProductCardSmall from './CartProductCardSmall';

const dimension = Dimensions.get('screen');
export default CartScreen = () => {
  const StatusBarHeight = NativeModules.StatusBarManager.HEIGHT;
  const cartSlice = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [cart, setCart] = useState({});
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  isFocused && console.log('cartSlice in cartScreen', cartSlice.cart);

  useEffect(() => {
    // navigation.setOptions({
    //   // tabBarStyle: {
    //   //   // display: 'none',
    //   // },
    // });
    !!cartSlice.cart.products && init();
  }, [cartSlice.cart]);

  setTimeout(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  }, 2000);

  // setTimeout(() => {
  //   navigation.setOptions({
  //     tabBarStyle: {
  //       display: 'flex',
  //     },
  //   });
  // }, 2000);

  const init = async () => {
    const response = await getAllProductsFromId(cartSlice.cart.products);
    setCart({...cartSlice.cart, products: [...response.products]});
  };

  const navigateBack = () => navigation.goBack();

  const addProduct = async productObject => {
    const response = await addToCart(
      {...cartSlice.cart},
      {
        ...productObject,
      },
    );
    if (!response.isError) {
      dispatch(updateCart({cart: {...response.cart}}));
    }
  };
  const removeProduct = async productObject => {
    console.log('cart', cartSlice);
    const response = await removeFromCart([...cartSlice.cart.products], {
      ...productObject,
    });
    console.log('response', response);
    if (!response.isError) {
      dispatch(updateCart({cart: {...response.cart}}));
    }
  };

  const renderProductCard = ({item}) => (
    <CartProductCardSmall
      onQuantityIncrement={addProduct}
      onQuantityDecrement={removeProduct}
      product={item}
    />
  );
  const ProductsComponent = (
    <FlatList
      data={cart.products}
      renderItem={renderProductCard}
      keyExtractor={(item, index) => index}
      style={styles.productsList}
    />
  );

  const BillDetail = ({label, value}) => (
    <View style={[styles.billDetailDiv, styles.rowSpaceBetween]}>
      <Text style={styles.billDetail}>{label}</Text>
      <Text style={[styles.billDetail, styles.billDetailVAlue]}>{value}</Text>
    </View>
  );
  const OrderTotal = () => (
    <View style={[styles.billDetailDiv, styles.rowSpaceBetween]}>
      <Text style={styles.billDetail}>Order Total</Text>
      <Text style={[styles.billDetail, styles.billDetailVAlue]}>
        $ {(cart.total + 15.02 + 10.08).toFixed(2)}
      </Text>
    </View>
  );
  const BillDetailsComponent = (
    <View>
      <Heading
        text={'Bill Details'}
        containerStyles={styles.billDetailsHeading}
        isCenter={false}
      />
      <BillDetail label={'Item total'} value={'$ ' + cart.total?.toFixed(2)} />
      <BillDetail label={'Delivery fee for 9.71 kms'} value={'$ 10.08'} />
      <BillDetail label={'Taxes and charge'} value={'$ 15.02'} />
      <SeperatorLine style={styles.separatorLine} />
      <OrderTotal />
    </View>
  );

  const PromoCodeComponent = (
    <View style={[styles.rowSpaceBetween, styles.promoDiv]}>
      <View style={[styles.row]}>
        <Image
          source={ImageStrings.coupon}
          resizeMode="contain"
          style={styles.couponIcon}
        />
        <Text style={styles.promoCodeLabel}>Promo Code</Text>
      </View>
      <GradientButton
        containerStyle={styles.couponApplyButton}
        title="Apply"
        textStyle={styles.appyButton}
      />
    </View>
  );

  const flatlistArray = [
    ProductsComponent,
    BillDetailsComponent,
    PromoCodeComponent,
  ];
  console.log(cart);
  return (
    <View style={[styles.mainDiv, {paddingTop: StatusBarHeight}]}>
      <PageHeading
        isBackAvailable
        pageHeading={'Shopping Cart'}
        rightFirstButtonName={'ellipsis-vertical'}
        onRightFirstButtonPress={() => {}}
      />
      {!!cart.total && (
        <FlatList
          data={flatlistArray}
          renderItem={({item}) => item}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListWithBottomPadding}
        />
      )}
      {!!cart.total && (
        <GradientButton
          title={'Checkout'}
          containerStyle={styles.floatingButton}
        />
      )}
      {!cart.total && (
        <View style={styles.errorDiv}>
          <Text style={styles.errorMessage}>Nothing In the Cart !!</Text>
          <TextButton
            text={'Explore'}
            style={[styles.errorMessage, styles.exploreButton]}
            onPress={navigateBack}
          />
        </View>
      )}
      <StatusBar
        backgroundColor={'transparent'}
        barStyle="dark-content"
        translucent={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  ...CommonStyles,
  mainDiv: {
    backgroundColor: themeColors.primaryBackground,
    flex: 1,
    paddingHorizontal: '7%',
  },
  productsList: {
    marginVertical: '7%',
  },
  billDetailDiv: {
    marginVertical: 5,
    // backgroundColor: 'red',
  },
  billDetail: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    color: themeColors.primaryGray,
    fontSize: 18,
  },
  billDetailVAlue: {
    color: themeColors.primaryBlack,
  },
  billDetailsHeading: {
    fontSize: 20,
    marginVertical: 10,
  },
  separatorLine: {
    marginVertical: 15,
    backgroundColor: themeColors.primaryGrayLight,
  },
  promoDiv: {
    // backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: themeColors.primaryGrayLight,
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  promoCodeLabel: {
    fontFamily: FontFamilies.primaryFontsRegular,
    color: themeColors.primaryGray,
    fontSize: 18,
    marginHorizontal: 5,
  },
  couponIcon: {
    height: 30,
    width: 40,
  },
  couponApplyButton: {
    width: dimension.width * 0.22,
    height: dimension.height * 0.05,
    borderRadius: 30,
  },
  appyButton: {
    textTransform: 'capitalize',
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 16,
  },
  errorDiv: {
    justifyContent: 'center',
    flex: 1,
  },
  errorMessage: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 18,
    color: themeColors.primaryGray,
    alignSelf: 'center',
  },
  exploreButton: {
    color: themeColors.primaryColorDark,
    fontSize: 20,
  },
});
