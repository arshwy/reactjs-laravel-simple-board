
import { PaginateProducts } from '../types/Product'
import axios from 'axios'

// for paginating the products
const PaginateProductsRequest = ({productsPerPage, currentPage}) => {
  return {
    type: PaginateProducts.PAGINATE_PRODUCTS_REQUEST,
    payload: productsPerPage,
  }
}

const PaginateProductsSuccess = products => {
  return {
    type: PaginateProducts.PAGINATE_PRODUCTS_SUCCESS,
    payload: products.data,
    current_page: products.current_page,
    last_page: products.last_page,
    next_page_url: products.next_page_url,
    prev_page_url: products.prev_page_url,
    total: products.total,
    from: products.from,
    to: products.to
  }
}


const PaginateProductsFailure = error => {
  return {
    type: PaginateProducts.PAGINATE_PRODUCTS_FAILURE,
    payload: error
  }
}


export const paginateProducts = ({productsPerPage, currentPage}) => {
  // thanks to the thunk package we can return a function inside this function
  return (dispatch) =>  {
    dispatch(PaginateProductsRequest({productsPerPage, currentPage}))
    axios.get(`/api/paginate_all_products/${productsPerPage}?page=${currentPage}`)
      .then(response => {
        dispatch(PaginateProductsSuccess(response.data.products))
      })
      .catch(error => {
        dispatch(PaginateProductsFailure(error.message))
      })
  }
}




//
