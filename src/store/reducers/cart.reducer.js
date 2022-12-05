const initialState = {
    shops: [],
    cart: [],
}
export function cartReducer(state = initialState, action) {
    var newState = state
    var cart
    switch (action.type) {
        case 'ADD_TO_CART':
            newState = { ...state, cart: [...state.cart, action.shop] }
            break

        case 'REMOVE_FROM_CART':
            cart = state.cart.filter(shop => shop._id !== action.shopId)
            newState = { ...state, cart }
            break

        case 'CLEAR_CART':
            newState = { ...state, cart: [] }
            break

        default:
    }
    // For debug:
    window.shopState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}
