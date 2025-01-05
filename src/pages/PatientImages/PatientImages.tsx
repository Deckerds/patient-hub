import React, { useEffect, useState } from 'react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../components/ui/breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { FaPlus } from 'react-icons/fa';
import PatientImageCard from './components/PatientImageCard';
import { toaster } from '../../components/ui/toaster';
import { getImagesByPatient, getPatient } from '../../services/patients';

const PatientImages = () => {
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const [patientName, setPatientName] = useState<string>('');
  const [images, setImages] = useState<Array<any>>([]);

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

  const getPatientImagesById = async (ID: string) => {
    try {
      const res = await getImagesByPatient(ID);
      setImages(res);
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
      getPatientImagesById(patientId);
    }
  }, [patientId]);

  return (
    <Box>
      <BreadcrumbRoot variant="underline" separator={'/'}>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        {(localStorage.getItem('role') || '') !== 'PATIENT' && (
          <BreadcrumbLink href="/patients">Patients</BreadcrumbLink>
        )}
        <BreadcrumbCurrentLink>Images for {patientName}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Text mt={4} textStyle={'2xl'} color={'gray.800'} fontWeight={'bold'}>
        Images for Patient: {patientName}
      </Text>
      <Flex direction="column">
        {(localStorage.getItem('role') || '') !== 'PATIENT' && (
          <Flex justify={'flex-end'}>
            <Button
              onClick={() => navigate(`/patients/addImages/${patientId}`)}
              colorPalette="brand"
            >
              <FaPlus /> Add Image
            </Button>
          </Flex>
        )}
        {images.length === 0 && (
          <Text
            mt={40}
            textAlign={'center'}
            textStyle={'lg'}
            fontWeight={'bold'}
          >
            No Images Found
          </Text>
        )}
        <Grid templateColumns={'repeat(3,1fr)'} gap={4} mt={3}>
          {images.map((img) => (
            <PatientImageCard
              key={img.id}
              patientId={patientId!}
              id={img.id}
              disease={img.diseaseTypes.name}
              type={img.imageTypes.name}
              date={new Date(img.createdDate).toISOString().split('T')[0]}
              img={img.imagebase64}
              getData={() => getPatientImagesById(patientId!)}
            />
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};

export default PatientImages;
