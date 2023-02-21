import React from 'react';
import { GetStaticProps } from 'next';

import { Product } from '../product/types';
import api from '../product/api';
import { Button, Grid, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface Props{
  products: Product[];
}

function parseCurrency(value:number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}
const IndexRoute: React.FC<Props> = ({products}) => {
  // return <div>{JSON.stringify(products)}</div>;
  const [cart, setCart] = React.useState<Product[]>([]);
  function handleAddToCart(product: Product){
    setCart(cart => cart.concat(product));
    console.log(cart);
    
  }
  const text = React.useMemo(() => {
    return cart.reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n` ), 'Boleta de compra: ')
              .concat(`\n * Total: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`);
  }, [cart]);
  
  return (
    <Stack>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        { products.map(product => 
          <Stack key={ product.id } backgroundColor="gray.100">
            <Text>{ product.title }</Text>
            <Text>{ product.price }</Text>
            <Button onClick={() => handleAddToCart(product)} colorScheme="blue">Agregar</Button>
            
          </Stack>
        )}
      </Grid>
      { Boolean(cart.length) && (
        
        <Button 
          as={Link}
          colorScheme="whatsapp"
          href={`https://wa.me/542217787889?text=${encodeURIComponent(text)}`}
        >
          Ver carrito: ({cart.length} productos.) </Button>
      )
      }
        
    </Stack>
  )
  
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return { 
    props: {
      products,
    },
  }
}

export default IndexRoute;