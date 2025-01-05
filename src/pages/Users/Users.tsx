import { Box, Flex, Input, Table, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../components/ui/breadcrumb';
import { Button } from '../../components/ui/button';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { toaster } from '../../components/ui/toaster';
import { FaPencil } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsers } from '../../services/patients';
import Pagination from '../../components/common/Pagination';
import { IUser } from '../../common/interfaces';
import { InputGroup } from '../../components/ui/input-group';
import { LuSearch } from 'react-icons/lu';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '../../components/ui/dialog';
import { formatName } from '../../common/functions';

const Users = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>('');
  const [searchDisplay, setSearchDisplay] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [pageSize] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const [users, setUsers] = useState<IUser[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [userID, setUserID] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setSearch(searchDisplay);
  };

  const getAllUsers = useCallback(async () => {
    try {
      const res = await getUsers(page + 1, pageSize, search);
      setUsers(res.content);
      setTotal(res.totalPages);
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  }, [search, page, pageSize]);

  const deleteUserById = async () => {
    try {
      await deleteUser(userID!);
      toaster.create({
        description: 'User deleted succesfully',
        type: 'success',
      });
      setOpen(false);
      getAllUsers();
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  };

  useEffect(() => {
    if (searchDisplay === '') {
      setSearch('');
    }
  }, [searchDisplay]);

  return (
    <Box>
      <BreadcrumbRoot variant="underline" separator={'/'}>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        <BreadcrumbCurrentLink>Users</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Text mt={4} textStyle={'2xl'} color={'gray.800'} fontWeight={'bold'}>
        Users
      </Text>
      <Flex direction="column">
        <Flex justify={'flex-end'}>
          <Button
            onClick={() => navigate('/users/create')}
            colorPalette="brand"
          >
            <FaPlus /> Add User
          </Button>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Flex bg={'gray.100'} borderRadius={4} p={5} mt={3} gap={2}>
            <InputGroup flex="1" startElement={<LuSearch />}>
              <Input
                bg="white"
                placeholder="Search"
                value={searchDisplay}
                onChange={(e) => setSearchDisplay(e.target.value)}
              />
            </InputGroup>
            <Button type="submit" colorPalette="brand">
              Search
            </Button>
          </Flex>
        </form>
        <Box borderRadius={4} p={5} mt={3}>
          <Table.Root size="sm" striped>
            <Table.Header>
              <Table.Row bg={'brand.100'}>
                <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                  First Name
                </Table.ColumnHeader>
                <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                  Last Name
                </Table.ColumnHeader>
                <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                  Email
                </Table.ColumnHeader>
                <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                  Role
                </Table.ColumnHeader>
                <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                  Created At
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight={'bold'}
                  textAlign="end"
                ></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.fname}</Table.Cell>
                  <Table.Cell>{user.lname}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{formatName(user.userRole.name)}</Table.Cell>
                  <Table.Cell>
                    {new Date(user.createdDate).toISOString().split('T')[0]}
                  </Table.Cell>
                  <Table.Cell
                    display={'flex'}
                    justifyContent={'center'}
                    textAlign="end"
                  >
                    <Flex gap={2}>
                      <Flex
                        justify={'center'}
                        alignItems={'center'}
                        w={5}
                        h={5}
                        bg={'yellow.200'}
                        borderRadius={3}
                        cursor={'pointer'}
                        onClick={() => {
                          navigate(`/users/update/${user.id}`);
                        }}
                      >
                        <FaPencil size={12} />
                      </Flex>
                      <Flex
                        justify={'center'}
                        alignItems={'center'}
                        w={5}
                        h={5}
                        bg={'red.400'}
                        borderRadius={3}
                        cursor={'pointer'}
                        onClick={() => {
                          setUserID(user.id);
                          setOpen(true);
                        }}
                      >
                        <FaTrash color="white" size={12} />
                      </Flex>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          {total > 0 && (
            <Flex justifyContent={'end'} mt={2}>
              <Pagination handlePageClick={handlePageClick} total={total} />
            </Flex>
          )}
        </Box>
      </Flex>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>
              This action cannot be undone. This will permanently delete the
              patient.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={deleteUserById}>
              Delete
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default Users;
