import CategoryHeadingBar from '../category/CategoryHeadingBar';
import CategoryProductListHorizontal from '../category/CategoryProductListHorizontal';

export default RandomCategoryDiv = ({randomCategoryProduct}) => (
  <>
    <CategoryHeadingBar category={randomCategoryProduct.categoryName} />
    {!!randomCategoryProduct.products && (
      <CategoryProductListHorizontal
        categoryObject={{...randomCategoryProduct}}
      />
    )}
  </>
);
