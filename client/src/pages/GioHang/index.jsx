
import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';
import CartContext from '../../context/Cart';
import './index.scss';
import PayPal from '../../components/PayPal';
function Cart(props) {

    const { cartItems, removeItem, totalPrice } = useContext(CartContext);
    const [checkOut, setCheckOut] = useState(false);
    return (
        <div className='Cart' >
            <section className='Cart__head'>
                <Link to='/shop' style={{ textDecoration: 'none' }}>
                    <Button variant='outlined' size='small'><i className="fas fa-arrow-circle-left"> </i>Continue shopping</Button>
                </Link>
            </section>
            <hr />
            <section className="Cart__content">
                <table>
                    <tr>
                        <th>Name product</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                    </tr>
                    {cartItems.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td style={{ backgroundColor: 'white' }}>{item.title}</td>
                                <td style={{ backgroundColor: 'white' }}>{item.price}</td>
                                <td style={{ width: '5rem', backgroundColor: 'white' }}>
                                    <Input
                                        type="number" id="quantity"
                                        min={1} step="any"
                                        value={item.quantity}
                                        onChange={(e) => item.quantity = e.target.value}
                                    />
                                </td>
                                <td style={{ backgroundColor: 'white' }}>
                                    {item.price * item.quantity}
                                    <Button style={{ float: 'right', marginRight: '2rem' }}
                                        onClick={() => removeItem(item)}
                                    >Delete</Button>
                                </td>

                            </tr>
                        )
                    })}
                    <th colspan="3">Total</th>
                    {/* <th colspan='2'>{cartItems.reduce((currentTotal, item) => {
                        return currentTotal += item.price
                    }, 0)} VND</th> */}
                    <th colspan='2'>$ {totalPrice}</th>
                </table>
            </section>
            {checkOut ? (
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
                    <div style={{ width: 700 }}>
                        <PayPal totalPrice={totalPrice}/>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => {
                        setCheckOut(true)
                    }}
                >Checkout
                </button>
            )}
        </div >
    );
}

export default Cart;