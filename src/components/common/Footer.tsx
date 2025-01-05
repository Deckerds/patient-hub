import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex mx={8} py={4} borderTopColor={'gray.300'} borderTopWidth={1}>
      <Text textStyle={'sm'} color={'gray.500'}>
        &copy; {new Date().getFullYear()} IMS System, Inc
      </Text>
    </Flex>
  );
};

export default Footer;
