import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import { system } from './theme/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ChakraProvider value={system}>
      <Toaster />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
