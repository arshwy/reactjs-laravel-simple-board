import { // each has (requet, success, failure)
    UpdateProduct,
  } from '../types/Product'


  const initialState = {
    loading: false,
    success: false,
    validationError: false,
    message: '',
    error: '',
  }

export  const updateProductReducer = (state = initialState, action) => {
    switch (action.type) {

      // UPDATE A PRODUCT
      case UpdateProduct.UPDATE_PRODUCT_REQUEST: return {
        ...state, loading: true,
      }
      case UpdateProduct.UPDATE_PRODUCT_SUCCESS: return {
        loading: false,
        success: true,
        message: action.payload,
      }
      case UpdateProduct.UPDATE_PRODUCT_VALIDATION_ERROR: return {
        loading: false,
        success: false,
        validationError: true,
        error: action.payload
      }
      case UpdateProduct.UPDATE_PRODUCT_FAILURE: return {
        loading: false,
        success: false,
        error: action.payload
      }
      case UpdateProduct.RESET_UPDATE_PRODUCT: return {
        loading: false,
        success: false,
        validationError: false,
        message: '',
        error: '',
      }

      default: return state; break;
    }
  }

  export default updateProductReducer
