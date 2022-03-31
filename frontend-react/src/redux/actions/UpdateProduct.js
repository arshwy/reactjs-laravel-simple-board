
import { UpdateProduct } from '../types/Product'
import axios from 'axios'


// for updating a product
const UpdateProductRequest = () => {
  return {
    type: UpdateProduct.UPDATE_PRODUCT_REQUEST
  }
}

const UpdateProductSuccess = message => {
  return {
    type: UpdateProduct.UPDATE_PRODUCT_SUCCESS,
    payload: message
  }
}

const UpdateProductValidationError = message => {
  return {
    type: UpdateProduct.UPDATE_PRODUCT_VALIDATION_ERROR,
    payload: message
  }
}

const UpdateProductFailure = error => {
  return {
    type: UpdateProduct.UPDATE_PRODUCT_FAILURE,
    payload: error
  }
}

const ResetInitials = () => {
  return {
    type: UpdateProduct.RESET_UPDATE_PRODUCT
  }
}

export const updateProduct = (product) => {
  // thanks to the thunk package we can return a function inside this function
  console.log("Pr:: ", product);
  const p = new FormData();
  return (dispatch) =>  {
    dispatch(UpdateProductRequest())
    axios.post(`/api/update_product/`, product)
      .then(response => {
        switch (response.data.status) {
          case 422:
            dispatch(UpdateProductValidationError(response.data.errors)); break;
          case 200: case 201:
            dispatch(UpdateProductSuccess());
            setTimeout(() => {
              dispatch(ResetInitials());
            }, 2000);
            break;
        }
      })
      .catch(error => {
        dispatch(UpdateProductFailure(error.message))
      })
  }
}
