import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Box, Grid, Input, Text, Textarea } from '@chakra-ui/react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../components/ui/breadcrumb';
import { useParams } from 'react-router-dom';
import { createDiagnosis, getPatient } from '../../services/patients';
import { toaster } from '../../components/ui/toaster';
import { DiagnoseFormInputs } from '../../common/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Field } from '../../components/ui/field';

const CreateDiagnose = () => {
  const { id: patientId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DiagnoseFormInputs>({ mode: 'onChange' });

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
    if (patientId) {
      getPatientById(patientId);
    }
  }, [patientId]);

  const onSubmit: SubmitHandler<DiagnoseFormInputs> = async (data) => {
    try {
      const res = await createDiagnosis(data, patientId!);
      if (res) {
        toaster.create({
          description: 'Diagnosis Saved.',
          type: 'success',
        });
        reset();
      }
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
        <BreadcrumbLink href="/patients">Patients</BreadcrumbLink>
        <BreadcrumbLink href={`/patients/diagnoses/${patientId}`}>
          Patient Diagnosis
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Create Diagnosis</BreadcrumbCurrentLink>
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
              Save
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

export default CreateDiagnose;
