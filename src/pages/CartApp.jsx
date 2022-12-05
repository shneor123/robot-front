import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkout, removeFromCart } from '../store/actions/cart.actions'


export const CartApp = () => {

  const { cart } = useSelector((storeState) => storeState.cartModule)
  const dispatch = useDispatch()

  const onRemoveFromCart = (cartId) => {
    dispatch(removeFromCart(cartId))
  }

  const checkout = () => {
    dispatch(Checkout())
  }
  if (!cart) return <></>
  const itemsPrice = cart.reduce((acc, car) => acc + car.price, 0)
  const taxPrice = itemsPrice * 0.17
  const shippingPrice = itemsPrice > 600 ? 0 : 20
  const totalPrice = itemsPrice + taxPrice + shippingPrice
  
  return (
    <aside className="block col-1">
      <header style={{ marginTop: '30px' }} className="row"><h1>Small Shopping Cart</h1></header>
      <h2>Cart Items</h2>
      <div>
        {cart.length === 0 && <div>Cart is empty</div>}
        {cart && cart.map((item, idx) => (
          <div key={idx} className="row">
            <img src={item.src} alt={item.name} />
            <div className="col-name col-2">{item.name}</div>
            <button onClick={() => onRemoveFromCart(item._id)}>-</button>
            <div className="col-2 text-right">${item.price.toFixed(2)} </div>
          </div>
        ))}
        {cart.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">${shippingPrice.toFixed(2)}</div>
            </div>

            <div className="row">
              <div className="col-2"><strong>Total Price</strong></div>
              <div className="col-1 text-right"><strong>${totalPrice.toFixed(2)}</strong></div>
            </div>
            <hr />
            <button onClick={checkout}>Checkout</button>
          </>
        )}
      </div>
    </aside >
  )
}