import {createSelectorCreator} from 'reselect';

const PRODUCT_BASE_URL = `https://dummyjson.com/products`;
const PRODUCT_CART_URL = `https://dummyjson.com/carts`;

export const getAllCategory = async () => {
  try {
    const response = await fetch(`${PRODUCT_BASE_URL}/categories`);
    const categories = await response.json();
    return {
      isError: false,
      categories,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const getAllProductOfCategory = async (
  category = '',
  limit = 5,
  skip = 0,
) => {
  try {
    let products;
    if (!!category) {
      const response = await fetch(`${PRODUCT_BASE_URL}/category/${category}`);
      products = await response.json();
    } else {
      const response = await fetch(
        `${PRODUCT_BASE_URL}?limit=${limit}&skip=${skip}`,
      );
      products = await response.json();
    }
    if (products.products.length == 0) {
      return {
        isError: true,
        error: 'EndOfPage',
      };
    }
    let maximumPriceProduct = 500;
    let minimumPriceProduct = 0;
    products.products.forEach(element => {
      if (element.price < minimumPriceProduct) {
        minimumPriceProduct = element.price;
      }
      if (element.price > maximumPriceProduct) {
        maximumPriceProduct = element.price;
      }
    });

    return {
      isError: false,
      products: {
        ...products,
        maximumPriceProduct: maximumPriceProduct,
        minimumPriceProduct: minimumPriceProduct,
      },
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const addToCart = async (cartGot, newProduct) => {
  try {
    let arrayToSend = [];

    if (!!cartGot.products) {
      arrayToSend = findAndAdd(cartGot.products, {
        id: newProduct.id,
        quantity: newProduct.quantity,
      });
    } else {
      arrayToSend = [{id: newProduct.id, quantity: newProduct.quantity}];
    }

    const response = await fetch(`${PRODUCT_CART_URL}/1`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: 21,
        products: [...arrayToSend],
      }),
    });
    const cart = await response.json();
    const cartArray = cart.products.map(item => {
      return {id: item.id, quantity: item.quantity};
    });

    return {
      isError: false,
      cart: {...cart, products: cartArray},
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

const findAndAdd = (cartArray, newObject) => {
  let occurance = false;
  let temp = [];

  temp = cartArray.map(item => {
    if (item.id == newObject.id) {
      occurance = true;
      return {id: item.id, quantity: item.quantity + newObject.quantity};
    } else {
      return {id: item.id, quantity: item.quantity};
    }
  });
  if (!occurance) {
    temp = [...cartArray, {id: newObject.id, quantity: newObject.quantity}];
  }

  return [...temp];
};

export const removeFromCart = async (cartGot, productToRemove) => {
  try {
    let arrayToSend = [];

    if (productToRemove.quantity == 1) {
      arrayToSend = cartGot.filter(item => item.id != productToRemove.id);
    } else {
      arrayToSend = cartGot.map(item => {
        if (item.id == productToRemove.id) {
          return {...item, quantity: item.quantity - 1};
        } else {
          return {...item};
        }
      });
    }

    const response = await fetch(`${PRODUCT_CART_URL}/1`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: 21,
        products: [...arrayToSend],
      }),
    });
    const cart = await response.json();
    const cartArray = cart.products.map(item => {
      return {id: item.id, quantity: item.quantity};
    });

    return {
      isError: false,
      cart: {...cart, products: cartArray},
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const getAllProductsFromId = async cartArray => {
  try {
    let arrayToReturn = [];
    for (let i = 0; i < cartArray.length; i++) {
      const response = await fetch(`${PRODUCT_BASE_URL}/${cartArray[i].id}`);
      const product = await response.json();
      arrayToReturn.push({...product, quantity: cartArray[i].quantity});
    }
    return {
      isError: false,
      products: arrayToReturn,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};
