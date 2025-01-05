import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { FaCaretDown, FaHome, FaUsers } from 'react-icons/fa';
// import { TbReportSearch } from 'react-icons/tb';
import { FaUsersLine } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '../ui/avatar';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../ui/menu';
import { formatName } from '../../common/functions';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('patientId');
    navigate('/login');
  };

  const onSelect = (details: any) => {
    if (details.value === 'Logout') {
      logOut();
    }
  };

  return (
    <Flex
      bg={'brand.200'}
      alignItems={'center'}
      justifyContent={'space-between'}
      h={14}
      px={8}
    >
      <Flex alignItems={'center'} gap={8}>
        <Flex alignItems={'center'} gap={1}>
          <Text textStyle={'lg'} color={'white'} fontWeight={'bold'}>
            IMS
          </Text>
          <Text textStyle={'lg'} color={'white'} fontStyle={'italic'}>
            System
          </Text>
        </Flex>
        <Flex alignItems={'center'} gap={4}>
          <Flex
            onClick={() => navigate('/dashboard')}
            alignItems={'center'}
            gap={1}
            cursor={'pointer'}
            px={2}
            py={0.5}
            borderRadius={50}
            bg={location.pathname === '/dashboard' ? 'brand.100' : ''}
            _hover={{ bg: 'brand.100' }}
          >
            <FaHome color="white" />
            <Text
              textStyle={'sm'}
              fontWeight={
                location.pathname === '/dashboard' ? 'bold' : 'normal'
              }
              color="white"
            >
              Dashboard
            </Text>
          </Flex>
          {(localStorage.getItem('role') || '') !== 'PATIENT' && (
            <Flex
              onClick={() => navigate('/patients')}
              alignItems={'center'}
              gap={1}
              cursor={'pointer'}
              px={2}
              py={0.5}
              borderRadius={50}
              bg={location.pathname === '/patients' ? 'brand.100' : ''}
              _hover={{ bg: 'brand.100' }}
            >
              <FaUsersLine color="white" />
              <Text
                textStyle={'sm'}
                fontWeight={
                  location.pathname === '/patients' ? 'bold' : 'normal'
                }
                color="white"
                _hover={{ color: '' }}
              >
                Patients
              </Text>
            </Flex>
          )}
          {(localStorage.getItem('role') || '') === 'SUPER_ADMIN' && (
            <Flex
              onClick={() => navigate('/users')}
              alignItems={'center'}
              gap={1}
              cursor={'pointer'}
              px={2}
              py={0.5}
              borderRadius={50}
              bg={location.pathname === '/users' ? 'brand.100' : ''}
              _hover={{ bg: 'brand.100' }}
            >
              <FaUsers color="white" />
              <Text
                textStyle={'sm'}
                fontWeight={location.pathname === '/users' ? 'bold' : 'normal'}
                color="white"
                _hover={{ color: '' }}
              >
                Users
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex alignItems={'center'} gap={1}>
        <Avatar
          name={formatName(localStorage.getItem('role') || '')}
          src="https://github.com/shadcn.png"
          shape="full"
          size="md"
        />
        <Text textStyle={'xs'} color={'white'} fontWeight={'bold'}>
          {formatName(localStorage.getItem('role') || '')}
        </Text>
        <MenuRoot onSelect={onSelect}>
          <MenuTrigger asChild>
            <FaCaretDown color="white" cursor="pointer" />
          </MenuTrigger>
          <MenuContent>
            <MenuItem
              cursor="pointer"
              value="Logout"
              _hover={{ bg: 'primary.50', color: 'primary.600' }}
            >
              <Text fontWeight="medium">Log out</Text>
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </Flex>
    </Flex>
  );
};

export default Header;
