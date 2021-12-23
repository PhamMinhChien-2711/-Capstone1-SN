import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Products } from "../../api/Products";
import { Button } from "@mui/material";
import { Container, Row } from "reactstrap";
import CartContext from "../../context/Cart";
import "./index.scss";
import ShopItem from "../../components/Item/ShopItem";
import { seo } from "../../utils/seo";

function Shop() {
  const history = useHistory();
  const { total } = useContext(CartContext);
  useEffect(() => {
    seo("Mua sắm");
  }, []);
  return (
    <div className='Shop'>
      <div className='CT-head-button' onClick={() => history.push("/newitem")}>
          <Button size='medium' variant='contained'>
            Đăng Sản Phẩm
          </Button>
        </div>
      <section className='Shop__head'>
        <Link style={{ textDecoration: "none", color: "black" }} to='/shop/cart'>
          🛒{total}
        </Link>{" "}
        <br />
      </section>
      <section className='Shop__product'>
        <Container style={{ marginTop: "1rem" }}>
          <Row>
            <ShopItem Products={Products} />
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Shop;
