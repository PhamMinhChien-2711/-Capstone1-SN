import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

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
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/cart/addtocart`,
        { IDproduct: product._id, quantity: 1 }
      );
      console.log(response);
      if (response.data.success) {
        toast.success("Add success ππ");
        setCartItems(response.data.updateCart.cartItems);
      } else {
        alert("add failure");
        toast.success("Add failure ππ");
      }
    } catch (error) {
      // alert('Δα»i Δα»a chα» IP Δi');
      alert(error.toString());
      toast.success("Internal server error  ππ");
    }
  };
  const removeItem = async (item) => {
    // const newCartItems = [...cartItems];
    // const index = newCartItems.indexOf(item);
    // newCartItems.splice(index, 1);
    // setCartItems(newCartItems)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/cart/removefromCart`,
        {
          IDproduct: item.IDproduct,
          quantity: 1,
        }
      );
      if (response.data.success) {
        toast.success("Deleted success ππ");
        setCartItems(response.data.updatedCart.cartItems);
      } else {
        toast.error("Delete failure ππ");
      }
    } catch (error) {
      toast.error("Internal server error  ππ");
    }
  };
  const loadCartItem = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API}/cart/`);
      if (response.data.success) setCartItems(response.data.carts.cartItems);
      // console.log('response: ', response?.data?.carts.total)
      setTotalPrice(response?.data?.carts.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTotal(cartItems.length);
    loadCartItem();
  }, [cartItems.length]);

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addToCart: addToCart,
        setCartItems: setCartItems,
        total: total,
        removeItem,
        totalPrice: totalPrice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
