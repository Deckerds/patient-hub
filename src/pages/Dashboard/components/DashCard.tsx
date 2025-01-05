import React, { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface IDashCardProps {
  name: string;
  path: string;
  Icon: React.ReactNode;
}

const DashCard: FC<IDashCardProps> = ({ name, path, Icon }) => {
  const navigate = useNavigate();
  return (
    <Flex
      borderColor={'brand.200'}
      borderWidth={0.5}
      onClick={() => navigate(`/${path}`)}
      flexDir={'column'}
      alignItems={'center'}
      justify={'center'}
      minW={'15rem'}
      minH={'15rem'}
      borderRadius={'50%'}
      shadow={'md'}
      _hover={{ bg: 'brand.50' }}
      cursor={'pointer'}
      p={10}
    >
      <Text textStyle={'xl'} textAlign="center" fontWeight={'bold'}>
        {name}
      </Text>
      {Icon}
    </Flex>
  );
};

export default DashCard;
