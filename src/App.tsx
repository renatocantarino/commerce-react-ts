import { useState } from 'react';
import { useQuery } from 'react-query'


import Drawer from '@material-ui/core/drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

//styles
import { Wrapper, StyledButton } from './styles/globalStyles'
import Item from './components/Item'
import Cart from './components/Cart'



//types ts
export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json();

function App() {


  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);


  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)

  const getTotalItens = (items: CartItemType[]) => items.reduce((acc: number, items) => acc + items.amount, 0);


  const handleAddToCart = (selected: CartItemType) => {
    setCartItems(prev => {
      //o item ja esta no carrinho ?
      const isExists = prev.find(item => item.id === selected.id);

      //cria
      if (!isExists)
        return [...prev, { ...selected, amount: 1 }]

      //atualiza
      return prev.map(item => item.id === selected.id
        ? { ...item, amount: item.amount + 1 }
        : item
      );
    });
  }



  const handleRemoveCartItem = (id: number) => {

    setCartItems(prev =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }]
        }
        else
          return [...acc, item];

      }, [] as CartItemType[])
    )
  }

  if (isLoading)
    return <LinearProgress />

  if (error)
    return <div>Erro</div>


  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveCartItem} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItens(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {
          data?.map((item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          )))
        }
      </Grid>

    </Wrapper>
  );
}

export default App;
