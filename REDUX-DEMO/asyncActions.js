
const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

// the state
const initialState = {
  loading: false,
  users: [],
  error:''
}

// the actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}
const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}
const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}
// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error:''
      }
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error:action.payload,
      }
    default: break;
  }
}

// the action creator
const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest())
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(response => {
        //  response data
        const users = response.data.map(user => user.id)
        // console.log('success & users are : ', users);
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        // error message
        console.log('failed');
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
const unsubscribe = store.subscribe(()=>{ console.log(store.getState()) })
store.dispatch(fetchUsers())
