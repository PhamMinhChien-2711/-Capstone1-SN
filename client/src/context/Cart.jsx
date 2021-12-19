import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../actions/type'

const CartContext = React.createContext();

export const CartProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const addToCart = async (product) => {

        // const newCartItems =cartItems;
        // newCartItems.push(product);
        // setCartItems(newCartItems);
        try {
            const response = await axios.post(`${API_URL}/api/cart/addtocart`, { IDproduct: product._id, quantity: 1 });
            console.log(response)
            if (response.data.success) {
                alert('add success');
                toast.success('Add success 🎉🎉');
                setCartItems(response.data.updateCart.cartItems)
            }
            else {
                alert('add failure');
                toast.success('Add failure 🎉🎉');
            }
        } catch (error) {
            // alert('Đổi địa chỉ IP đi');
            alert(error.toString())
            toast.success('Internal server error  🎉🎉');
        }
    }
    const removeItem = async (item) => {
        // const newCartItems = [...cartItems];
        // const index = newCartItems.indexOf(item);
        // newCartItems.splice(index, 1);
        // setCartItems(newCartItems)
        try {
            const response = await axios.post(`${API_URL}/api/cart/removefromCart`, { IDproduct: item.IDproduct, quantity: 1 })
            if (response.data.success) {
                toast.success('Deleted success 🎉🎉');
                setCartItems(response.data.updatedCart.cartItems)
            }
            else {
                alert('Delete failure');
                toast.success('Delete failure 🎉🎉');
            }
        } catch (error) {
            alert('Đổi địa chỉ IP đi');
            alert(error.toString())
            toast.success('Internal server error  🎉🎉');
        }
    }
    const loadCartItem = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/cart/`);
            if (response.data.success)
                setCartItems(response.data.carts.cartItems);
                // console.log('response: ', response?.data?.carts.total)
                setTotalPrice(response?.data?.carts.total)
        } catch (error) {
            console.log(error)
        }
       
    }
    useEffect(() => {
        setTotal(cartItems.length);
        loadCartItem();
    }, [cartItems.length]);

    return (
        <CartContext.Provider value={{
            cartItems: cartItems,
            addToCart: addToCart,
            setCartItems: setCartItems,
            total: total,
            removeItem,
            totalPrice: totalPrice
        }}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;