import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  NativeModules,
  FlatList,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {updateCart} from '../../../redux/cart/CartReducer';
import {
  addToCart,
  getAllProductOfCategory,
} from '../../api/product/ProductApiRequests';
import CategoryHeadingBar from '../../components/category/CategoryHeadingBar';
import CategoryProductListHorizontalSmall from '../../components/category/CategoryProductListHorizontalSmall';
import CategoryProductListVertical from '../../components/category/CategoryProductListVertical';
import GradientButton from '../../components/GradientButton';
import IconButton from '../../components/IconButton';
import PageHeading from '../../components/PageHeading';
import ProductImageSlider from '../../components/ProductImageSlider';
import PriceAndQuantityComponent from '../../components/productPage/PriceAndQuantityComponent';
import ReviewComponent from '../../components/productPage/ReviewComponent';
import ImageStrings from '../../constants/strings/ImageStrings';
import CommonStyles from '../../constants/styles/CommonStyles';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';

export default ProductScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const product = !!route.params && route.params.productObject;
  const StatusBarHeight = NativeModules.StatusBarManager.HEIGHT;
  const [productObject, setProductObject] = useState({...product});
  const [categoryProducts, setCategoryProducts] = useState({});
  const [quantitySelected, setQuantitySelected] = useState(1);
  const cartSlice = useSelector(state => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    init();
    // setQuantitySelected(100);
  }, []);

  const init = async () => {
    const response = await getAllProductOfCategory(productObject.category);
    if (response.isError) {
      return;
    }
    setCategoryProducts({...response.products});
  };

  const addProduct = async () => {
    const response = await addToCart(
      {...cartSlice.cart},
      {
        ...productObject,
        quantity: quantitySelected,
      },
    );
    console.log(response);
    if (!response.isError) {
      dispatch(updateCart({cart: {...response.cart}}));
    }
  };

  return (
    <View style={[styles.conatiner, styles.pageStyle, styles.mainDiv]}>
      <PageHeading
        isBackAvailable
        rightFirstButtonName={'ellipsis-vertical'}
        rightSecondButtonName={'heart-outline'}
        onRightFirstButtonPress={() => {}}
        onSecondFirstButtonPress={() => {}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.sliderDiv}>
          <ProductImageSlider imageArray={[...productObject.images]} />
        </View>
        <View style={styles.titleDiv}>
          <Text style={styles.category}>{productObject.category}</Text>
          <Text style={styles.title}>{productObject.title}</Text>
        </View>
        <PriceAndQuantityComponent
          productObject={productObject}
          updateQuantity={setQuantitySelected}
          quantitySelected={quantitySelected}
        />

        <ReviewComponent review={productObject.rating} />
        <Text style={styles.description}>{productObject.description}</Text>
        <CategoryHeadingBar
          category={'Related product'}
          style={styles.categoryHeading}
        />
        {!!categoryProducts && (
          <CategoryProductListHorizontalSmall
            categoryObject={{...categoryProducts}}
          />
        )}
      </ScrollView>

      <GradientButton
        title={'Add To Cart'}
        containerStyle={styles.floatingButton}
        imageUri={ImageStrings.cartIcon}
        onPress={addProduct}
      />
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
    paddingHorizontal: '7%',
  },
  floatingButton: {
    position: 'absolute',
    bottom: '4%',
  },

  sliderDiv: {
    marginTop: '5%',
  },
  titleDiv: {
    marginVertical: 0,
  },
  category: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    textTransform: 'uppercase',
    color: themeColors.primaryColorDark,
    fontSize: 18,
  },
  title: {
    fontFamily: FontFamilies.primaryFontsMedium,
    textTransform: 'capitalize',
    color: themeColors.primaryBlack,
    fontSize: 22,
  },
  description: {
    fontFamily: FontFamilies.primaryFontsRegular,
    textTransform: 'capitalize',
    color: themeColors.primaryBlack,
    fontSize: 16,
    marginVertical: 15,
  },
  scrollViewStyle: {
    paddingBottom: '30%',
  },
  categoryHeading: {
    marginHorizontal: 0,
    marginVertical: 15,
  },
});
