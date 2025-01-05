import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Box, Grid, Input, Text, Textarea } from '@chakra-ui/react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../components/ui/breadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import {
  getDiagnosisById,
  getPatient,
  updateDiagnosis,
} from '../../services/patients';
import { toaster } from '../../components/ui/toaster';
import { DiagnoseFormInputs } from '../../common/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Field } from '../../components/ui/field';

const UpdateDiagnose = () => {
  const { id: diagnoseId } = useParams();
  const location = useLocation();

  const [patientId, setPatientId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DiagnoseFormInputs>({
    mode: 'onChange',
    defaultValues: {
      cost: 0,
      diagnosis: '',
      note: '',
    },
  });

  const getDiagnoseById = useCallback(async () => {
    try {
      const res = await getDiagnosisById(diagnoseId!);
      reset({
        cost: res.cost,
        diagnosis: res.diagnosis,
        note: res.note,
      });
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  }, [diagnoseId, reset]);

  const [patientName, setPatientName] = useState<string>('');

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

  useEffect(() => {
    getDiagnoseById();
  }, [getDiagnoseById]);

  useEffect(() => {
    if (patientId) {
      getPatientById(patientId);
    }
  }, [patientId]);

  const onSubmit: SubmitHandler<DiagnoseFormInputs> = async (data) => {
    try {
      const res = await updateDiagnosis(data, patientId!, diagnoseId!);
      if (res) {
        toaster.create({
          description: 'Diagnosis Updated.',
          type: 'success',
        });
        getDiagnoseById();
      }
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const patientIdFromQuery = queryParams.get('patientId');
    setPatientId(patientIdFromQuery);
  }, [location.search]);

  return (
    <Box>
      <BreadcrumbRoot variant="underline" separator={'/'}>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        <BreadcrumbLink href="/patients">Patients</BreadcrumbLink>
        <BreadcrumbLink href={`/patients/diagnoses/${patientId}`}>
          Patient Diagnosis
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Update Diagnosis</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Text mt={4} textStyle={'2xl'} color={'gray.800'} fontWeight={'bold'}>
        Diagnosis for Patient: {patientName}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          bg={'gray.100'}
          borderRadius={4}
          p={5}
          mt={3}
          templateColumns={'repeat(1, 1fr)'}
          gap={3}
        >
          <Field label="Note">
            <Textarea
              id="note"
              placeholder="Type a note ..."
              bg={'white'}
              outline={'none'}
              {...register('note', {
                required: 'Note is required',
              })}
            />
            <Text fontSize="xs" color="red.600">
              {errors.note && errors.note.message}
            </Text>
          </Field>
          <Field label="Cost">
            <Input
              id="cost"
              type="number"
              placeholder="Cost"
              bg={'white'}
              outline={'none'}
              {...register('cost', {
                required: 'Cost is required',
              })}
            />
            <Text fontSize="xs" color="red.600">
              {errors.cost && errors.cost.message}
            </Text>
          </Field>
          <Field label="Diagnosis">
            <Textarea
              id="diagnosis"
              placeholder="Type a diagnosis ..."
              bg={'white'}
              outline={'none'}
              {...register('diagnosis', {
                required: 'Diagnosis is required',
              })}
            />
            <Text fontSize="xs" color="red.600">
              {errors.diagnosis && errors.diagnosis.message}
            </Text>
          </Field>
          <Grid templateColumns={'repeat(2, 1fr)'} gap={2}>
            <Button
              w={'full'}
              type="submit"
              colorPalette={'brand'}
              loading={isSubmitting}
            >
              Update
            </Button>
            <Button w={'full'} colorPalette={'red'} onClick={() => reset()}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateDiagnose;
