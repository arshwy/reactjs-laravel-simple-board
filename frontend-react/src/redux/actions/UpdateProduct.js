
import { UpdateProduct } from '../types/Product'
import axios from 'axios'


// for updating a product
const UpdateProductRequest = product => {
  return {
    type: UpdateProduct.UPDATE_PRODUCT_REQUEST,
    payload: product
  }
}
const UpdateProductSuccess = message => {
  return {
    type: UpdateProduct.UPDATE_PRODUCT_SUCCESS,
    payload: message
  }
}
const UpdateProductFailure = error => {
  return {
    type: UpdateProduct.UPDATE_PRODUCT_FAILURE,
    payload: error
  }
}
export const updateProduct = (product) => {
  // thanks to the thunk package we can return a function inside this function
  return (dispatch) =>  {
    dispatch(UpdateProductRequest(product))
    axios.post(`/api/update_product/`, product)
      .then(response => {
        dispatch(UpdateProductSuccess("One element has been updated successfully!"))
      })
      .catch(error => {
        dispatch(UpdateProductFailure(error.message))
      })
  }
}
