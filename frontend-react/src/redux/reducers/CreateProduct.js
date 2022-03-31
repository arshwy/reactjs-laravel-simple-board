
import { CreateProduct } from '../types/Product'


const initialState = {
  loading: false,
  success: false,
  validationError: false,
  message: '',
  error: '',
}

export const createProductReducer = (state = initialState, action) => {
  switch (action.type) {

    // CREATE A PRODUCT
    case CreateProduct.CREATE_PRODUCT_REQUEST: return {
      ...state, loading: true,
    };
    case CreateProduct.CREATE_PRODUCT_SUCCESS: return {
      loading: false,
      success: true,
      message: action.payload,
    }
    case CreateProduct.CREATE_PRODUCT_VALIDATION_ERROR: return {
      loading: false,
      success: false,
      validationError: true,
      error: action.payload
    }
    case CreateProduct.CREATE_PRODUCT_FAILURE: return {
      loading: false,
      success: false,
      error: action.payload
    }

    default: return state; break;
  }
}

export default createProductReducer
