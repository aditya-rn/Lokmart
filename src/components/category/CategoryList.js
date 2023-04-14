import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImageStrings from '../../constants/strings/ImageStrings';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';
import {data} from '../constants/Data';
const dimensions = Dimensions.get('screen');

export default CategoryList = ({isHorizontal = false, categories}) => {
  const renderItems = ({item, index}) => (
    <View style={styles.categoryItemDiv}>
      <View style={styles.categoryImageDiv}>
        <Image
          source={ImageStrings.categoriesImages[index % 5].image}
          resizeMode="contain"
          style={[
            styles.categoryImage,
            isHorizontal && {
              height: dimensions.height * 0.07,
              width: dimensions.height * 0.07,
            },
          ]}
        />
      </View>
      <Text style={styles.categoryName}>{item}</Text>
      {/* <Text style={styles.total}>{item} Items</Text> */}
    </View>
  );

  return (
    <View styles={styles.mainDiv}>
      <FlatList
        data={categories}
        renderItem={renderItems}
        keyExtractor={(item, index) => index}
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          isHorizontal
            ? styles.flatListStylesHorizontal
            : styles.flatListStylesHorizontal
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: 'red',
  },
  flatListStylesHorizontal: {
    paddingHorizontal: Platform.OS == 'android' ? '4%' : '5%',
  },
  categoryItemDiv: {
    // backgroundColor: 'lightblue',
    marginHorizontal: dimensions.height * 0.01,
    flex: 1,
  },
  categoryImage: {
    height: '100%',
    width: '100%',
  },
  categoryImageDiv: {
    borderWidth: 1,
    borderRadius: 14,
    height: dimensions.height * 0.11,
    width: dimensions.height * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: themeColors.primaryGray,
  },
  categoryName: {
    fontFamily: FontFamilies.primaryFontsSemiBold,
    fontSize: 18,
    color: themeColors.primaryBlack,
    marginTop: dimensions.height * 0.015,
  },
  total: {
    fontFamily: FontFamilies.primaryFontsRegular,
    fontSize: 14,
    color: themeColors.primaryGray,
  },
});
