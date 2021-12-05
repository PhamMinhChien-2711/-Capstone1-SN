import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Products } from '../../api/Products';
import {
    Container, Row
} from "reactstrap";
import CartContext from '../../context/Cart';
import './index.scss';
import ShopItem from '../../components/Item/ShopItem';

function Shop() {

    const { total } = useContext(CartContext);

    return (
        <div className='Shop'>
            <section className='Shop__head'>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/shop/cart'>🛒{total}</Link> <br />
            </section>
            <section className='Shop__product'>
                <Container style={{ marginTop: '1rem' }}>
                    <Row>
                        <ShopItem Products={Products} />
                    </Row>
                </Container >
            </section>
        </div>
    );
}

export default Shop;