import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";
import CartContext from "../../context/Cart";
import { seo } from "../../utils/seo";
import "./index.scss";
function Cart(props) {
  const { cartItems, removeItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    seo("Giỏ hàng");
  }, []);
  return (
    <div className='Cart'>
      <section className='Cart__head'>
        <Link to='/shop' style={{ textDecoration: "none" }}>
          <Button variant='outlined' size='small'>
            <i style={{ marginRight: "10px" }} class='fas fa-arrow-circle-left'>
              {" "}
            </i>
            Continue shopping
          </Button>
        </Link>
      </section>
      <hr />
      <section className='Cart__content'>
        <table>
          <tr>
            <th>Name product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Sub Total</th>
          </tr>

          {cartItems.map((item) => {
            return (
              <tr>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td style={{ width: "5rem" }}>
                  <Input
                    type='text'
                    id='quantity'
                    min='1'
                    max='5'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </td>
                <td>
                  {item.price * quantity}
                  <Button
                    style={{ float: "right", marginRight: "2rem" }}
                    onClick={() => removeItem(item)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}

          <th colspan='3'>Total</th>
          <th colspan='2'>
            {cartItems.reduce((currentTotal, item) => {
              return (currentTotal += item.price);
            }, 0)}{" "}
            VND
          </th>
        </table>
      </section>
    </div>
  );
}

export default Cart;
