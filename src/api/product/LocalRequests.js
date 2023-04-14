import {filterOptions} from '../../constants/strings/ConstantDataStrings';

export const searchProductLocally = (
  products,
  searchText,
  filterConditions,
) => {
  console.log('filterConditions');
  console.log(filterConditions);
  if (!searchText) {
    if (
      !!filterConditions.ratingSelected ||
      filterConditions.discountSelected ||
      filterConditions.otherSelected ||
      filterConditions.categorySelecetd
    ) {
      const arrayGot = filterFunction([...products], {...filterConditions});

      console.log('running in!!');
      if (arrayGot.length != 0) {
        return {
          isError: false,
          products: [...arrayGot],
        };
      }
      return {
        isError: true,
        error: `No Product in this Filter !!`,
      };
    }
    return {
      isError: false,
      products: [...products],
    };
  }

  const pattern = new RegExp(searchText, 'i');
  const filteredArray = products.filter(
    item =>
      item.title.match(pattern) ||
      item.brand.match(pattern) ||
      item.category.match(pattern),
  );
  let finalArray = [...filteredArray];

  if (
    !!filterConditions.ratingSelected ||
    filterConditions.discountSelected ||
    filterConditions.otherSelected ||
    filterConditions.categorySelecetd
  ) {
    const arrayGot = filterFunction(finalArray, {...filterConditions});
    finalArray = [...arrayGot];
    console.log('running in!!');
  }

  if (finalArray.length == 0 || !finalArray) {
    return {
      isError: true,
      error: `No Product named "${searchText}" Found !!`,
    };
  }
  return {
    isError: false,
    products: [...finalArray],
  };
};

const filterFunction = (array, filterConditions) => {
  console.log('filterConditions');
  console.log(filterConditions);
  const finalArray = array.filter(item => {
    if (
      (!!filterConditions.ratingSelected
        ? Number(filterConditions.ratingSelected) <= Number(item.rating) &&
          Number(item.rating) <= filterConditions.ratingSelected + 1
        : true) &&
      (!!filterConditions.discountSelected
        ? Number(filterOptions.discount[filterConditions.discountSelected]) <=
            Number(item.discountPercentage) &&
          Number(item.discountPercentage) <=
            Number(
              filterOptions.discount[filterConditions.discountSelected + 1],
            )
        : true) &&
      // (!!filterConditions.otherSelected
      //   ? filterConditions.otherSelected == item
      //   : true) &&
      (!!filterConditions.categorySelecetd
        ? filterConditions.categorySelecetd == item.category
        : true) &&
      (!!filterConditions.priceRange
        ? filterConditions.priceRange[0] <= item.price &&
          item.price <= filterConditions.priceRange[1]
        : true)
    ) {
      // console.log('running in2');
      // console.log(item);
      return {...item};
    }
  });
  console.log('finalArray');
  console.log(finalArray);

  return [...finalArray];
};
