import React from 'react'
import { Box, ChakraProvider, Container, Divider, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import theme from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={8}>
        <Container
          borderRadius="sm"
          backgroundColor={'white'}
          boxShadow="md"
          marginY={4}
          maxWidth="container.xl"
          padding={4}
        >
          <VStack>
            <Image borderRadius={9999} alt='hola' src="//placehold.it/128x128" />
            <Heading>Alan Almacen</Heading>
            <Text>El almacen de 153</Text>
          </VStack>
          <Divider marginY={6}/>
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App;