
import { CreateProduct } from '../types/Product'
import axios from 'axios'


// for creating a product
const CreateProductRequest = product => {
  return {
    type: CreateProduct.CREATE_PRODUCT_REQUEST,
    payload: product
  }
}

const CreateProductSuccess = () => {
  return {
    type: CreateProduct.CREATE_PRODUCT_SUCCESS,
  }
}

const CreateProductValidationError = message => {
  return {
    type: CreateProduct.CREATE_PRODUCT_SUCCESS,
    payload: message
  }
}

const CreateProductFailure = error => {
  return {
    type: CreateProduct.CREATE_PRODUCT_FAILURE,
    payload: error
  }
}

export const createProduct = (product) => {
  // thanks to the thunk package we can return a function inside this function
  return (dispatch) =>  {
    dispatch(CreateProductRequest(product))
    axios.post(`/api/add_product/`, product)
      .then(response => {
        switch (response.data.status) {
          case 422:
            dispatch(CreateProductValidationError(response.data.errors)); break;
          case 200: case 201:
            dispatch(CreateProductSuccess()); break;
        }
      })
      .catch(error => {
        dispatch(CreateProductFailure(error.message))
      })
  }
}
