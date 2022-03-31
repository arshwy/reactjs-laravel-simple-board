
import { // each has (requet, success, failure)
    GetProducts,
  } from '../types/Product'


  const initialState = {
    loading: false,
    products: [],
    success: false,
    message: '',
    error: ''
  }

export  const getProductReducer = (state = initialState, action) => {
    switch (action.type) {

      // GET PRODUCTS
      case GetProducts.GET_PRODUCTS_REQUEST: return {
        ...state,
        loading: true
      }
      case GetProducts.GET_PRODUCTS_SUCCESS: return {
        loading: false,
        products: action.payload,
        success: true,
        message: ''
      }
      case GetProducts.GET_PRODUCTS_FAILURE: return {
        loading: false,
        success: false,
        products: [],
        error: action.payload
      }

      default: return state; break;
    }
  }

  export default getProductReducer
