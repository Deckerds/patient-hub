import React from 'react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../components/ui/breadcrumb';
import { Box, createListCollection, Grid, Input, Text } from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PatientFormInputs } from '../../common/interfaces';
import { Field } from '../../components/ui/field';
import { PasswordInput } from '../../components/ui/password-input';
import { Button } from '../../components/ui/button';
import { toaster } from '../../components/ui/toaster';
import { createPatient } from '../../services/patients';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '../../components/ui/select';

const genders = createListCollection({
  items: [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ],
});

const CreatePatient = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormInputs>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<PatientFormInputs> = async (data) => {
    try {
      const res = await createPatient(data);
      if (res) {
        toaster.create({
          description: 'Patient Saved.',
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
        <BreadcrumbCurrentLink>Create Patient</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Text mt={4} textStyle={'2xl'} color={'gray.800'} fontWeight={'bold'}>
        Create Patient
      </Text>
      <Box mt={8} w={'full'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            bg={'gray.100'}
            p={5}
            borderRadius={4}
            templateColumns={'repeat(2, 1fr)'}
            gap={3}
          >
            <Field label="Email">
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                bg={'white'}
                outline={'none'}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              <Text fontSize="xs" color="red.600">
                {errors.email && errors.email.message}
              </Text>
            </Field>
            <Field label="First Name">
              <Input
                id="fName"
                type="fName"
                placeholder="John"
                bg={'white'}
                outline={'none'}
                {...register('fName', {
                  required: 'First Name is required',
                })}
              />
              <Text fontSize="xs" color="red.600">
                {errors.fName && errors.fName.message}
              </Text>
            </Field>
            <Field label="Last Name">
              <Input
                id="lName"
                type="lName"
                placeholder="Doe"
                bg={'white'}
                outline={'none'}
                {...register('lName', {
                  required: 'Last Name is required',
                })}
              />
              <Text fontSize="xs" color="red.600">
                {errors.lName && errors.lName.message}
              </Text>
            </Field>
            <Field label="Mobile">
              <Input
                id="mobile"
                type="mobile"
                placeholder="+94 77 123 4567"
                bg={'white'}
                outline={'none'}
                {...register('mobile', {
                  required: 'Mobile is required',
                  minLength: {
                    value: 10,
                    message: 'Mobile number must be exactly 10 digits',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Mobile number must be exactly 10 digits',
                  },
                })}
              />
              <Text fontSize="xs" color="red.600">
                {errors.mobile && errors.mobile.message}
              </Text>
            </Field>
            <Field label="NIC">
              <Input
                id="nic"
                type="nic"
                placeholder="9512345678V"
                bg={'white'}
                outline={'none'}
                {...register('nic', {
                  required: 'NIC is required',
                  minLength: {
                    value: 10,
                    message: 'NIC must be exactly 10 characters',
                  },
                  maxLength: {
                    value: 10,
                    message: 'NIC must be exactly 10 characters',
                  },
                })}
              />
              <Text fontSize="xs" color="red.600">
                {errors.nic && errors.nic.message}
              </Text>
            </Field>
            <React.Fragment>
              <Controller
                control={control}
                name="gender"
                rules={{ required: 'Gender is required' }}
                render={({ field }) => (
                  <Field label="Gender">
                    <SelectRoot
                      id={field.name}
                      name={field.name}
                      collection={genders}
                      bg="white"
                      borderColor="secondary.200"
                      onValueChange={({ value }) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValueText placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.items.map((item) => (
                          <SelectItem item={item} key={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                    <Text fontSize="xs" color="red.600">
                      {errors.gender && errors.gender.message}
                    </Text>
                  </Field>
                )}
              />
            </React.Fragment>
            <Field label="Password">
              <PasswordInput
                id="password"
                type="password"
                bg={'white'}
                outline={'none'}
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                })}
              />
              <Text fontSize="xs" color="red.600">
                {errors.password && errors.password.message}
              </Text>
            </Field>
            <Grid templateColumns={'repeat(2, 1fr)'} mt={'26px'} gap={2}>
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
    </Box>
  );
};

export default CreatePatient;
