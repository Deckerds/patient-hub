import React, { useEffect, useState } from 'react';
import { Box, createListCollection, Grid, Text } from '@chakra-ui/react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../components/ui/breadcrumb';
import { useParams } from 'react-router-dom';
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
  saveImage,
} from '../../services/patients';
import { ICommon, PatientImageFormInputs } from '../../common/interfaces';
import { convertFileToBase64 } from '../../common/functions';

const AddImage = () => {
  const { id: patientId } = useParams();

  const [imageType, setImageType] = useState<string[]>([]);
  const [diseaseType, setDiseaseType] = useState<string[]>([]);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      toaster.create({
        description: 'Please upload a valid image file.',
        type: 'error',
      });
      event.target.value = '';
    } else {
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
      const res = await saveImage(payload, Number(patientId));
      if (res) {
        toaster.create({
          description: 'Image Saved.',
          type: 'success',
        });
        setImageType([]);
        setDiseaseType([]);
        setFile(null);
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
    if (patientId) getPatientById(patientId);
  }, [patientId]);

  return (
    <Box>
      <BreadcrumbRoot variant="underline" separator={'/'}>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        <BreadcrumbLink href="/patients">Patients</BreadcrumbLink>
        <BreadcrumbLink href={`/patients/images/${patientId}`}>
          Patient Images
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Create Image</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Text mt={4} textStyle={'2xl'} color={'gray.800'} fontWeight={'bold'}>
        Add Image for Patient: {patientName}
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
          <FileInput placeholder="No File Chosen" bg={'white'} />
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
          Save
        </Button>
      </Grid>
    </Box>
  );
};

export default AddImage;
