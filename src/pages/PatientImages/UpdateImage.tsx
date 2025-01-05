import React, { useEffect, useState } from 'react';
import { Box, createListCollection, Grid, Text } from '@chakra-ui/react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../components/ui/breadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import {
  FileInput,
  FileUploadLabel,
  FileUploadRoot,
} from '../../components/ui/file-upload';
import { Field } from '../../components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { toaster } from '../../components/ui/toaster';
import {
  getDiseases,
  getImages,
  getPatient,
  getSavedImage,
  updateImage,
} from '../../services/patients';
import { ICommon, PatientImageFormInputs } from '../../common/interfaces';
import { base64ToFile, convertFileToBase64 } from '../../common/functions';

const UpdateImage = () => {
  const { id: imageId } = useParams();
  const location = useLocation();

  const [patientId, setPatientId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('No File Chosen');

  const [imageType, setImageType] = useState<any[]>([]);
  const [diseaseType, setDiseaseType] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const [diseaseTypes, setDiseaseTypes] = useState<any>(null);
  const [imageTypes, setImageTypes] = useState<any>(null);

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

  const getImageById = async (ID: string) => {
    try {
      const res = await getSavedImage(Number(ID));
      setDiseaseType([Number(res.diseaseTypes.id)]);
      setImageType([Number(res.imageTypes.id)]);

      const base64 = res.imagebase64;
      const file = base64ToFile(base64);
      setFile(file);
      setFileName(file?.name || '');
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      toaster.create({
        description: 'Please upload a valid image file.',
        type: 'error',
      });
      event.target.value = '';
      setFileName('No File Chosen');
    } else {
      setFileName(selectedFile?.name || '');
      setFile(selectedFile || null);
    }
  };

  const handleSave = async () => {
    if (!file || !imageType || !diseaseType) {
      toaster.create({
        description: 'All fields must be filled.',
        type: 'error',
      });
      return;
    }
    try {
      const base64 = await convertFileToBase64(file);
      const payload: PatientImageFormInputs = {
        diseaseTypes: {
          id: diseaseType[0],
        },
        imageTypes: {
          id: imageType[0],
        },
        imagebase64: base64! as string,
        patient: {
          id: Number(patientId),
        },
      };
      const res = await updateImage(payload, Number(imageId));
      if (res) {
        toaster.create({
          description: 'Image Updated.',
          type: 'success',
        });
        getImageById(imageId!);
      }
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  const getAllDiseases = async () => {
    try {
      const res: ICommon[] = await getDiseases();
      const diseases = createListCollection({
        items: res.map((dis) => {
          return {
            label: dis.name,
            value: dis.id,
          };
        }),
      });
      setDiseaseTypes(diseases);
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  const getAllImages = async () => {
    try {
      const res: ICommon[] = await getImages();
      const images = createListCollection({
        items: res.map((dis) => {
          return {
            label: dis.name,
            value: dis.id,
          };
        }),
      });
      setImageTypes(images);
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    getAllDiseases();
    getAllImages();
  }, []);

  useEffect(() => {
    if (imageId) {
      getImageById(imageId);
    }
  }, [imageId]);

  useEffect(() => {
    if (patientId) {
      getPatientById(patientId);
    }
  }, [patientId]);

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
        <BreadcrumbLink href={`/patients/images/${patientId}`}>
          Patient Images
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Update Image</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Text mt={4} textStyle={'2xl'} color={'gray.800'} fontWeight={'bold'}>
        Update Image for Patient: {patientName}
      </Text>
      <Grid
        bg={'gray.100'}
        borderRadius={4}
        p={5}
        mt={3}
        templateColumns={'repeat(2, 1fr)'}
        gap={3}
        alignItems="flex-end"
      >
        <FileUploadRoot
          onChange={handleFileChange}
          maxFiles={1}
          accept="image/*"
          gap="1"
        >
          <FileUploadLabel>Select Image</FileUploadLabel>
          <FileInput placeholder={fileName} bg={'white'} />
        </FileUploadRoot>
        <Field label="Image Type">
          {imageTypes?.items && (
            <SelectRoot
              id="image-type"
              name="image-type"
              collection={imageTypes}
              bg="white"
              borderColor="secondary.200"
              value={imageType}
              onValueChange={(e) => setImageType(e.value)}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Select Image Type" />
              </SelectTrigger>
              <SelectContent>
                {imageTypes.items.map((item: any) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          )}
        </Field>
        <Field label="Disease Type">
          {diseaseTypes?.items && (
            <SelectRoot
              id="disease-type"
              name="disease-type"
              collection={diseaseTypes}
              bg="white"
              borderColor="secondary.200"
              value={diseaseType}
              onValueChange={(e) => setDiseaseType(e.value)}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Select Disease Type" />
              </SelectTrigger>
              <SelectContent>
                {diseaseTypes?.items?.map((item: any) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          )}
        </Field>
        <Button onClick={handleSave} colorPalette={'brand'}>
          Update
        </Button>
      </Grid>
    </Box>
  );
};

export default UpdateImage;
