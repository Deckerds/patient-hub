import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './common/Header';
import { scrollBarCss } from '../common/css';
import Footer from './common/Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Flex flexDir="column" height="100vh">
      <Header />
      <Box p={8} flexGrow={1} w="full" overflowY="auto" css={scrollBarCss}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default AdminLayout;
