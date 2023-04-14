import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  NativeModules,
  FlatList,
  Pressable,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {filterOptions} from '../../constants/strings/ConstantDataStrings';
import CommonStyles from '../../constants/styles/CommonStyles';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';
import CustomButton from '../CustomButton';
import GradientButton from '../GradientButton';
import Heading from '../Heading';
import IconButton from '../IconButton';
import SeperatorLine from '../productCard/SeperatorLine';
import TextButton from '../TextButton';
import {expandModal, shrinkModal} from './animationFunction';

const dimensions = Dimensions.get('screen');
export default FilterPage = ({
  isSearchMode,
  expandSearch,
  minMaxPrice,
  filterConditionsSetterFunction,
  categories = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting',
  ],
}) => {
  const StatusBarHeight = NativeModules.StatusBarManager.HEIGHT;
  const navigation = useNavigation();
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [ratingSelected, setRatingSelected] = useState();
  const [discountSelected, setDiscountSelected] = useState();
  const [otherSelected, setOtherSelected] = useState([]);
  const [categorySelecetd, setCategorySelecetd] = useState();
  const [sliderValue, setsliderValue] = useState([
    minMaxPrice[0],
    minMaxPrice[1],
  ]);

  const filterModalDimesions = useRef(
    new Animated.ValueXY({
      x: dimensions.height * 0.065,
      y: dimensions.width * 0.145,
    }),
  ).current;
  const filterModalTop = useRef(
    new Animated.ValueXY({
      x: dimensions.height * 0.175,
      y: dimensions.width * 0.07,
    }),
  ).current;
  const contentVisibility = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // checkAndExpand();
  }, []);

  const setterFunction = (field, value) => {
    switch (field) {
      case 'rating':
        setRatingSelected(value);
        break;
      case 'discount':
        setDiscountSelected(value);
        break;
      case 'other':
        if (otherSelected.includes(value)) {
          let temparr = otherSelected.filter(itemGot => itemGot != value);
          setOtherSelected([...temparr]);
        } else {
          setOtherSelected(pre => [...pre, value]);
        }
        break;
      case 'category':
        setCategorySelecetd(value);
        break;

      default:
        break;
    }
  };
  const setFilters = () => {
    let obj = {};
    if (!!ratingSelected) {
      obj.ratingSelected = ratingSelected;
    }
    if (!!discountSelected) {
      obj.discountSelected = discountSelected;
    }
    if (!!otherSelected) {
      obj.otherSelected = otherSelected;
    }
    if (!!categorySelecetd) {
      obj.categorySelecetd = categorySelecetd;
    }
    if (!!sliderValue) {
      obj.priceRange = [...sliderValue];
    }
    filterConditionsSetterFunction({...obj});
    shrinkModal(
      filterModalDimesions,
      filterModalTop,
      contentVisibility,
      navigation,
      setIsFilterMode,
      {
        x: dimensions.height * 0.065,
        y: dimensions.width * 0.145,
        x1: dimensions.height * 0.175,
        y1: dimensions.width * 0.07,

        visibility: 0,
      },
      true,
    );
  };
  const resetFilter = () => {
    setRatingSelected();
    setDiscountSelected();
    setOtherSelected([]);
    setCategorySelecetd();
  };

  const HeadingCompoent = () => (
    <View style={styles.headingDiv}>
      <IconButton
        name={'close'}
        size={35}
        color={themeColors.primaryBlack}
        containerStyles={styles.closeIconStyle}
        onPress={() =>
          shrinkModal(
            filterModalDimesions,
            filterModalTop,
            contentVisibility,
            navigation,
            setIsFilterMode,
            {
              x: dimensions.height * 0.065,
              y: dimensions.width * 0.145,
              x1: dimensions.height * 0.175,
              y1: dimensions.width * 0.07,
              visibility: 0,
            },
            true,
          )
        }
      />
      <Heading
        text={'Filter Options'}
        isCenter={false}
        containerStyles={styles.heading}
      />
      <TextButton
        text={'Reset'}
        style={styles.resetButton}
        onPress={resetFilter}
      />
    </View>
  );
  const SubHeading = ({headingLabel}) => (
    <Heading
      text={headingLabel}
      isCenter={false}
      containerStyles={styles.subHeadingTextStyle}
    />
  );
  const RadioButtonComponent = ({isSelected}) => (
    <Icon
      name={isSelected ? 'radio-button-on' : 'radio-button-off'}
      size={25}
      color={
        isSelected ? themeColors.primaryColorDark : themeColors.primaryGray
      }
    />
  );
  const CheckBoxButtonComponent = ({isSelected = false}) => (
    <Icon
      name={isSelected ? 'checkbox' : 'square-outline'}
      size={25}
      color={
        isSelected ? themeColors.primaryColorDark : themeColors.primaryGray
      }
    />
  );

  const PriceSliderThumb = ({thumbProps}) => {
    return (
      <>
        <View style={thumbProps.markerStyle}>
          <Text style={styles.thumbValue}>${thumbProps.currentValue}</Text>
        </View>
      </>
    );
  };
  const changeSliderValue = value => {
    let minValue = value[0] < value[1] ? value[0] : value[1];
    if (value[1] - value[0] <= 150) {
      minValue = minValue + 150 >= minMaxPrice[1] ? value[1] - 150 : minValue;
      setsliderValue([minValue, minValue + 150]);
      return;
    }
    setsliderValue(value);
  };

  const PriceRangeComponent = () => {
    return (
      <>
        <SubHeading headingLabel={'Sort By Price Range'} />
        <MultiSlider
          values={sliderValue}
          max={minMaxPrice[1]}
          min={minMaxPrice[0]}
          // minMarkerOverlapDistance={dimensions.width * 0.15}
          onValuesChangeFinish={changeSliderValue}
          containerStyle={styles.priceSlider}
          selectedStyle={styles.priceSliderSelectedStyles}
          markerStyle={styles.priceSliderThumbStyle}
          sliderLength={dimensions.width * 0.75}
          customMarker={thumbProps => {
            return <PriceSliderThumb thumbProps={thumbProps} />;
          }}
        />
      </>
    );
  };
  const StarFilterComponent = () => {
    const array = [];
    for (
      let i = filterOptions.ratingStars.min;
      i < filterOptions.ratingStars.max;
      i++
    ) {
      array.push(i);
    }
    const renderItems = ({item}) => (
      <CustomButton
        style={styles.radioButtonItemComponent}
        onPress={setterFunction.bind(this, 'rating', item)}>
        <Text style={styles.ratingText}>
          {item} - {item + 1} Stars
        </Text>
        <RadioButtonComponent isSelected={item == ratingSelected} />
      </CustomButton>
    );
    return (
      <>
        <SubHeading headingLabel={'Sort By Price Rating'} />
        <FlatList
          data={array}
          renderItem={renderItems}
          keyExtractor={(item, index) => index + '111'}
        />
      </>
    );
  };
  const DiscountFilterComponent = () => {
    const renderItems = ({item, index}) => {
      if (index > filterOptions.discount.length - 2) {
        return;
      } else {
        return (
          <CustomButton
            style={styles.radioButtonItemComponent}
            onPress={setterFunction.bind(this, 'discount', index)}>
            <Text style={styles.ratingText}>
              {item}
              {index == filterOptions.discount.length - 2
                ? ' % above'
                : '-' + filterOptions.discount[index + 1] + ' %'}
            </Text>
            <RadioButtonComponent isSelected={index == discountSelected} />
          </CustomButton>
        );
      }
    };
    return (
      <>
        <SubHeading headingLabel={'Sort By Price Discount'} />
        <FlatList
          data={filterOptions.discount}
          renderItem={renderItems}
          keyExtractor={(item, index) => index + '1111'}
        />
      </>
    );
  };
  const CategoryFilterComponent = () => {
    const renderItems = ({item}) => {
      return (
        <CustomButton
          style={styles.radioButtonItemComponent}
          onPress={setterFunction.bind(this, 'category', item)}>
          <Text style={styles.ratingText}>{item}</Text>
          <RadioButtonComponent isSelected={item == categorySelecetd} />
        </CustomButton>
      );
    };
    return (
      <>
        <SubHeading headingLabel={'Sort By Price Category'} />
        <FlatList
          data={categories}
          renderItem={renderItems}
          keyExtractor={(item, index) => index + '1111'}
        />
      </>
    );
  };
  const OtherFilterComponent = () => {
    const renderItems = ({item, index}) => {
      return (
        <CustomButton
          onPress={setterFunction.bind(this, 'other', item)}
          style={[
            styles.radioButtonItemComponent,
            styles.checkboxItemComponent,
            index % 2 == 1 && {marginLeft: '-4%'},
          ]}>
          <CheckBoxButtonComponent isSelected={otherSelected.includes(item)} />
          <Text style={[styles.ratingText, styles.checkBoxText]}>{item}</Text>
        </CustomButton>
      );
    };
    return (
      <>
        <SubHeading headingLabel={'Sort By Others'} />
        <FlatList
          data={filterOptions.others}
          renderItem={renderItems}
          keyExtractor={(item, index) => index + '1111'}
          numColumns={2}
        />
      </>
    );
  };

  const flatlistArray = [
    <PriceRangeComponent />,
    <StarFilterComponent />,
    <DiscountFilterComponent />,
    <OtherFilterComponent />,
    <CategoryFilterComponent />,
  ];

  const checkAndExpand = () => {
    expandSearch();
    expandModal(
      filterModalDimesions,
      filterModalTop,
      contentVisibility,
      navigation,
      setIsFilterMode,
      {
        x: dimensions.height,
        y: dimensions.width,
        x1: 0,
        y1: 0,
        visibility: 1,
      },
      true,
    );
  };

  return (
    <Animated.View
      ref={[filterModalDimesions, filterModalTop]}
      style={[
        isFilterMode && styles.pageStyle,
        isFilterMode && styles.conatiner,
        {
          height: filterModalDimesions.x,
          width: filterModalDimesions.y,
          position: 'absolute',
          top: filterModalTop.x,
          //   top: 0,
          right: filterModalTop.y,
          zIndex: 10,
          // alignItems: 'center',
          // justifyContent: 'center',
        },
      ]}>
      {!isFilterMode && (
        <IconButton
          name={'filter'}
          size={22}
          color={themeColors.primaryGray}
          containerStyles={[styles.sortIconContainerStyle]}
          onPress={checkAndExpand}
        />
      )}
      {isFilterMode && (
        <Animated.View
          ref={contentVisibility}
          style={{flex: 1, opacity: contentVisibility}}>
          <HeadingCompoent />
          <FlatList
            data={flatlistArray}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => item}
            ItemSeparatorComponent={
              <SeperatorLine
                width={'87%'}
                style={styles.seperatorLineStyle}
                color={themeColors.primaryGrayLight}
              />
            }
            contentContainerStyle={styles.listStyle}
            showsVerticalScrollIndicator={false}
          />
          <GradientButton
            title={'Apply Filter'}
            containerStyle={styles.floatingButton}
            onPress={setFilters}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  ...CommonStyles,
  headingDiv: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5%',
  },
  heading: {
    flex: 1,
  },
  closeIconStyle: {
    marginHorizontal: '5%',
  },
  resetButton: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 18,
    color: themeColors.primaryColorDark,
    marginHorizontal: '5%',
  },
  subHeadingTextStyle: {
    // backgroundColor: 'red',
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 18,
    color: themeColors.primaryBlack,
    marginHorizontal: '5%',
    textTransform: 'uppercase',
    letterSpacing: 0.06,
    marginLeft: '7%',
    marginBottom: '5%',
  },
  seperatorLineStyle: {
    alignSelf: 'center',
    height: 2,
    marginVertical: '5%',
  },
  radioButtonItemComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '7%',
    marginVertical: '2.5%',
    flex: 1,
  },
  checkboxItemComponent: {
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
    // marginRight: '3%',
  },
  checkBoxText: {
    marginLeft: '5%',
    width: '85%',
  },
  ratingText: {
    fontFamily: FontFamilies.primaryFontsMedium,
    fontSize: 18,
    color: themeColors.primaryBlack,
  },
  listStyle: {
    paddingBottom: '30%',
  },

  sortIconContainerStyle: {
    borderWidth: Platform.OS == 'android' ? 1 : 0.5,
    borderRadius: 14,
    borderColor: themeColors.primaryGray,
    alignItems: 'center',
    flex: 1,
    zIndex: 100,
    justifyContent: 'center',
  },
  priceSlider: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  priceSliderSelectedStyles: {
    backgroundColor: themeColors.primaryColorDark,
    height: 3,
  },
  priceSliderThumbStyle: {
    backgroundColor: themeColors.primaryColorDark,
    borderColor: themeColors.primaryBackground,
    borderWidth: 3,
    height: 27,
    width: 27,
    borderRadius: 100,
  },
  thumbValue: {
    position: 'absolute',
    top: -27,
    fontFamily: FontFamilies.primaryFontsSemiBold,
    color: themeColors.primaryGray,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
    width: 60,
  },
});
