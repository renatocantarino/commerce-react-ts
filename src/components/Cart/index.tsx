import React from 'react';
import CartItem from '../CartItem'

import { CartItemType } from '../../App'
import { Wrapper } from './style'

type Props = {
    cartItems: CartItemType[];
    addToCart: (selected: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {

    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((acc: number, item) => acc + item.amount * item.price, 0)
    return (
        <Wrapper>
            <h2>Seu carrinho de compras</h2>
            {
                cartItems.length === 0
                    ? <p>Não existem itens no carrinho</p>
                    : null
            }

            {
                cartItems.map(item => (
                    <CartItem key={item.id}
                        item={item}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart} />
                ))
            }
            <h2>Total : R$ {calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart;

