import React, { useEffect, useState } from 'react';
import { Box, Flex, Table, Text } from '@chakra-ui/react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../components/ui/breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import {
  deleteDiagnose,
  getDiagnosesById,
  getPatient,
} from '../../services/patients';
import { toaster } from '../../components/ui/toaster';
import { DiagnoseResponse } from '../../common/interfaces';
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

const PatientDiagnoses = () => {
  const navigate = useNavigate();
  const { id: patientId } = useParams();

  const [patientName, setPatientName] = useState<string>('');

  const [allDiagnoses, setAllDiagnoses] = useState<DiagnoseResponse[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedDiagnose, setSelectedDiagnose] = useState<any>(null);

  const getPatientById = async (ID: string) => {
    try {
      const res = await getPatient(ID);
      setPatientName(res.fname);
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  const getAllDiagnoses = async (ID: string) => {
    try {
      const res = await getDiagnosesById(ID);
      setAllDiagnoses(res);
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (patientId) {
      getPatientById(patientId);
      getAllDiagnoses(patientId);
    }
  }, [patientId]);

  const deleteDiagnoseById = async () => {
    try {
      await deleteDiagnose(selectedDiagnose!);
      toaster.create({
        description: 'Patient deleted succesfully',
        type: 'success',
      });
      setOpen(false);
      getAllDiagnoses(patientId!);
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
        {(localStorage.getItem('role') || '') !== 'PATIENT' && (
          <BreadcrumbLink href="/patients">Patients</BreadcrumbLink>
        )}
        <BreadcrumbCurrentLink>
          Diagnoses for {patientName}
        </BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Text mt={4} textStyle={'2xl'} color={'gray.800'} fontWeight={'bold'}>
        Diagnoses for Patient: {patientName}
      </Text>
      {(localStorage.getItem('role') || '') !== 'PATIENT' && (
        <Flex direction="column">
          <Flex justify={'flex-end'}>
            <Button
              onClick={() => navigate(`/patients/createDiagnose/${patientId}`)}
              colorPalette="brand"
            >
              <FaPlus /> Add Diagnosis
            </Button>
          </Flex>
        </Flex>
      )}
      <Box borderRadius={4} p={5} mt={3}>
        <Table.Root size="sm" striped>
          <Table.Header>
            <Table.Row bg={'brand.100'}>
              <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                Created At
              </Table.ColumnHeader>
              <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                Cost (USD)
              </Table.ColumnHeader>
              <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                Note
              </Table.ColumnHeader>
              <Table.ColumnHeader color={'white'} fontWeight={'bold'}>
                Diagnosis
              </Table.ColumnHeader>
              {(localStorage.getItem('role') || '') !== 'PATIENT' && (
                <Table.ColumnHeader
                  color={'white'}
                  textAlign="center"
                  fontWeight={'bold'}
                >
                  Actions
                </Table.ColumnHeader>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allDiagnoses.map((diagnosis) => (
              <Table.Row key={diagnosis.id}>
                <Table.Cell>
                  {new Date(diagnosis.createdDate).toISOString().split('T')[0]}
                </Table.Cell>
                <Table.Cell>{diagnosis.cost}</Table.Cell>
                <Table.Cell>{diagnosis.note}</Table.Cell>
                <Table.Cell>{diagnosis.diagnosis}</Table.Cell>
                {(localStorage.getItem('role') || '') !== 'PATIENT' && (
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
                        onClick={() =>
                          navigate(
                            `/patients/updateDiagnose/${diagnosis.id}?patientId=${patientId}`,
                          )
                        }
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
                          setSelectedDiagnose(diagnosis.id);
                          setOpen(true);
                        }}
                      >
                        <FaTrash color="white" size={12} />
                      </Flex>
                    </Flex>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>
              This action cannot be undone. This will permanently delete the
              diagnose.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={deleteDiagnoseById}>
              Delete
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default PatientDiagnoses;
