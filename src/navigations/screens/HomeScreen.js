import {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  FlatList,
  Modal,
  Animated,
  Dimensions,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import HomePageAdvertisementSlider from '../../components/HomePageAdvertisementSlider';
import ImageButton from '../../components/ImageButton';
import CommonStyles from '../../constants/styles/CommonStyles';
import FontFamilies from '../../constants/styles/FontFamilies';
import ImageStrings from '../../constants/strings/ImageStrings';
import {themeColors} from '../../constants/styles/ThemeColors';
import {
  getAllCategory,
  getAllProductOfCategory,
} from '../../api/product/ProductApiRequests';
import CategoryDiv from '../../components/homepage/CategoryDiv';
import RandomCategoryDiv from '../../components/homepage/RandomCategoryDiv';
import AllProductsDiv from '../../components/homepage/AllProductsDiv';
import {useNavigation} from '@react-navigation/native';
import SeachPage from '../../components/homepage/SeachPage';
import {Loader} from '../../components/Loader';
import FilterPage from '../../components/homepage/FilterPage';
import {expandModal} from '../../components/homepage/animationFunction';
import {searchProductLocally} from '../../api/product/LocalRequests';

const dimensions = Dimensions.get('screen');

export default HomeScreen = () => {
  const navigation = useNavigation();
  const userDataFromStore = useSelector(state => state.authentication.userData);
  const [categories, setCategories] = useState([]);
  const [randomCategoryProduct, setRandomCategoryProduct] = useState({});
  const [allProducts, setAllProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [endOfPage, setEndOfPage] = useState(false);
  const [seachedProducts, setSeachedProducts] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [minMaxPrice, setMinMaxPrice] = useState([0, 500]);

  const [flatlistArray, setFlatlistArray] = useState([
    <HomePageAdvertisementSlider />,
  ]);

  const seachModalHeight = useRef(
    new Animated.Value(dimensions.height * 0.11),
  ).current;
  const searchModalTop = useRef(
    new Animated.Value(dimensions.height * 0.15),
  ).current;
  const contentVisibility = useRef(new Animated.Value(0)).current;
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [filterConditions, setFilterConditions] = useState({});

  const init = async () => {
    const apiResponse = await getAllCategory();
    if (apiResponse.isError) {
      return;
    }
    setCategories([...apiResponse.categories]);
    await selectRandomCategoryProducts([...apiResponse.categories]);
    await getAllProducts();
    const apiResponseAllProducts = await getAllProductOfCategory('', 10, 0);
    if (apiResponseAllProducts.isError) {
      return;
    }
    // console.log('apiResponseAllProducts');
    // console.log(apiResponseAllProducts);
    setAllProducts([...apiResponseAllProducts.products.products]);
    setSeachedProducts([...apiResponseAllProducts.products.products]);
    setMinMaxPrice([
      apiResponseAllProducts.products.minimumPriceProduct,
      apiResponseAllProducts.products.maximumPriceProduct,
    ]);
  };

  const selectRandomCategoryProducts = async categoryArray => {
    const categoryName = categoryArray[Math.floor(Math.random() * 19)];
    const apiResponse = await getAllProductOfCategory(categoryName);
    if (apiResponse.isError) {
      return;
    }
    setRandomCategoryProduct({...apiResponse.products, categoryName});
  };

  const getAllProducts = async () => {
    const apiResponse = await getAllProductOfCategory('', 10, 0);
    if (apiResponse.isError) {
      return;
    }
    setAllProducts({...apiResponse.products});
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (flatlistArray.length == 4) {
      return;
    }
    if (
      categories.length != 0 &&
      !!allProducts.products &&
      randomCategoryProduct.products
    ) {
      setFlatlistArray(pre => [
        ...pre,
        <CategoryDiv categories={[...categories]} />,
        <RandomCategoryDiv
          randomCategoryProduct={{...randomCategoryProduct}}
        />,
        <AllProductsDiv
          allProducts={{...allProducts}}
          setIsLoading={setIsLoading}
          setEndOfPage={setEndOfPage}
        />,
      ]);
    }
  }, [categories, allProducts, randomCategoryProduct]);

  const EndOfPageCompnent = () => (
    <Text style={styles.errorText}>You reached End of Page</Text>
  );
  const searchFunction = (text, filters = {...filterConditions}) => {
    // console.log('text');
    // console.log(text);
    setSearchText(text);
    const localReponse = searchProductLocally([...allProducts], text, {
      ...filters,
    });
    if (localReponse.isError) {
      setSearchError(localReponse.error);
      setSeachedProducts([]);
      return;
    }
    setSearchError('');
    setSeachedProducts([...localReponse.products]);
  };

  const setFilter = filterApplied => {
    // console.log('filterApplied');
    // console.log(filterApplied);
    setFilterConditions({...filterApplied});
    searchFunction(searchText.toString(), {...filterApplied});
  };

  const cancelSearch = () => {
    setSearchText('');
    setSearchError('');
    const localReponse = searchProductLocally([...allProducts], '', {
      ...filterConditions,
    });
    if (localReponse.isError) {
      setSearchError(localReponse.error);
      setSeachedProducts([]);
      return;
    }
    setSeachedProducts([...localReponse.products]);
  };

  return (
    <View style={[styles.conatiner, styles.pageStyle]}>
      <SeachPage
        allProducts={{...allProducts}}
        seachModalHeight={seachModalHeight}
        searchModalTop={searchModalTop}
        contentVisibility={contentVisibility}
        setIsSearchMode={setIsSearchMode}
        isSearchMode={isSearchMode}
        filterConditions={filterConditions}
        searchFunction={searchFunction}
        seachedProducts={seachedProducts}
        searchError={searchError}
        searchText={searchText}
        cancelSearch={cancelSearch}
      />
      <FilterPage
        isSearchMode={isSearchMode}
        setFilter={setFilter}
        setFilterConditions={setFilterConditions}
        filterConditionsSetterFunction={setFilter}
        minMaxPrice={[...minMaxPrice]}
        expandSearch={() =>
          expandModal(
            seachModalHeight,
            searchModalTop,
            contentVisibility,
            navigation,
            setIsSearchMode,
            {
              height: dimensions.height * 1,
              top: dimensions.height * 0.05,
              visibility: 1,
            },
          )
        }
      />
      <View style={styles.userDetailDiv}>
        <View style={styles.greeetingDiv}>
          <Text style={styles.greetingUser}>
            Hello, {userDataFromStore.firstName}
          </Text>
          <Text style={styles.greet}>Good Morning</Text>
        </View>
        <ImageButton
          source={ImageStrings.iconImages.notificationOutline}
          containerStyle={styles.notificationIconContainerStyle}
          ImageStyle={styles.imageStyle}
        />
        <View
          style={[
            styles.notificationTextDiv,
            {marginLeft: 5 > 100 ? '-7%' : '-4%'},
          ]}>
          <Text style={styles.notificationText}>{5}</Text>
        </View>
        <ImageButton
          source={ImageStrings.adSlider[0]}
          containerStyle={styles.profilePhotoContainerStyle}
          ImageStyle={styles.imageStyle}
        />
      </View>
      {categories.length != 0 && (
        <FlatList
          data={flatlistArray}
          renderItem={({item}) => item}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          ListFooterComponent={
            isLoading ? (
              <Loader
                size={'large'}
                color={themeColors.primaryColorDark}
                containerStyle={styles.loaderStyleBig}
              />
            ) : endOfPage ? (
              <EndOfPageCompnent />
            ) : null
          }
        />
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
  userDetailDiv: {
    marginHorizontal: '7%',
    flexDirection: 'row',
    marginTop: '5%',
    marginBottom: '3%',
    alignItems: 'center',
  },
  greeetingDiv: {
    flex: 1,
  },
  greetingUser: {
    fontFamily: FontFamilies.primaryFontsBold,
    fontSize: 24,
    color: themeColors.primaryBlack,
  },
  greet: {
    fontFamily: FontFamilies.primaryFontsRegular,
    fontSize: 16,
    color: themeColors.primaryGray,
  },
  notificationIconContainerStyle: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  profilePhotoContainerStyle: {
    height: 50,
    width: 50,
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: '5%',
  },
  notificationTextDiv: {
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: themeColors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-6%',
  },
  notificationText: {
    fontFamily: FontFamilies.primaryFontsMedium,
    color: themeColors.primaryBackground,
    fontSize: 12,
    paddingVertical: '0.5%',
    paddingHorizontal: '1.2%',
    borderColor: themeColors.primaryColor,
  },
  searchAndSortDiv: {
    marginVertical: '5.5%',
    marginHorizontal: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sortIconContainerStyle: {
    borderWidth: Platform.OS == 'android' ? 1 : 0.5,
    borderRadius: 14,
    borderColor: themeColors.primaryGray,
    justifyContent: 'center',
  },
  sortIconStyle: {
    paddingHorizontal: '4.5%',
    alignSelf: 'center',
  },
  categoriesDiv: {
    marginVertical: '5%',
  },
  searchHeading: {
    marginLeft: '8%',
  },
  closeIconDiv: {
    marginLeft: '6%',
    marginVertical: '2%',
  },
});
