import React from 'react';
import { GetStaticProps } from 'next';

import { Product } from '../product/types';
import api from '../product/api';
import { Grid, Stack, Text } from '@chakra-ui/react';

interface Props{
  products: Product[];
}

const IndexRoute: React.FC<Props> = ({products}) => {
  // return <div>{JSON.stringify(products)}</div>;
  return <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
    { products.map(product => 
      <Stack key={ product.id } backgroundColor="gray.100">
        <Text>{ product.title }</Text>
      </Stack>
    )}
  </Grid>
  
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