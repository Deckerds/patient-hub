import React from 'react';
import { Center, Flex } from '@chakra-ui/react';
import DashCard from './components/DashCard';
import { FaUsersLine } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <Center h={'full'}>
      <Flex px={32} justify={'center'} flexWrap={'wrap'} gap={8}>
        {(localStorage.getItem('role') || '') !== 'PATIENT' && (
          <DashCard
            name="Patients"
            path="patients"
            Icon={<FaUsersLine color="#017eff" size={64} />}
          />
        )}
        {(localStorage.getItem('role') || '') !== 'DOCTOR' &&
          (localStorage.getItem('role') || '') !== 'PATIENT' && (
            <DashCard
              name="Users"
              path="users"
              Icon={<FaUsers color="#017eff" size={64} />}
            />
          )}
        {(localStorage.getItem('role') || '') === 'PATIENT' && (
          <DashCard
            name="Diagnoses"
            path={`patients/diagnoses/${localStorage.getItem('patientId')}`}
            Icon={<FaUsersLine color="#017eff" size={64} />}
          />
        )}
        {(localStorage.getItem('role') || '') === 'PATIENT' && (
          <DashCard
            name="Patient Images"
            path={`patients/images/${localStorage.getItem('patientId')}`}
            Icon={<FaUsersLine color="#017eff" size={64} />}
          />
        )}
      </Flex>
    </Center>
  );
};

export default Dashboard;
