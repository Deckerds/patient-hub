import React, { FC, useState } from 'react';
import { Card, Flex, Image, Text } from '@chakra-ui/react';
import { FaPencil } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { deleteImage } from '../../../services/patients';
import { toaster } from '../../../components/ui/toaster';

interface IPatientImageCard {
  id: string;
  patientId: string;
  img: string;
  type: string;
  disease: string;
  date: string;
  getData: () => void;
}

const PatientImageCard: FC<IPatientImageCard> = ({
  id,
  img,
  type,
  disease,
  date,
  getData,
  patientId,
}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  const deleteImageById = async () => {
    try {
      const res = await deleteImage(id!);
      toaster.create({
        description: 'Image deleted succesfully',
        type: 'success',
      });
      if (res) {
        setOpen(false);
        getData();
      }
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  return (
    <Card.Root overflow="hidden">
      <Image
        w={'full'}
        h={'10rem'}
        objectFit={'cover'}
        src={img}
        alt={'card-image'}
      />
      <Card.Body gap="2">
        <Flex alignItems={'center'} gap={1}>
          <Text textStyle={'sm'} fontWeight={'bold'}>
            Type:
          </Text>
          <Text textStyle={'sm'} color={'gray.600'}>
            {type}
          </Text>
        </Flex>
        <Flex alignItems={'center'} gap={1}>
          <Text textStyle={'sm'} fontWeight={'bold'}>
            Disease:
          </Text>
          <Text textStyle={'sm'} color={'gray.600'}>
            {disease}
          </Text>
        </Flex>
        <Flex alignItems={'center'} gap={1}>
          <Text textStyle={'sm'} fontWeight={'bold'}>
            Created:
          </Text>
          <Text textStyle={'sm'} color={'gray.600'}>
            {date}
          </Text>
        </Flex>
      </Card.Body>
      {(localStorage.getItem('role') || '') !== 'PATIENT' && (
        <Card.Footer justifyContent={'space-between'} gap="2">
          <Flex
            justify={'center'}
            alignItems={'center'}
            w={5}
            h={5}
            bg={'yellow.200'}
            borderRadius={3}
            cursor={'pointer'}
            onClick={() =>
              navigate(`/patients/updateImages/${id}?patientId=${patientId}`)
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
            onClick={() => setOpen(true)}
          >
            <FaTrash color="white" size={12} />
          </Flex>
        </Card.Footer>
      )}

      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>
              This action cannot be undone. This will permanently delete the
              image.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={deleteImageById}>
              Delete
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Card.Root>
  );
};

export default PatientImageCard;
