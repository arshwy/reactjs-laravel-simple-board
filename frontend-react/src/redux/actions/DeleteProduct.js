
import { DeleteProduct } from '../types/Product'
import axios from 'axios'


// for deleting a product
const DeleteProductRequest = pid => {
  return {
    type: DeleteProduct.DELETE_PRODUCT_REQUEST,
    payload: pid
  }
}
const DeleteProductSuccess = () => {
  return {
    type: DeleteProduct.DELETE_PRODUCT_SUCCESS,
    payload: ''
  }
}
const DeleteProductFailure = error => {
  return {
    type: DeleteProduct.DELETE_PRODUCT_FAILURE,
    payload: error
  }
}

const ResetInitials = () => {
  return {
    type: DeleteProduct.RESET_DELETE_PRODUCT
  }
}



export const deleteProduct = (data) => {
  // thanks to the thunk package we can return a function inside this function
  return (dispatch) =>  {
    dispatch(DeleteProductRequest(data.product_id))
    axios.post(`/api/delete_product/`, data)
      .then(response => {
        dispatch(DeleteProductSuccess())
        setTimeout(() => {
          dispatch(ResetInitials());
        }, 2000);
      })
      .catch(error => {
        dispatch(DeleteProductFailure(error.message))
      })
  }
}
