
import { GetProducts } from '../types/Product'
import axios from 'axios'

// for getting the products
const GetProductsRequest = () => {
  return {
    type: GetProducts.GET_PRODUCTS_REQUEST
  }
}
const GetProductsSuccess = products => {
  return {
    type: GetProducts.GET_PRODUCTS_SUCCESS,
    payload: products
  }
}
const GetProductsFailure = error => {
  return {
    type: GetProducts.GET_PRODUCTS_FAILURE,
    payload: error
  }
}
export const getProducts = () => {
  // thanks to the thunk package we can return a function inside this function
  return (dispatch) =>  {
    dispatch(GetProductsRequest())
    axios.get(`/api/get_all_products/`)
      .then(response => {
        dispatch(GetProductsSuccess(response.data.products))
      })
      .catch(error => {
        dispatch(GetProductsFailure(error.message))
      })
  }
}
