import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = React.createContext();

export const CartProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState();
    const addToCart = (product) => {
        alert('add success');
        toast.success('Add success 🎉🎉');
        const newCartItems = [...cartItems];
        newCartItems.push(product);
        setCartItems(newCartItems);
    }
    const removeItem = (item) => {
        const newCartItems = [...cartItems];
        const index = newCartItems.indexOf(item);
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    }
    useEffect(() => {
        setTotal(cartItems.length);
    }, [cartItems.length]);

    return (
        <CartContext.Provider value={{
            cartItems: cartItems,
            addToCart: addToCart,
            setCartItems: setCartItems,
            total: total,
            removeItem
        }}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;