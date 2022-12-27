const initialState = {
    carts: [],
    cart: [],
}
export function cartReducer(state = initialState, action) {
    var cart
    switch (action.type) {

        case 'SET_CARTS':
            console.log(state.cart.length)
            return { ...state, carts: action.carts }
            
        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, action.shop] }

        case 'REMOVE_FROM_CART':
            cart = state.cart.filter(shop => shop !== action.shopId)
            return { ...state, cart }

        case 'CLEAR_CART':
            return { ...state, cart: [] }

        default:
            return state
    }
    // For debug:
    // window.shopState = state

}
