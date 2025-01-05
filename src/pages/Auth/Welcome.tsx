import React from 'react';
import { Center, Text } from '@chakra-ui/react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Center h={'full'} flexDir={'column'}>
      <Text
        textStyle={'5xl'}
        color={'brand.200'}
        fontWeight={'bold'}
        textShadow="1px 1px 2px rgba(0, 0, 0, 0.2), 0 0 25px rgba(255, 255, 255, 0.3), 0 0 5px rgba(255, 255, 255, 0.2)"
      >
        Welcome
      </Text>
      <Text
        textStyle={'lg'}
        textAlign={'center'}
        fontWeight={'medium'}
        mt={8}
        px={12}
        color={'gray.600'}
      >
        The Image Management System is your comprehensive solution for managing
        medical images effectively and efficiently. Whether you are a healthcare
        professional, administrator, or researcher, this platform offers
        powerful tools to streamline your workflows and maintain high-quality
        records.
      </Text>
      <Button
        mt={12}
        shadow={'md'}
        fontSize={'xl'}
        fontWeight={'bold'}
        w={350}
        colorPalette={'brand'}
        borderRadius={50}
        onClick={() => navigate('/login')}
      >
        Login to your account
      </Button>
    </Center>
  );
};

export default Welcome;
