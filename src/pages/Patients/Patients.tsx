import { Box, Flex, Input, Table, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../components/ui/breadcrumb';
import { Button } from '../../components/ui/button';
import { FaEye, FaFileImage, FaImages, FaPlus, FaTrash } from 'react-icons/fa';
import { toaster } from '../../components/ui/toaster';
import { FaPencil } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import {
  deletePatient,
  getPatient,
  getPatients,
} from '../../services/patients';
import Pagination from '../../components/common/Pagination';
import { IPatient } from '../../common/interfaces';
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

const Patients = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [searchDisplay, setSearchDisplay] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [pageSize] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [patient, setPatient] = useState<IPatient>({} as IPatient);

  const [open, setOpen] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [patientID, setPatientID] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setSearch(searchDisplay);
  };

  const getAllPatients = useCallback(async () => {
    try {
      const res = await getPatients(page + 1, pageSize, search);
      setPatients(res.content);
      setTotal(res.totalPages);
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  }, [search, page, pageSize]);

  const deletePatientById = async () => {
    try {
      await deletePatient(patientID!);
      toaster.create({
        description: 'Patient deleted succesfully',
        type: 'success',
      });
      setOpen(false);
      getAllPatients();
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    getAllPatients();
  }, [getAllPatients]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  };

  useEffect(() => {
    if (searchDisplay === '') {
      setSearch('');
    }
  }, [searchDisplay]);

  const getPatientById = async (ID: string) => {
    try {
      const res = await getPatient(ID);
      setPatient({
        email: res.email,
        fname: res.fname,
        lname: res.lname,
        gender: res.gender,
        mobile: res.mobile,
        nic: res.nic,
        createdDate: res.createdDate,
        id: res.id,
      });
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  return (
    <Box>
      <BreadcrumbRoot variant="underline" separator={'/'}>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        <BreadcrumbCurrentLink>Patients</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Text mt={4} textStyle={'2xl'} color={'gray.800'} fontWeight={'bold'}>
        Patients
      </Text>
      <Flex direction="column">
        <Flex justify={'flex-end'}>
          <Button
            onClick={() => navigate('/patients/create')}
            colorPalette="brand"
          >
            <FaPlus /> Add Patient
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
                  Mobile
                </Table.ColumnHeader>
                <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                  NIC
                </Table.ColumnHeader>
                <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                  Created At
                </Table.ColumnHeader>
                <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                  Gender
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight={'bold'}
                  textAlign="end"
                ></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {patients.map((patient) => (
                <Table.Row key={patient.id}>
                  <Table.Cell>{patient.fname}</Table.Cell>
                  <Table.Cell>{patient.lname}</Table.Cell>
                  <Table.Cell>{patient.email}</Table.Cell>
                  <Table.Cell>{patient.mobile}</Table.Cell>
                  <Table.Cell>{patient.nic}</Table.Cell>
                  <Table.Cell>
                    {new Date(patient.createdDate).toISOString().split('T')[0]}
                  </Table.Cell>
                  <Table.Cell>{patient.gender}</Table.Cell>
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
                        bg={'blue.200'}
                        borderRadius={3}
                        cursor={'pointer'}
                        onClick={() => {
                          getPatientById(patient.id.toString());
                          setOpenView(true);
                        }}
                      >
                        <FaEye size={12} />
                      </Flex>
                      <Flex
                        justify={'center'}
                        alignItems={'center'}
                        w={5}
                        h={5}
                        bg={'yellow.200'}
                        borderRadius={3}
                        cursor={'pointer'}
                        onClick={() => {
                          navigate(`/patients/update/${patient.id}`);
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
                          setPatientID(patient.id);
                          setOpen(true);
                        }}
                      >
                        <FaTrash color="white" size={12} />
                      </Flex>
                      <Flex
                        justify={'center'}
                        alignItems={'center'}
                        w={5}
                        h={5}
                        bg={'green.500'}
                        borderRadius={3}
                        cursor={'pointer'}
                        onClick={() => {
                          navigate(`/patients/diagnoses/${patient.id}`);
                        }}
                      >
                        <FaFileImage color="white" size={12} />
                      </Flex>
                      <Flex
                        justify={'center'}
                        alignItems={'center'}
                        w={5}
                        h={5}
                        bg={'gray.500'}
                        borderRadius={3}
                        cursor={'pointer'}
                        onClick={() => {
                          navigate(`/patients/images/${patient.id}`);
                        }}
                      >
                        <FaImages color="white" size={12} />
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
            <Button colorPalette="red" onClick={deletePatientById}>
              Delete
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <DialogRoot
        lazyMount
        open={openView}
        onOpenChange={(e) => setOpenView(e.open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient</DialogTitle>
          </DialogHeader>
          <DialogBody display={'flex'} flexDir={'column'} gap={2}>
            <Flex alignItems={'center'} gap={1}>
              <Text color={'gray.800'} textStyle={'sm'} fontWeight={'bold'}>
                ID:
              </Text>
              <Text textStyle={'sm'} color={'gray.600'}>
                {patient.id}
              </Text>
            </Flex>
            <Flex alignItems={'center'} gap={1}>
              <Text color={'gray.800'} textStyle={'sm'} fontWeight={'bold'}>
                First Name:
              </Text>
              <Text textStyle={'sm'} color={'gray.600'}>
                {patient.fname}
              </Text>
            </Flex>
            <Flex alignItems={'center'} gap={1}>
              <Text color={'gray.800'} textStyle={'sm'} fontWeight={'bold'}>
                Last Name:
              </Text>
              <Text textStyle={'sm'} color={'gray.600'}>
                {patient.lname}
              </Text>
            </Flex>
            <Flex alignItems={'center'} gap={1}>
              <Text color={'gray.800'} textStyle={'sm'} fontWeight={'bold'}>
                Email:
              </Text>
              <Text textStyle={'sm'} color={'gray.600'}>
                {patient.email}
              </Text>
            </Flex>
            <Flex alignItems={'center'} gap={1}>
              <Text color={'gray.800'} textStyle={'sm'} fontWeight={'bold'}>
                Mobile:
              </Text>
              <Text textStyle={'sm'} color={'gray.600'}>
                {patient.mobile}
              </Text>
            </Flex>
            <Flex alignItems={'center'} gap={1}>
              <Text color={'gray.800'} textStyle={'sm'} fontWeight={'bold'}>
                NIC:
              </Text>
              <Text textStyle={'sm'} color={'gray.600'}>
                {patient.nic}
              </Text>
            </Flex>
            <Flex alignItems={'center'} gap={1}>
              <Text color={'gray.800'} textStyle={'sm'} fontWeight={'bold'}>
                Gener:
              </Text>
              <Text textStyle={'sm'} color={'gray.600'}>
                {patient.gender}
              </Text>
            </Flex>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Close</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default Patients;
