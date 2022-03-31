import { combineReducers } from 'redux'
import { createProductReducer } from './reducers/CreateProduct'
import { deleteProductReducer } from './reducers/DeleteProduct'
import { getProductReducer } from './reducers/GetProducts'
import { paginateProductReducer } from './reducers/PaginateProducts'
import { updateProductReducer } from './reducers/UpdateProduct'



const reducer = combineReducers ({
  createProduct: createProductReducer,
  deleteProduct: deleteProductReducer,
  getProducts: getProductReducer,
  paginateProducts: paginateProductReducer,
  updateProduct: updateProductReducer
})


export default reducer
