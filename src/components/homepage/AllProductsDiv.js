import CategoryHeadingBar from '../category/CategoryHeadingBar';
import CategoryProductListVertical from '../category/CategoryProductListVertical';

export default AllProductsDiv = ({allProducts, setIsLoading, setEndOfPage}) => (
  <>
    <CategoryHeadingBar category={'All Products'} disableRightButton />
    {!!allProducts.products && (
      <CategoryProductListVertical
        categoryObject={{...allProducts}}
        isStaticList={false}
        setIsLoading={setIsLoading}
        setEndOfPage={setEndOfPage}
      />
    )}
  </>
);
