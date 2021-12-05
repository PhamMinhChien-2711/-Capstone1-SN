import React, { useContext } from 'react';
import { Col } from 'reactstrap';
import CartContext from '../../../context/Cart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './index.scss';

function ShopItem(props) {

    const { addToCart } = useContext(CartContext);

    const { Products } = props;
    return (
        Products.map((item, index) => {
            return <Col className='Item' sm="6" md='4' lg='3' key={index}>
                <Card sx={{ maxWidth: 345, height: 320 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={item.img}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            {item.author}
                        </Typography>
                        <Typography variant="body2" color="text.primary" >
                            {item.content}
                        </Typography>
                    </CardContent>
                    <CardActions >
                        <span>{item.price}</span>
                        <Button variant='contained' size="small" onClick={() => addToCart(item)}>Buy</Button>
                    </CardActions>
                </Card>
            </Col >
        })
    )
}
export default ShopItem;