
import { DeleteProduct } from '../types/Product'
import axios from 'axios'


// for deleting a product
const DeleteProductRequest = pid => {
  return {
    type: DeleteProduct.DELETE_PRODUCT_REQUEST,
    payload: pid
  }
}
const DeleteProductSuccess = message => {
  return {
    type: DeleteProduct.DELETE_PRODUCT_SUCCESS,
    payload: message
  }
}
const DeleteProductFailure = error => {
  return {
    type: DeleteProduct.DELETE_PRODUCT_FAILURE,
    payload: error
  }
}
export const deleteProduct = (data) => {
  // thanks to the thunk package we can return a function inside this function
  return (dispatch) =>  {
    dispatch(DeleteProductRequest(data.product_id))
    axios.post(`/api/delete_product/`, data)
      .then(response => {
        dispatch(DeleteProductSuccess("One product has been deleted successfully!"))
      })
      .catch(error => {
        dispatch(DeleteProductFailure(error.message))
      })
  }
}
