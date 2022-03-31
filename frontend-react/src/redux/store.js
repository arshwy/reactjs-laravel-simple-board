import { createStore, applyMiddleware } from 'redux' // you can import the compose from here not devtools only
import reducer from './reducer'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store
