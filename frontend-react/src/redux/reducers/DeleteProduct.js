
import { // each has (requet, success, failure)
    DeleteProduct,
  } from '../types/Product'


  const initialState = {
    loading: false,
    success: false,
    message: '',
    error: ''
  }

export  const deleteProductReducer = (state = initialState, action) => {
    switch (action.type) {

      // DELETE A PRODUCT
      case DeleteProduct.DELETE_PRODUCT_REQUEST: return {
        ...state,
        loading: true
      }
      case DeleteProduct.DELETE_PRODUCT_SUCCESS: return {
        loading: false,
        success: true,
        message: action.payload,
      }
      case DeleteProduct.DELETE_PRODUCT_FAILURE: return {
        loading: false,
        success: false,
        error: action.payload
      }
      case DeleteProduct.RESET_DELETE_PRODUCT: return {
        loading: false,
        success: false,
        message: '',
        error: ''
      }

      default: return state; break;
    }
  }

  export default deleteProductReducer
