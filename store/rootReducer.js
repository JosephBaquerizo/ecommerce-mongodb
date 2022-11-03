import { combineReducers } from 'redux';
import cartSlice from './slices/cartSlice';

const rootReducer = combineReducers({
    cart: cartSlice,
});

export default rootReducer;