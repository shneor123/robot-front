export function addToCart(shop) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            shop
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
export function Checkout() {
    return async (dispatch) => {
        try {
            dispatch({ type: 'CLEAR_CART' })
        } catch (err) {
            console.log('CarActions: err in checkout', err)
        }
    }
}
