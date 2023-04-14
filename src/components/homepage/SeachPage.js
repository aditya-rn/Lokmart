import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchProductLocally} from '../../api/product/LocalRequests';
import {getAllProductOfCategory} from '../../api/product/ProductApiRequests';
import CommonStyles from '../../constants/styles/CommonStyles';
import {themeColors} from '../../constants/styles/ThemeColors';
import CategoryProductListVertical from '../category/CategoryProductListVertical';
import Heading from '../Heading';
import IconButton from '../IconButton';
import SeperatorLine from '../productCard/SeperatorLine';
import SearchBox from '../SearchBox';
import TextButton from '../TextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterPage from './FilterPage';
import {expandModal, shrinkModal} from './animationFunction';

const dimensions = Dimensions.get('screen');
let searchProductsOut = [];

export default SeachPage = ({
  allProducts,
  seachModalHeight,
  searchModalTop,
  contentVisibility,
  setIsSearchMode,
  isSearchMode,
  cancelSearch,
  searchFunction,
  seachedProducts,
  searchError,
  searchText,
}) => {
  const navigation = useNavigation();

  // const [seachedProducts, setSeachedProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  // const [searchError, setSearchError] = useState('');

  useEffect(() => {
    // expandSearch();
    if (!isSearchMode) {
      return;
    }
    getRecentSearches();
  }, [isSearchMode]);

  const getRecentSearches = async () => {
    const resentSearchesStored = await AsyncStorage.getItem('recentSearches');
    if (!resentSearchesStored) {
      return;
    }
    const items = JSON.parse(resentSearchesStored);
    setRecentSearches([...items]);
  };

  const searchProduct = text => {
    searchFunction(text);
  };
  const saveSearch = async text => {
    searchProduct(text);
    let itemToBeStored = [];
    const getRecentSeaches = await AsyncStorage.getItem('recentSearches');
    if (!!getRecentSeaches) {
      let items = JSON.parse(getRecentSeaches);
      itemToBeStored = [...items, text.toString()];
    } else {
      itemToBeStored = [text];
    }
    const itemStringified = JSON.stringify(itemToBeStored);
    store = await AsyncStorage.setItem('recentSearches', itemStringified);
  };
  const clearAllRecentSearchs = async () => {
    const clearAll = await AsyncStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  const cancelSearchHandler = async () => {
    cancelSearch();
    await getRecentSearches();
  };

  const HeadingBar = ({
    text,
    haveRightButton = false,
    onRightButtonPress,
    rightButtonText,
  }) => (
    <View style={styles.headingBarDiv}>
      <Heading text={text} containerStyles={styles.heading} />
      {haveRightButton && (
        <TextButton
          text={rightButtonText}
          style={styles.clearButton}
          onPress={onRightButtonPress}
        />
      )}
    </View>
  );
  const SearchedItem = ({data}) => (
    <Pressable
      style={({pressed}) => [styles.searchItemDiv, pressed && {opacity: 0.5}]}>
      <Text style={styles.searchItemText}>{data}</Text>
      <Icon
        style={styles.searchedDivIcon}
        name={'arrow-forward'}
        size={25}
        color={themeColors.primaryGray}
      />
    </Pressable>
  );

  const RecentSearchItem = () => (
    <>
      <HeadingBar
        text={'Recent Search'}
        haveRightButton={recentSearches.length != 0}
        onRightButtonPress={clearAllRecentSearchs}
        rightButtonText={'Clear All'}
      />
      {recentSearches.length != 0 && (
        <FlatList
          data={recentSearches}
          renderItem={({item}) => <SearchedItem data={item} />}
          keyExtractor={(item, index) => index}
          style={{paddingHorizontal: '8%'}}
        />
      )}
      {recentSearches.length == 0 && (
        <Text style={styles.errorText}>No any recent searches !!</Text>
      )}
    </>
  );

  const SearchResultItem = () => (
    <>
      <HeadingBar
        text={'Search Result'}
        haveRightButton={seachedProducts.length != 0}
        onRightButtonPress={() => {}}
        rightButtonText={seachedProducts.length}
      />
      {seachedProducts.length != 0 && !searchError && (
        <CategoryProductListVertical
          categoryObject={{
            total: seachedProducts.length,
            products: [...seachedProducts],
          }}
        />
      )}
      {!!searchError && <Text style={styles.errorText}>{searchError}</Text>}
    </>
  );

  const flatlistArrray = [<RecentSearchItem />, <SearchResultItem />];

  return (
    <Animated.View
      ref={[seachModalHeight, searchModalTop]}
      style={[
        {
          height: seachModalHeight,
          backgroundColor: themeColors.primaryBackground,
          position: 'absolute',
          width: dimensions.width,
          top: searchModalTop,
          zIndex: 10,
        },
      ]}>
      {!!isSearchMode && (
        <Animated.View
          ref={contentVisibility}
          style={{opacity: contentVisibility}}>
          <IconButton
            name={'close'}
            size={35}
            color={themeColors.primaryBlack}
            containerStyles={styles.closeIconDiv}
            onPress={() =>
              shrinkModal(
                seachModalHeight,
                searchModalTop,
                contentVisibility,
                navigation,
                setIsSearchMode,
              )
            }
          />
          <Heading
            isCenter={false}
            text={'Search'}
            containerStyles={[styles.searchHeading]}
          />
        </Animated.View>
      )}

      <View style={[styles.searchAndSortDiv]}>
        <SearchBox
          searchText={searchText}
          searchModeHandler={expandModal.bind(
            this,
            seachModalHeight,
            searchModalTop,
            contentVisibility,
            navigation,
            setIsSearchMode,
            // {
            //   height: dimensions.height * 1,
            //   top: dimensions.height * 0.05,
            //   visibility: 1,
            // },
          )}
          onChangeText={searchProduct}
          saveSearch={saveSearch}
          cancelSearch={cancelSearchHandler}
        />
        {/* <IconButton
          name={'filter'}
          size={22}
          color={themeColors.primaryGray}
          containerStyles={styles.sortIconContainerStyle}
          iconStyles={styles.sortIconStyle}
        /> */}
      </View>

      {isSearchMode && (
        <View style={[styles.mainDiv]}>
          <FlatList
            data={flatlistArrray}
            keyExtractor={(item, index) => index + 11}
            renderItem={({item}) => item}
            contentContainerStyle={{paddingBottom: '30%'}}
            ItemSeparatorComponent={
              <SeperatorLine
                width={'100%'}
                style={styles.separatorLine}
                color={themeColors.primaryGrayLight}
              />
            }
          />
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ...CommonStyles,
  searchAndSortDiv: {
    marginVertical: '5.5%',
    marginHorizontal: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  searchHeading: {
    marginLeft: '8%',
  },
  closeIconDiv: {
    marginLeft: '6%',
    marginVertical: '2%',
  },
  mainDiv: {
    // backgroundColor: 'red',
    flex: 1,
    // paddingHorizontal: '8%',
  },
  heading: {
    fontSize: 20,
    fontFamily: FontFamilies.primaryFontsSemiBold,
    alignSelf: 'flex-start',
    marginBottom: '2%',
  },
  headingBarDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '8%',
  },
  clearButton: {
    fontFamily: FontFamilies.primaryFontsMedium,
    color: themeColors.primaryColorDark,
    fontSize: 16,
  },
  searchItemDiv: {
    flexDirection: 'row',
    marginVertical: '2%',
    paddingVertical: '1%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchItemText: {
    fontFamily: FontFamilies.primaryFontsMedium,
    fontSize: 20,
    color: themeColors.primaryBlack,
  },
  searchedDivIcon: {
    transform: [{rotateZ: '-45deg'}],
  },
  separatorLine: {
    height: 5,
    marginVertical: '5%',
  },
});
