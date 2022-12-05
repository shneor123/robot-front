
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { reviewReducer } from './reducers/review.reducer';
import { robotReducer } from './reducers/robot.reducer';
import { userReducer } from './reducers/user.reducer';
import { cartReducer } from './reducers/cart.reducer';


const rootReducer = combineReducers({
    robotModule: robotReducer,
    reviewModule: reviewReducer,
    userModule: userReducer,
    cartModule: cartReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


