import React, { useContext, useState, useEffect } from "react";
import { Col } from "reactstrap";
import CartContext from "../../../context/Cart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

import "./index.scss";

function ShopItem(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function callAPI() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/products/list_item`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    }
    callAPI();
  }, []);

  const { addToCart } = useContext(CartContext);
  return products?.map((item, index) => {
    return (
      <Col className='Item' sm='6' md='4' lg='3' key={index}>
        <Card sx={{ maxWidth: 345, height: 320 }}>
          <CardMedia
            component='img'
            alt='green iguana'
            height='140'
            image={item.productImage}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {item.currency}
            </Typography>
            <Typography variant='body2' color='text.primary'>
              {item.price} USD
            </Typography>
          </CardContent>
          <CardActions>
            <span>SL:{item.quantity}</span>
            <Button variant='contained' size='small' onClick={() => addToCart(item)}>
              Buy
            </Button>
          </CardActions>
        </Card>
      </Col>
    );
  });
}
export default ShopItem;
