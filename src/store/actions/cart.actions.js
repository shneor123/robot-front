export function addToCart(cart) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            cart
        })
    }
}
export function removeFromCart(shopId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            shopId
        })
    }
}
export function checkout() {
    return async (dispatch) => {
        try {
            dispatch({ type: 'CLEAR_CART' })
        } catch (err) {
            console.log('CarActions: err in checkout', err)
        }
    }
}
