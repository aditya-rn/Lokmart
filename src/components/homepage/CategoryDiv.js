import {StyleSheet, View} from 'react-native';
import CategoryHeadingBar from '../category/CategoryHeadingBar';
import CategoryList from '../category/CategoryList';

export default CategoryDiv = ({categories}) => (
  <>
    <CategoryHeadingBar category={'Categories'} />
    {categories.length != 0 && (
      <View style={styles.categoriesDiv}>
        <CategoryList isHorizontal categories={categories} />
      </View>
    )}
  </>
);

const styles = StyleSheet.create({
  categoriesDiv: {
    marginVertical: '5%',
  },
});
