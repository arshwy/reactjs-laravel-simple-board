
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
    type: CreateProduct.CREATE_PRODUCT_VALIDATION_ERROR,
    payload: message
  }
}

const CreateProductFailure = error => {
  return {
    type: CreateProduct.CREATE_PRODUCT_FAILURE,
    payload: error
  }
}

const ResetInitials = () => {
  return {
    type: CreateProduct.RESET_CREATE_PRODUCT
  }
}

export const createProduct = (product) => {
  // thanks to the thunk package we can return a function inside this function
  console.log("Pr:: ", product);
  const p = new FormData();
  p.append('name', product.name);
  p.append('description', product.description);
  p.append('price', product.price);
  p.append('image', product.image);
  return (dispatch) =>  {
    dispatch(CreateProductRequest(product))
    axios.post(`/api/add_product/`, p)
      .then(response => {
        switch (response.data.status) {
          case 422:
            dispatch(CreateProductValidationError(response.data.errors)); break;
          case 200: case 201:
            dispatch(CreateProductSuccess());
            setTimeout(() => {
              dispatch(ResetInitials());
            }, 2000);
            break;
        }
      })
      .catch(error => {
        dispatch(CreateProductFailure(error.message))
      })
  }
}
