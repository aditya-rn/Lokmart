import {Text, StyleSheet, View, FlatList, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontFamilies from '../../constants/styles/FontFamilies';
import {themeColors} from '../../constants/styles/ThemeColors';
import CategoryProductListVertical from '../category/CategoryProductListVertical';
import Heading from '../Heading';
import TextButton from '../TextButton';

export default RecentSearch = ({
  searchedArray = ['Potato', 'Local Fresh French fry', 'Fresh Fish'],
}) => {
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

  const HeadingBar = ({text, haveRightButton = false}) => (
    <View style={styles.headingBarDiv}>
      <Heading text={text} containerStyles={styles.heading} />
      {haveRightButton && (
        <TextButton text={'Clear All'} style={styles.clearButton} />
      )}
    </View>
  );

  return (
    <View style={[styles.mainDiv]}>
      {/* <HeadingBar text={'Recent Search'} haveRightButton />
      <FlatList
        data={searchedArray}
        renderItem={({item}) => <SearchedItem data={item} />}
        keyExtractor={({index}) => index}
      /> */}
      <HeadingBar text={'Search Result'} />
      {/* <CategoryProductListVertical categoryObject={} /> */}
    </View>
  );
};
const styles = StyleSheet.create({});
