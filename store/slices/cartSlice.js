import { createSlice } from '@reduxjs/toolkit'; 

const cartSlice = createSlice({
	name: 'cart',
	initialState: { 
		active: false,
		items: [],
		totalPrice: 0,
		totalQuantity: 0
	},
	reducers: {
		setCart(state, action) {
			state.active = action.payload;
		},
		emptyCart(state) {
			state.totalQuantity = 0;
			state.totalPrice = 0;
			state.items = [];
		},
		addItem(state, action) {
			const newItem = action.payload.product;
			const newQty = action.payload.qty;
			const searchItem = state.items.find((item) => item._id === newItem._id);
			if (!searchItem) {
				state.items.push({...newItem, qty: newQty});
			} else {
				state.items = state.items.map((item) => {
					return (
						item._id === newItem._id
						?
						{...searchItem, qty: searchItem.qty + newQty}
						:
						item
					)
				})
			}
			state.totalPrice += newItem.price * newQty;
			state.totalQuantity += newQty; 
		},
		removeItem(state, action) {
			const itemToRemove = action.payload;
			state.totalQuantity--;
			state.totalPrice -= itemToRemove.price;
			if (itemToRemove.qty === 1) {
				state.items = state.items.filter((item) => item._id !== itemToRemove._id);
			} else {
				state.items = state.items.map(item => {
					return (
						item._id === itemToRemove._id 
						? 
						{...itemToRemove, qty: itemToRemove.qty - 1} 
						: 
						item
					)
				})
			}
		}
	}
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;