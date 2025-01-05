import React from 'react';
import {
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Input,
  InputAddon,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormInputs } from '../../common/interfaces';
import { toaster } from '../../components/ui/toaster';
import { Field } from '../../components/ui/field';
import { FaKey, FaUserAlt } from 'react-icons/fa';
import { PasswordInput } from '../../components/ui/password-input';
import { Button } from '../../components/ui/button';
import { login } from '../../services/auth';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await login({
        username: data.email,
        password: data.password,
      });
      if (res) {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('role', res.userRole.name);
        if (res.userRole.name === 'PATIENT') {
          localStorage.setItem('patientId', res.patient.id);
        }

        navigate('/dashboard');
      }
    } catch (error) {
      toaster.create({
        description: 'Invalid email or password',
        type: 'error',
      });
    }
  };

  return (
    <React.Fragment>
      <Center h={'full'} flexDir={'column'}>
        <Text
          textStyle={'5xl'}
          color={'brand.200'}
          fontWeight={'bold'}
          textShadow="1px 1px 2px rgba(0, 0, 0, 0.2), 0 0 25px rgba(255, 255, 255, 0.3), 0 0 5px rgba(255, 255, 255, 0.2)"
        >
          Login to your account
        </Text>
        <Box mt={8} w={'full'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDir="column" gap={5}>
              <Flex flexDir="column" gap={4}>
                <Field label="Email">
                  <Group shadow={'md'} w="full" attached>
                    <InputAddon bg="blue.800">
                      <FaUserAlt color="white" />
                    </InputAddon>
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
                  </Group>
                  <Text fontSize="xs" color="red.600">
                    {errors.email && errors.email.message}
                  </Text>
                </Field>
                <Field label="Password">
                  <Group shadow={'md'} w="full" attached>
                    <InputAddon bg="blue.800">
                      <FaKey color="white" />
                    </InputAddon>
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
                          message:
                            'Password must be at least 8 characters long',
                        },
                      })}
                    />
                  </Group>
                  <Text fontSize="xs" color="red.600">
                    {errors.password && errors.password.message}
                  </Text>
                </Field>
              </Flex>
              <Grid mt={4} templateColumns={'repeat(2, 1fr)'} gap={2}>
                <Button
                  type="submit"
                  shadow={'md'}
                  fontSize={'xl'}
                  fontWeight={'bold'}
                  colorPalette={'brand'}
                  borderRadius={50}
                  loading={isSubmitting}
                >
                  Log In
                </Button>
                <Button
                  shadow={'md'}
                  fontSize={'xl'}
                  fontWeight={'bold'}
                  colorPalette={'gray'}
                  borderRadius={50}
                  onClick={() => navigate('/')}
                >
                  Back
                </Button>
              </Grid>
            </Flex>
          </form>
        </Box>
        <Flex mt={4} w={'full'} justify={'flex-end'}>
          <Text fontSize={'xs'} me={1}>
            Don't have an account?
          </Text>
          <Text fontSize={'xs'} fontWeight={'bold'}>
            Contact an administrator to create an account
          </Text>
        </Flex>
      </Center>
    </React.Fragment>
  );
};

export default Login;
