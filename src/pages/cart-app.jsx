import React from 'react';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { IoMdClose } from 'react-icons/io';

import { AddRemoveCart } from '../cmps/add-remove-cart';
import { checkout } from '../store/actions/cart.actions';
import defaultRobotImg from '../assets/img/blue-robot.png'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';


export function CartApp({ cartItems, onAddToCart, onRemoveCart, onToggleCard, onClearCart, RemoveItem }) {
    const { user } = useSelector(stateModule => stateModule.userModule)
    const dispatch = useDispatch()

    const onCheckout = () => {
        dispatch(checkout())
    }

    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    const taxPrice = itemsPrice * 0.17
    const shippingPrice = itemsPrice > 600 ? 0 : 20
    const totalPrice = itemsPrice + taxPrice + shippingPrice

    const { t } = useTranslation()
    return (
        <aside className="block col-1">
            {cartItems.length > 0 && <button className="admin-clear-cart " onClick={onClearCart}>{t("cart_details_clear")}</button>}
            <span style={{ top: '7px' }} onClick={onToggleCard} className="modal-close-btn">
                <IoMdClose size={25} />
            </span>
            <header style={{ marginTop: '30px' }} className="row"><h1>{t("cart_header_1")}</h1></header>
            <h2>{t("cart_header_2")}</h2>
            <div>
                {cartItems.length === 0 && <div>{t("cart_header_3")}</div>}
                {cartItems && cartItems.map((item, idx) => (
                    <div key={idx} className="row">
                        <img src={item.img || defaultRobotImg} alt={item.name} />
                        <Link to={`/robots/${item._id}`}>
                            <div className="col-name col-2">{item.name}</div>
                        </Link>
                        <div className="col-3">
                            <AddRemoveCart item={item} onAddToCart={onAddToCart} onRemoveCart={onRemoveCart} />
                        </div>
                        <div className="col-2 text-right"> <strong>{item.qty}</strong> x <strong>${item.price}</strong></div>
                        <IconButton aria-label="delete" sx={{ p: 0 }}>
                            <DeleteIcon onClick={() => RemoveItem(item)} />
                        </IconButton>
                    </div>
                ))}

                {cartItems.length !== 0 && (
                    <>
                        <hr></hr>
                        <div className="row">
                            <div className="col-2">{t("cart_details_price")}</div>
                            <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                        </div>
                        <div className="row">
                            <div className="col-2">{t("cart_details_tax")}</div>
                            <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                        </div>
                        <div className="row">
                            <div className="col-2">{t("cart_details_shipping")}</div>
                            <div className="col-1 text-right">${shippingPrice.toFixed(2)}</div>
                        </div>

                        <div className="row">
                            <div className="col-2"><strong>{t("cart_details_total")}</strong></div>
                            <div className="col-1 text-right"><strong>${totalPrice.toFixed(2)}</strong></div>
                        </div>
                        <hr />
                        <div className="row" >
                            {!user && <Link to="/login" className="log-cart">Login To Buy</Link>}
                            {user && <button className='btn-cart' onClick={() =>
                                setTimeout(() => {
                                    onCheckout()
                                    onClearCart()
                                    onToggleCard()
                                    Swal.fire({
                                        icon: 'success',
                                        title: `${t("cart_details_thx")} $${totalPrice.toFixed(2)}`,
                                        showConfirmButton: false,
                                        timer: 1500,
                                    })
                                }, 1000)
                            }> {t("cart_details_checkout")} </button>}
                        </div>
                    </>
                )}
            </div>
        </aside >
    )
}


   // const [language, setLanguage] = useState('he')
    // useEffect(() => {
    //     if (language === 'he') document.body.dir = 'rtl'
    //     else if (language === 'en') document.body.dir = 'ltr'
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [language])
