import React from 'react';
import Button from '@material-ui/core/Button'

import { Wrapper } from './style'

import { CartItemType } from '../../App'

type Props = {
    item: CartItemType
    handleAddToCart: (selected: CartItemType) => void
}


const Item: React.FC<Props> = ({ item, handleAddToCart }) => (

    <Wrapper>
        <img src={item.image} alt='item' />
        <div>
            <h3>
                {item.title}
            </h3>
            <p>{item.description}</p>
            <h3>
                {item.price}
            </h3>
        </div>
        <Button color='primary' style={{ background: 'lightblue ' }} onClick={() => { handleAddToCart(item) }}> Adicionar</Button>
    </Wrapper>
)


export default Item;



