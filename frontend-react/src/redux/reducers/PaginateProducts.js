import { // each has (requet, success, failure)
    PaginateProducts,
  } from '../types/Product'


  const initialState = {
    loading: false,
    products: [],
    error: '',
    current_page: 1,
    last_page: null,
    next_page_url: null,
    prev_page_url: null,
    total: null,
    from: null,
    to: null
  }

export  const paginateProductReducer = (state = initialState, action) => {
    switch (action.type) {

      // PAGINATE PRODUCTS
      case PaginateProducts.PAGINATE_PRODUCTS_REQUEST: return {
        ...state,
        loading: true
      }
      case PaginateProducts.PAGINATE_PRODUCTS_SUCCESS: return {
        loading: false,
        products: action.payload,
        current_page: action.current_page,
        last_page: action.last_page,
        next_page_url: action.next_page_url,
        prev_page_url: action.prev_page_url,
        total: action.total,
        from: action.from,
        to: action.to,
        error:''
      }
      case PaginateProducts.PAGINATE_PRODUCTS_FAILURE: return {
        loading: false,
        products: [],
        error: action.payload
      }

      default: return state; break;
    }
  }

  export default paginateProductReducer
