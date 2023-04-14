import {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getAllProductOfCategory} from '../../api/product/ProductApiRequests';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';
import ProductCardBig from '../productCard/ProductCardBig';
import Rating from '../productCard/Rating';
// import {data} from '../constants/Data';
const dimensions = Dimensions.get('screen');
export default CategoryProductListVertical = ({
  categoryObject,
  isStaticList = true,
  setIsLoading,
  setEndOfPage,
}) => {
  const [productCategoryObject, setProductCategoryObject] = useState({
    ...categoryObject,
  });

  const loadMoreData = async () => {
    setIsLoading(true);
    if (!productCategoryObject.products) {
      setIsLoading(false);
      return;
    }
    const apiResponse = await getAllProductOfCategory(
      '',
      10,
      productCategoryObject.limit,
    );
    if (apiResponse.isError) {
      if (apiResponse.error == 'EndOfPage') {
        setEndOfPage(true);
      }
      setIsLoading(false);
      return;
    }
    setProductCategoryObject({
      ...productCategoryObject,
      products: [
        ...productCategoryObject.products,
        ...apiResponse.products.products,
      ],
      limit:
        (!!productCategoryObject.limit
          ? parseInt(productCategoryObject.limit)
          : 10) + 10,
    });
    setIsLoading(false);
  };

  return (
    <FlatList
      data={productCategoryObject.products}
      keyExtractor={(item, index) => index}
      renderItem={({item}) => <ProductCardBig productObject={{...item}} />}
      contentContainerStyle={styles.flatlistDiv}
      showsHorizontalScrollIndicator={false}
      onEndReached={!isStaticList && loadMoreData}
      onEndReachedThreshold={0}
    />
  );
};

const styles = StyleSheet.create({
  productImage: {
    height: dimensions.height * 0.265,
    width: dimensions.width * 0.75,
  },
  flatlistDiv: {
    paddingHorizontal: '5%',
  },
});
