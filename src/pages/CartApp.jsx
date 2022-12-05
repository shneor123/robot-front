import React from 'react';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';

import { Checkout } from '../store/actions/cart.actions';

export function CartApp({ cartItems, onAddToCart, onRemoveCart, onToggleCard, onClearCart }) {
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    const taxPrice = itemsPrice * 0.17
    const shippingPrice = itemsPrice > 600 ? 0 : 20
    const totalPrice = itemsPrice + taxPrice + shippingPrice

    const dispatch = useDispatch()

    const checkout = () => {
        dispatch(Checkout())
    }

    return (
        <aside className="block col-1">
            <header style={{ marginTop: '30px' }} className="row"><h1>Small Shopping Cart</h1></header>
            <h2>Cart Items</h2>
            <div>
                {cartItems.length === 0 && <div>Cart is empty</div>}
                {cartItems && cartItems.map((item, idx) => (
                    <div key={idx} className="row">
                        <img src={item.img} alt={item.name} />
                        <div className="col-name col-2">{item.name}</div>
                        <div className="col-2">
                            <button onClick={() => onRemoveCart(item)} className="remove"> - </button>{" "}
                            <button onClick={() => onAddToCart(item)} className="add"> + </button>
                        </div>
                        <div className="col-2 text-right"> <strong>{item.qty}</strong> x <strong>${item.price}</strong></div>
                    </div>
                ))}
                {cartItems.length !== 0 && (
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
                        <div className="row" >
                            <button onClick={() =>
                                setTimeout(() => {
                                    checkout()
                                    onClearCart()
                                    onToggleCard()
                                    Swal.fire({
                                        icon: 'success',
                                        title: `Thanks for buying in Robot Fake Store $${totalPrice.toFixed(2)}`,
                                        showConfirmButton: false,
                                        timer: 1500,
                                    })
                                }, 1000)
                            }> Checkout </button>
                        </div>
                    </>
                )}
            </div>
        </aside >
    )
}