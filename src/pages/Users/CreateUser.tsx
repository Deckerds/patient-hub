import React, { useEffect, useState } from 'react';
import { ICommon, UserFormInputs } from '../../common/interfaces';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createUser, getRoles } from '../../services/patients';
import { toaster } from '../../components/ui/toaster';
import { Box, createListCollection, Grid, Input, Text } from '@chakra-ui/react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../components/ui/breadcrumb';
import { Button } from '../../components/ui/button';
import { Field } from '../../components/ui/field';
import { PasswordInput } from '../../components/ui/password-input';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '../../components/ui/select';

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserFormInputs>({ mode: 'onChange' });

  const [userRoles, setUserRoles] = useState<any>(null);

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    try {
      const payload = {
        email: data.email,
        fName: data.fName,
        lName: data.lName,
        password: data.password,
        userRole: {
          id: data.role[0],
        },
      };
      const res = await createUser(payload);
      if (res) {
        toaster.create({
          description: 'User Saved.',
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

  const getAllRoles = async () => {
    try {
      const res: ICommon[] = await getRoles();
      const images = createListCollection({
        items: res.map((dis) => {
          return {
            label: dis.name,
            value: dis.id,
          };
        }),
      });
      setUserRoles(images);
    } catch (error) {
      toaster.create({
        description: 'Error occured!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <Box>
      <BreadcrumbRoot variant="underline" separator={'/'}>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        <BreadcrumbLink href="/users">Users</BreadcrumbLink>
        <BreadcrumbCurrentLink>Create User</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Text mt={4} textStyle={'2xl'} color={'gray.800'} fontWeight={'bold'}>
        Create User
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
            <React.Fragment>
              {userRoles?.items && (
                <Controller
                  control={control}
                  name="role"
                  rules={{ required: 'Role is required' }}
                  render={({ field }) => (
                    <Field label="User Role">
                      <SelectRoot
                        id={field.name}
                        name={field.name}
                        collection={userRoles}
                        bg="white"
                        borderColor="secondary.200"
                        onValueChange={({ value }) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValueText placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          {userRoles.items.map((item: any) => (
                            <SelectItem item={item} key={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                      <Text fontSize="xs" color="red.600">
                        {errors.role && errors.role.message}
                      </Text>
                    </Field>
                  )}
                />
              )}
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

export default CreateUser;
