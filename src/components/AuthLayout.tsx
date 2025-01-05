import React from 'react';
import { Flex, Grid, Image } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" height="100vh">
      <Flex>
        <Image src="/assets/auth.png" />
      </Flex>
      <Flex
        pos={'relative'}
        flexDir="column"
        alignItems="center"
        borderLeftRadius={50}
        padding={5}
        bg={'gray.100'}
        shadow={'sm'}
      >
        <Outlet />
      </Flex>
    </Grid>
  );
};

export default AuthLayout;
